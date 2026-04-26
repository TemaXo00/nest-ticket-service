import { Module } from '@nestjs/common';

import { KnownEventsController } from './known-events.controller';
import { KnownEventsService } from './known-events.service';

@Module({
  controllers: [KnownEventsController],
  providers: [KnownEventsService],
  exports: [KnownEventsService]
})
export class KnownEventsModule {}
