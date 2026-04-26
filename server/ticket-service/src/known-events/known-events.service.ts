import {Injectable, NotFoundException} from '@nestjs/common';

import {PrismaService} from "../prisma/prisma.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateEventNameDto} from "./dto/update-event-name.dto";
import {UpdateEventTicketsDto} from "./dto/update-event-tickets.dto";
import {KnownEvents} from "@prisma-gen/client";

@Injectable()
export class KnownEventsService {
    constructor(private readonly prisma: PrismaService) {}

    async handleCreateEvent(data: CreateEventDto): Promise<void> {
        await this.prisma.knownEvents.create({
            data: {
                id: data.id,
                name: data.name,
                tickets_left: data.tickets_left,
            }
        })
    }

    async handleUpdateNameEvent(data: UpdateEventNameDto): Promise<void> {
        await this.checkEventExisting(data.id)

        await this.prisma.knownEvents.update({
            data: {
                name: data.name
            },
            where: {
                id: data.id,
            }
        })
    }

    async handleUpdateTicketsEvent(data: UpdateEventTicketsDto): Promise<void> {
        const knownEvent = await this.checkEventExisting(data.id)

        const ticketsNowReserved = data.prev_amount - knownEvent.tickets_left
        const newTicketsAmount = (data.tickets_amount - ticketsNowReserved) > 0 ? data.tickets_amount - ticketsNowReserved : 0;

        await this.prisma.knownEvents.update({
            where: {
                id: data.id
            },
            data: {
                tickets_left: newTicketsAmount
            }
        })
    }

    async handleDeleteEvent(data: {id: string}): Promise<void> {
        await this.checkEventExisting(data.id)

        await this.prisma.knownEvents.delete({
            where: {
                id: data.id
            }
        })
    }

    private async checkEventExisting(id: string): Promise<KnownEvents> {
        const event = await this.prisma.knownEvents.findUnique({
            where: {
                id,
            }
        })

        if (!event) {
            throw new NotFoundException(`Unknown event with id ${id}`)
        }

        return event
    }
}
