import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { OrgKnownEventsFeatureModule } from '@org/known-events-feature'
import { OrgTicketDbModule } from '@org/ticket-db';

import { OrgTicketsFeatureService } from './tickets-feature.service';

@Module({
  imports: [
    OrgTicketDbModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: config.getOrThrow<string>('REDIS_URL'),
      }),
    }),
    OrgKnownEventsFeatureModule,
  ],
  controllers: [],
  providers: [OrgTicketsFeatureService],
  exports: [OrgTicketsFeatureService],
})
export class OrgTicketsFeatureModule {}
