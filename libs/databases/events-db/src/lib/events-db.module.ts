import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OrgEventsDbService } from './events-db.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [OrgEventsDbService],
  exports: [OrgEventsDbService],
})
export class OrgEventsDbModule {}
