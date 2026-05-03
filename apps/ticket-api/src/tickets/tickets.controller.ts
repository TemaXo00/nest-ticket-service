import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Ticket } from '@org/ticket-db'
import { CancelTicketDto, ReserveTicketDto } from '@org/tickets-dto';
import { OrgTicketsFeatureService } from '@org/tickets-feature';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: OrgTicketsFeatureService) {}

  @ApiOperation({ summary: 'Get tickets by event' })
  @ApiOkResponse({ description: 'Returns tickets' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Get('event/:event_id')
  async getTicketsByEventId(
    @Param('event_id') event_id: string,
  ): Promise<Ticket[]> {
    return this.ticketsService.getTicketsByEvent(event_id);
  }

  @ApiOperation({ summary: 'Get tickets by user ID' })
  @ApiOkResponse({ description: 'Returns ticket by user ID' })
  @Get('user/:user_id')
  async getTicketsByUser(@Param('user_id') user_id: string): Promise<Ticket[]> {
    return this.ticketsService.getTicketsByUser(user_id);
  }

  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiOkResponse({ description: 'Returns ticket by ID' })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<Ticket> {
    return this.ticketsService.getTicketById(id);
  }

  @ApiOperation({ summary: 'Reserve ticket' })
  @ApiCreatedResponse({ description: 'Ticket Reserved successfully' })
  @ApiConflictResponse({
    description:
      'No tickets available or already reserved or reserving the last ticket',
  })
  @Post('/reserve')
  async reserveTicket(@Body() dto: ReserveTicketDto): Promise<Ticket> {
    return this.ticketsService.reserveTicket(dto);
  }

  @ApiOperation({ summary: 'Cancel ticket' })
  @ApiOkResponse({ description: 'Cancel ticket successfully' })
  @ApiNotFoundResponse({ description: 'Ticket not found' })
  @ApiUnauthorizedResponse({ description: 'You cannot perform this operation' })
  @Delete(':id')
  async cancelTicket(
    @Param('id') id: string,
    @Body() dto: CancelTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.cancelTicket(id, dto);
  }
}
