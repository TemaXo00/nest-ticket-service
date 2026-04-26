import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RedisModule} from "@nestjs-modules/ioredis";

import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import {KnownEventsModule} from "../known-events/known-events.module";

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: config.getOrThrow<string>('REDIS_URL'),
      }),
    }),
    KnownEventsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
