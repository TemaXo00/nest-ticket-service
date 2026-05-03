import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrgTicketDbService } from './ticket-db.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [OrgTicketDbService],
  exports: [OrgTicketDbService],
})
export class OrgTicketDbModule {}
