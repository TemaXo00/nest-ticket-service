export interface CreateEventDto {
  name: string;
  tickets_amount: number;
}

export interface UpdateNameDto {
  name: string;
}

export interface UpdateTicketsDto {
  tickets_amount: number;
}

export interface EventResponse {
  id: string;
  name: string;
  tickets_amount: number;
  created_at: string;
  updated_at: string;
}
