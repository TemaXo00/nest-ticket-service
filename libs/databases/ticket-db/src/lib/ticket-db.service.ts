import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../prisma/generated/client';

@Injectable()
export class OrgTicketDbService extends PrismaClient {
  constructor(protected readonly config: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: config.getOrThrow<string>('TICKET_DB_URL'),
    });
    super({adapter});
  }
}