import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../prisma/generated/client';

@Injectable()
export class OrgEventsDbService extends PrismaClient {
  constructor(protected readonly config: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: config.getOrThrow<string>('EVENTS_DB_URL'),
    });
    super({ adapter });
  }
}
