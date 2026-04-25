import { Controller } from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";

import {EventManipulationsDto} from "./dto/event-manipulations.dto";
import { KnownEventsService } from './known-events.service';

@Controller()
export class KnownEventsController {
  constructor(private readonly knownEventsService: KnownEventsService) {}

  @MessagePattern('event.created')
  async createEvent(@Payload() data: EventManipulationsDto): Promise<void> {
    await this.knownEventsService.handleCreateEvent(data)
  }

  @MessagePattern('event.updated')
  async updateEvent(@Payload() data: EventManipulationsDto): Promise<void> {
    await this.knownEventsService.handleUpdateEvent(data)
  }

  @MessagePattern('event.deleted')
  async deleteEvent(@Payload() data: {id: string}): Promise<void> {
    await this.knownEventsService.handleDeleteEvent(data)
  }
}
