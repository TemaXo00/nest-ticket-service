import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {InjectRedis} from "@nestjs-modules/ioredis";
import Redis from "ioredis";
import {Ticket} from "@prisma-gen/client";
import {KnownEventsService} from "../known-events/known-events.service";
import {ReserveTicketDto} from "./dto/reserve-ticket.dto";
import {CancelTicketDto} from "./dto/cancel-ticket.dto";

@Injectable()
export class TicketsService {
    constructor(
        private readonly event: KnownEventsService,
        private readonly prisma: PrismaService,
        @InjectRedis() private readonly redis: Redis
    ) {}

    async getTicketsByEvent(event_id: string): Promise<Ticket[]> {
        await this.event.checkEventExisting(event_id)

        return this.prisma.ticket.findMany({
            where: {
                event_id
            }
        });
    }

    async getTicketsByUser(user_id: string): Promise<Ticket[]> {
        return this.prisma.ticket.findMany({
            where: {
                user_id
            }
        })
    }

    async getTicketById(id: string): Promise<Ticket> {
        const ticket = await this.prisma.ticket.findUnique({
            where: {
                id
            },
            include: {
                event: true
            }
        })

        if (!ticket) {
            throw new NotFoundException("Ticket not found");
        }

        return ticket;
    }

    async reserveTicket(dto: ReserveTicketDto): Promise<Ticket> {
        return this.prisma.$transaction(async (prisma) => {
            const event = await this.event.checkEventExisting(dto.event_id)

            if (event.tickets_left < 1) {
                throw new ConflictException('No tickets available')
            }

            const existingTicket = await prisma.ticket.findFirst({
                where: {
                    event_id: dto.event_id,
                    user_id: dto.user_id
                }
            })

            if (existingTicket) {
                throw new ConflictException('User already reserved ticket on this event')
            }

            if (event.tickets_left === 1) {
                const lockAcquired = await this.redis.set(
                    `lock-ticket:${event.id}`,
                    1,
                    'EX',
                    60,
                    'NX'
                )
                if (!lockAcquired) {
                    throw new ConflictException('Someone else is reserving the last ticket')
                }
            }

            const ticket = await prisma.ticket.create({
                data: {
                    event_id: dto.event_id,
                    user_id: dto.user_id,
                },
            })

            await prisma.knownEvents.update({
                where: {
                    id: dto.event_id
                },
                data: {
                    tickets_left: {decrement: 1}
                }
            })

            return ticket
        })
    }

    async cancelTicket(ticket_id: string, dto: CancelTicketDto): Promise<Ticket> {
        const ticket = await this.getTicketById(ticket_id)

        if (ticket.user_id !== dto.user_id) {
            throw new UnauthorizedException('You cannot perform this action')
        }

        return this.prisma.$transaction(async (prisma) => {
            const deletedTicket = await prisma.ticket.delete({
                where: {
                    id: ticket_id,
                }
            })

            const updatedEvent = await prisma.knownEvents.update({
                where: {
                    id: ticket.event_id
                },
                data: {
                    tickets_left: {increment: 1}
                }
            })

            if (updatedEvent.tickets_left === 1) {
                await this.redis.del(`lock-ticket:${ticket.event_id}`)
            }

            return deletedTicket
        })
    }
}
