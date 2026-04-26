import type {EventResponse} from "@/types/events.types.ts";

export interface ReserveTicketDto {
  event_id: string;
  user_id: string;
}

export interface CancelTicketDto {
  user_id: string;
}

export interface TicketResponse {
  id: string;
  event_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  event?: EventResponse;
}
