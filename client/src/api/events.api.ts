import { eventsApi } from '@/api/config.api';
import type { CreateEventDto, UpdateNameDto, UpdateTicketsDto, EventResponse } from '@/types/events.types';
import { handleApiError } from './error-handler.api';

export const eventsApiClient = {
  async getAllEvents(): Promise<EventResponse[]> {
    try {
      const { data } = await eventsApi.get<EventResponse[]>('/event');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async getEventById(id: string): Promise<EventResponse> {
    try {
      const { data } = await eventsApi.get<EventResponse>(`/event/${id}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async createEvent(dto: CreateEventDto): Promise<EventResponse> {
    try {
      const { data } = await eventsApi.post<EventResponse>('/event', dto);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async updateEventName(id: string, dto: UpdateNameDto): Promise<EventResponse> {
    try {
      const { data } = await eventsApi.patch<EventResponse>(`/event/${id}/name`, dto);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async updateEventTickets(id: string, dto: UpdateTicketsDto): Promise<EventResponse> {
    try {
      const { data } = await eventsApi.patch<EventResponse>(`/event/${id}/tickets`, dto);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  async deleteEvent(id: string): Promise<EventResponse> {
    try {
      const { data } = await eventsApi.delete<EventResponse>(`/event/${id}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
