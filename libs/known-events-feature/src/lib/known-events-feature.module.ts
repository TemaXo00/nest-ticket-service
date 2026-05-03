import { Module } from '@nestjs/common';
import { OrgTicketDbModule } from '@org/ticket-db'

import { OrgKnownEventsFeatureService } from './known-events-feature.service';

@Module({
  imports: [OrgTicketDbModule],
  controllers: [],
  providers: [OrgKnownEventsFeatureService],
  exports: [OrgKnownEventsFeatureService],
})
export class OrgKnownEventsFeatureModule {}
