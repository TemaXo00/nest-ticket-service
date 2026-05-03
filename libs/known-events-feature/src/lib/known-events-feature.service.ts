import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateEventDto,
  UpdateEventNameDto,
  UpdateEventTicketsDto,
} from '@org/known-events-dto';
import { KnownEvents, OrgTicketDbService } from '@org/ticket-db';

@Injectable()
export class OrgKnownEventsFeatureService {
  constructor(private readonly prisma: OrgTicketDbService) {}

  async handleCreateEvent(data: CreateEventDto): Promise<void> {
    await this.prisma.knownEvents.create({
      data: {
        id: data.id,
        name: data.name,
        tickets_left: data.tickets_left,
      },
    });
  }

  async handleUpdateNameEvent(data: UpdateEventNameDto): Promise<void> {
    await this.checkEventExisting(data.id);

    await this.prisma.knownEvents.update({
      data: {
        name: data.name,
      },
      where: {
        id: data.id,
      },
    });
  }

  async handleUpdateTicketsEvent(data: UpdateEventTicketsDto): Promise<void> {
    const knownEvent = await this.checkEventExisting(data.id);

    const ticketsNowReserved = data.prev_amount - knownEvent.tickets_left;
    const newTicketsAmount =
      data.tickets_amount - ticketsNowReserved > 0
        ? data.tickets_amount - ticketsNowReserved
        : 0;

    await this.prisma.knownEvents.update({
      where: {
        id: data.id,
      },
      data: {
        tickets_left: newTicketsAmount,
      },
    });
  }

  async handleDeleteEvent(data: { id: string }): Promise<void> {
    await this.checkEventExisting(data.id);

    await this.prisma.knownEvents.delete({
      where: {
        id: data.id,
      },
    });
  }

  async checkEventExisting(id: string): Promise<KnownEvents> {
    const event = await this.prisma.knownEvents.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(`Unknown event with id ${id}`);
    }

    return event;
  }
}