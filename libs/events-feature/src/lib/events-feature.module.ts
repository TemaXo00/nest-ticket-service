import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { RedisModule } from '@nestjs-modules/ioredis';
import { OrgEventsDbModule } from '@org/events-db';

import { OrgEventsFeatureService } from './events-feature.service';

@Module({
  imports: [
    OrgEventsDbModule,
    ClientsModule.registerAsync([
      {
        name: 'TICKET_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService): ClientProviderOptions => {
          const rmqUser: string = config.getOrThrow<string>('RABBIT_MQ_USER');
          const rmqPasswd: string = config.getOrThrow<string>('RABBIT_MQ_PASSWORD');
          const rmqHost: string = config.getOrThrow<string>('RABBIT_MQ_HOST');
          const rmqPort: number = config.getOrThrow<number>('RABBIT_MQ_PORT');
          const ticketQueue: string = config.getOrThrow<string>('TICKET_QUEUE');

          return {
            name: 'TICKET_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rmqUser}:${rmqPasswd}@${rmqHost}:${rmqPort}`],
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
    }),
  ],
  controllers: [],
  providers: [OrgEventsFeatureService],
  exports: [OrgEventsFeatureService],
})
export class OrgEventsFeatureModule {}
