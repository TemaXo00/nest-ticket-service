import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EventModule } from './event/event.module';

@Module({
  imports: [ConfigModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
