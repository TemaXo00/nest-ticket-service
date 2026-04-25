import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { KnownEventsModule } from './known-events/known-events.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    KnownEventsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
