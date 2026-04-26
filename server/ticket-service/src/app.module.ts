import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { KnownEventsModule } from './known-events/known-events.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    KnownEventsModule,
    TicketsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
