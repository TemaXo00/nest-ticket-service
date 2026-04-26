import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import {Event} from '@prisma-gen/client'

import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateNameDto} from "./dto/update-name.dto";
import { EventService } from './event.service';
import {UpdateTicketsDto} from "./dto/update-tickets.dto";

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Get all events' })
  @ApiOkResponse()
  @Get()
  async getAllEvents(): Promise<Event[]> {
    return await this.eventService.getEvents()
  }

  @ApiOperation({ summary: 'Get event by id' })
  @ApiOkResponse({description: 'Get event by id'})
  @ApiNotFoundResponse({description: 'Event not found'})
  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.getEventById(id)
  }

  @ApiOperation({ summary: 'Create new event' })
  @ApiCreatedResponse({description: 'Created new event' })
  @ApiBadRequestResponse({description: 'Data not valid'})
  @ApiConflictResponse({description: 'Name already exists'})
  @Post()
  async createEvent(@Body() dto: CreateEventDto): Promise<Event> {
    return await this.eventService.createEvent(dto);
  }

  @ApiOperation({ summary: 'Update event name' })
  @ApiOkResponse({description: 'Event updated'})
  @ApiNotFoundResponse({description: 'Event not found'})
  @ApiBadRequestResponse({description: 'Data not valid'})
  @ApiConflictResponse({description: 'Name already exists'})
  @Patch(':id/name')
  async updateEventName(@Param('id') id: string, @Body() dto: UpdateNameDto): Promise<Event> {
    return await this.eventService.changeName(id, dto);
  }

  @ApiOperation({ summary: 'Update event tickets amount' })
  @ApiOkResponse({description: 'Event tickets amount changed'})
  @ApiNotFoundResponse({description: 'Event not found'})
  @ApiBadRequestResponse({description: 'Data not valid'})
  @Patch(':id/tickets')
  async updateEventTickets(@Param('id') id: string, @Body() dto: UpdateTicketsDto): Promise<Event> {
    return await this.eventService.changeTicketsAmount(id, dto);
  }

  @ApiOperation({ summary: 'Delete event' })
  @ApiOkResponse({description: 'Event deleted'})
  @ApiNotFoundResponse({description: 'Event not found'})
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<Event> {
    return await this.eventService.deleteEvent(id)
  }
}
