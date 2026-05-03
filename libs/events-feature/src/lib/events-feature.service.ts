import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { OrgEventsDbService, Event } from '@org/events-db';
import { CreateEventDto, UpdateTicketsDto, UpdateNameDto} from '@org/events-dto'
import Redis from 'ioredis';

@Injectable()
export class OrgEventsFeatureService {
  constructor(
    private readonly prisma: OrgEventsDbService,
    @Inject('TICKET_SERVICE') private readonly ticket: ClientProxy,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async getEvents(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async getEventById(id: string): Promise<Event | null> {
    const cachedEvent = await this.redis.get(`event:${id}`);
    if (cachedEvent) {
      return JSON.parse(cachedEvent);
    }

    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    await this.redis.set(`event:${id}`, JSON.stringify(event), 'EX', 600);
    return event;
  }

  async createEvent(dto: CreateEventDto): Promise<Event> {
    await this.findByName(dto.name);

    const newEvent = await this.prisma.event.create({
      data: {
        name: dto.name,
        tickets_amount: dto.tickets_amount,
      },
    });

    this.ticket.emit('event.created', {
      id: newEvent.id,
      name: newEvent.name,
      tickets_left: newEvent.tickets_amount,
    });

    return newEvent;
  }

  async changeName(id: string, dto: UpdateNameDto): Promise<Event> {
    await this.getEventById(id);
    await this.findByName(dto.name);

    const event = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });

    this.ticket.emit('event.name.updated', {
      id: event.id,
      name: event.name,
    });

    const cachedEvent = await this.redis.get(`event:${id}`);
    if (cachedEvent) {
      await this.redis.set(`event:${id}`, JSON.stringify(event), 'EX', 600);
    }

    return event;
  }

  async changeTicketsAmount(id: string, dto: UpdateTicketsDto): Promise<Event> {
    const previousEvent = await this.getEventById(id);

    const event = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        tickets_amount: dto.tickets_amount,
      },
    });

    this.ticket.emit('event.tickets.updated', {
      id: event.id,
      tickets_amount: event.tickets_amount,
      prev_amount: previousEvent?.tickets_amount,
    });

    const cachedEvent = await this.redis.get(`event:${id}`);
    if (cachedEvent) {
      await this.redis.set(`event:${id}`, JSON.stringify(event), 'EX', 600);
    }

    return event;
  }

  async deleteEvent(id: string): Promise<Event> {
    await this.getEventById(id);

    const event = await this.prisma.event.delete({
      where: {
        id,
      },
    });

    this.ticket.emit('event.deleted', { id: event.id });

    const cachedEvent = await this.redis.get(`event:${id}`);
    if (cachedEvent) {
      await this.redis.del(`event:${id}`);
    }

    return event;
  }

  private async findByName(name: string): Promise<void> {
    const existingName = await this.prisma.event.findUnique({
      where: {
        name,
      },
    });

    if (existingName) {
      throw new ConflictException('Event with this name already exists');
    }
  }
}