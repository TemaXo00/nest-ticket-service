<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { eventsApiClient } from "@/api/events.api";
import { ticketsApiClient } from "@/api/tickets.api";
import type { EventResponse } from "@/types/events.types";
import type { TicketResponse } from "@/types/tickets.types";
import EventDetailsInfo from "@/components/events/EventDetailsInfo.vue";
import { useUserStore } from "@/stores/user.store";
import { useUIStore } from "@/stores/ui.store";

const route = useRoute();
const router = useRouter();
const event = ref<EventResponse | null>(null);
const userTickets = ref<TicketResponse[]>([]);
const allTickets = ref<TicketResponse[]>([]);
const ticketsLeft = ref(0);
const userStore = useUserStore();
const uiStore = useUIStore();

const loadData = async () => {
  uiStore.setLoading();
  try {
    const id = route.params.id as string;
    event.value = await eventsApiClient.getEventById(id);
    userTickets.value = await ticketsApiClient.getTicketsByUser(userStore.user_id!);
    allTickets.value = await ticketsApiClient.getTicketsByEvent(id);
    ticketsLeft.value = event.value.tickets_amount - allTickets.value.length;
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to load event details');
    router.push('/events');
  } finally {
    uiStore.removeLoading();
  }
};

const reserveTicket = async () => {
  if (!event.value) return;

  uiStore.setLoading();
  try {
    await ticketsApiClient.reserveTicket({
      event_id: event.value.id,
      user_id: userStore.user_id!,
    });
    await loadData();
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to reserve ticket');
  } finally {
    uiStore.removeLoading();
  }
};

const hasReserved = () => {
  return userTickets.value.some(t => t.event_id === event.value?.id);
};

const goBack = () => {
  router.push('/events');
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div v-if="event" class="w-full">
    <EventDetailsInfo
      :event="event"
      :ticketsLeft="ticketsLeft"
      :hasReserved="hasReserved()"
      :onReserve="reserveTicket"
      :onBack="goBack"
    />
  </div>
</template>
