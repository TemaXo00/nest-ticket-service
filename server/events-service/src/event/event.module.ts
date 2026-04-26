import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientProviderOptions, ClientsModule, Transport} from "@nestjs/microservices";

import { EventController } from './event.controller';
import { EventService } from './event.service';
import {RedisModule} from "@nestjs-modules/ioredis";


@Module({
  imports: [
      ClientsModule.registerAsync([
          {
              name: 'TICKET_SERVICE',
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService): ClientProviderOptions => {
                  const rabbitUser = configService.get<string>('RABBIT_MQ_USER');
                  const rabbitPass = configService.get<string>('RABBIT_MQ_PASSWORD');
                  const ticketQueue = configService.get<string>('TICKET_QUEUE');

                  return {
                      name: 'TICKET_SERVICE',
                      transport: Transport.RMQ,
                      options: {
                          urls: [`amqp://${rabbitUser}:${rabbitPass}@rabbitmq:5672`],
                          queue: ticketQueue,
                          queueOptions: {
                              durable: true,
                          },
                      },
                  };
              },
          },
      ]),
      RedisModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
              type: 'single',
              url: config.getOrThrow<string>('REDIS_URL'),
          }),
      })
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
