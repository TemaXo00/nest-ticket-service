import { ticketApi } from '@/api/config.api';
import type { ReserveTicketDto, CancelTicketDto, TicketResponse } from '@/types/tickets.types';
import { handleApiError } from './error-handler.api';

export const ticketsApiClient = {
  async getTicketsByEvent(event_id: string): Promise<TicketResponse[]> {
    try {
      const { data } = await ticketApi.get<TicketResponse[]>(`/tickets/event/${event_id}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getTicketsByUser(user_id: string): Promise<TicketResponse[]> {
    try {
      const { data } = await ticketApi.get<TicketResponse[]>(`/tickets/user/${user_id}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getTicketById(id: string): Promise<TicketResponse> {
    try {
      const { data } = await ticketApi.get<TicketResponse>(`/tickets/${id}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async reserveTicket(dto: ReserveTicketDto): Promise<TicketResponse> {
    try {
      const { data } = await ticketApi.post<TicketResponse>('/tickets/reserve', dto);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async cancelTicket(id: string, dto: CancelTicketDto): Promise<TicketResponse> {
    try {
      const { data } = await ticketApi.delete<TicketResponse>(`/tickets/${id}`, { data: dto });
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
