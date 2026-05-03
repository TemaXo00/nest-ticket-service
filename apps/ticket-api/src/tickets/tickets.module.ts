import { Module } from '@nestjs/common';
import { OrgTicketsFeatureModule } from '@org/tickets-feature';

import { TicketsController } from './tickets.controller';

@Module({
  imports: [
    OrgTicketsFeatureModule
  ],
  controllers: [TicketsController],
  providers: [],
})
export class TicketsModule {}
