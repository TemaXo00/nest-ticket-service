import { Module } from '@nestjs/common';
import { OrgEventsFeatureModule } from '@org/events-feature';

import { EventController } from './event.controller';

@Module({
  imports: [OrgEventsFeatureModule],
  controllers: [EventController],
  providers: [],
})
export class EventModule {}
