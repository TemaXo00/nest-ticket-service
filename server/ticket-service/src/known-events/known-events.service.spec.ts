import { Test, TestingModule } from '@nestjs/testing';

import { KnownEventsService } from './known-events.service';

describe('KnownEventsService', () => {
  let service: KnownEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnownEventsService],
    }).compile();

    service = module.get<KnownEventsService>(KnownEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
