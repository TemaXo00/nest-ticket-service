import { Injectable } from '@nestjs/common';

import {PrismaService} from "../prisma/prisma.service";
import {EventManipulationsDto} from "./dto/event-manipulations.dto";

@Injectable()
export class KnownEventsService {
    constructor(private readonly prisma: PrismaService) {}

    async handleCreateEvent(data: EventManipulationsDto): Promise<void> {
        await this.prisma.knownEvents.create({
            data: {
                id: data.id,
                name: data.name,
            }
        })
    }

    async handleUpdateEvent(data: EventManipulationsDto): Promise<void> {
        await this.prisma.knownEvents.update({
            data: {
                name: data.name
            },
            where: {
                id: data.id,
            }
        })
    }

    async handleDeleteEvent(data: {id: string}): Promise<void> {
        await this.prisma.knownEvents.delete({
            where: {
                id: data.id
            }
        })
    }
}
