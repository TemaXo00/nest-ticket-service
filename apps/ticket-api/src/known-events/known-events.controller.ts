import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateEventDto,
  UpdateEventNameDto,
  UpdateEventTicketsDto,
} from '@org/known-events-dto';
import { OrgKnownEventsFeatureService } from '@org/known-events-feature';

@Controller()
export class KnownEventsController {
  constructor(
    private readonly knownEventsService: OrgKnownEventsFeatureService,
  ) {}

  @MessagePattern('event.created')
  async createEvent(@Payload() data: CreateEventDto): Promise<void> {
    await this.knownEventsService.handleCreateEvent(data);
  }

  @MessagePattern('event.name.updated')
  async updateEventName(@Payload() data: UpdateEventNameDto): Promise<void> {
    await this.knownEventsService.handleUpdateNameEvent(data);
  }

  @MessagePattern('event.tickets.updated')
  async updateEventTickets(
    @Payload() data: UpdateEventTicketsDto,
  ): Promise<void> {
    await this.knownEventsService.handleUpdateTicketsEvent(data);
  }

  @MessagePattern('event.deleted')
  async deleteEvent(@Payload() data: { id: string }): Promise<void> {
    await this.knownEventsService.handleDeleteEvent(data);
  }
}
