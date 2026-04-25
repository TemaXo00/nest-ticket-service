import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      PrismaModule,
      EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
