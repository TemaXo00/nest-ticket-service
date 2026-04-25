import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import { Event } from '@prisma-gen/client'

import {PrismaService} from "../prisma/prisma.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateNameDto} from "./dto/update-name.dto";

@Injectable()
export class EventService {
    constructor(
        private readonly prisma: PrismaService,
        @Inject('TICKET_SERVICE') private readonly ticket: ClientProxy
    ) {}

    async getEvents(): Promise<Event[]> {
        return this.prisma.event.findMany();
    }

    async getEventById(id: string): Promise<Event | null> {
        const event =  this.prisma.event.findUnique({
            where: {
                id
            }
        })

        if (!event) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }

        return event;
    }

    async createEvent(dto: CreateEventDto): Promise<Event> {
        await this.findByName(dto.name);

        const newEvent = await this.prisma.event.create({
            data: {
                name: dto.name,
                tickets_amount: dto.tickets_amount,
            }
        })

        this.ticket.emit('event.created', {
            id: newEvent.id,
            name: newEvent.name
        })

        return newEvent;
    }

    async changeName(id: string, dto: UpdateNameDto): Promise<Event> {
        await this.getEventById(id)
        await this.findByName(dto.name)

        const event = await this.prisma.event.update({
            where: {
                id
            },
            data: {
                name: dto.name,
            }
        })

        this.ticket.emit('event.updated', {
            id: event.id,
            name: event.name
        })

        return event;
    }

    async deleteEvent(id: string): Promise<Event> {
        await this.getEventById(id)

        const event = await this.prisma.event.delete({
            where: {
                id
            }
        })

        this.ticket.emit('event.deleted', {id: event.id})

        return event;
    }

    private async findByName(name: string): Promise<void> {
        const existingName = await this.prisma.event.findUnique({
            where: {
                name,
            }
        })

        if (existingName) {
            throw new ConflictException('Event with this name already exists');
        }
    }
}
