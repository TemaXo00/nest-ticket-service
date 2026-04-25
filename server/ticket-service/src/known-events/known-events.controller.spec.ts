import { Test, TestingModule } from '@nestjs/testing';

import { KnownEventsController } from './known-events.controller';
import { KnownEventsService } from './known-events.service';

describe('KnownEventsController', () => {
  let controller: KnownEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnownEventsController],
      providers: [KnownEventsService],
    }).compile();

    controller = module.get<KnownEventsController>(KnownEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
