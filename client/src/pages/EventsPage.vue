<script setup lang="ts">
import { onMounted, ref } from "vue";
import { eventsApiClient } from "@/api/events.api";
import { ticketsApiClient } from "@/api/tickets.api";
import type { EventResponse } from "@/types/events.types";
import type { TicketResponse } from "@/types/tickets.types";
import TitleComponent from "@/components/shared/TitleComponent.vue";
import EventCardComponent from "@/components/events/EventCardComponent.vue";
import { useUIStore } from "@/stores/ui.store";
import { useUserStore } from "@/stores/user.store";

const events = ref<EventResponse[]>([]);
const userTickets = ref<TicketResponse[]>([]);
const allTickets = ref<Map<string, number>>(new Map());
const uiStore = useUIStore();
const userStore = useUserStore();

const loadData = async () => {
  uiStore.setLoading();
  try {
    events.value = await eventsApiClient.getAllEvents();
    userTickets.value = await ticketsApiClient.getTicketsByUser(userStore.user_id!);

    for (const event of events.value) {
      const tickets = await ticketsApiClient.getTicketsByEvent(event.id);
      allTickets.value.set(event.id, tickets.length);
    }
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to load events');
  } finally {
    uiStore.removeLoading();
  }
};

const getTicketsLeft = (eventId: string) => {
  const event = events.value.find(e => e.id === eventId);
  if (!event) return 0;
  const reservedCount = allTickets.value.get(eventId) || 0;
  return event.tickets_amount - reservedCount;
};

const hasReserved = (eventId: string) => {
  return userTickets.value.some(t => t.event_id === eventId);
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <TitleComponent name="Events" />
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-5">
    <EventCardComponent
      v-for="event in events"
      :key="event.id"
      :event="event"
      :ticketsLeft="getTicketsLeft(event.id)"
      :hasReserved="hasReserved(event.id)"
    />
  </div>
</template>
