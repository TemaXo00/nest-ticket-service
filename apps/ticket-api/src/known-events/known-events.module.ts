import { Module } from '@nestjs/common';
import { OrgKnownEventsFeatureModule } from '@org/known-events-feature'

import { KnownEventsController } from './known-events.controller';

@Module({
  imports: [OrgKnownEventsFeatureModule],
  controllers: [KnownEventsController],
})
export class KnownEventsModule {}
