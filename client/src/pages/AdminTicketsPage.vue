<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { eventsApiClient } from "@/api/events.api";
import { ticketsApiClient } from "@/api/tickets.api";
import type { EventResponse } from "@/types/events.types";
import type { TicketResponse } from "@/types/tickets.types";
import TicketListDisplay from "@/components/admin/TicketListDisplay.vue";
import { useUIStore } from "@/stores/ui.store";

const route = useRoute();
const router = useRouter();
const event = ref<EventResponse | null>(null);
const tickets = ref<TicketResponse[]>([]);
const uiStore = useUIStore();

const loadData = async () => {
  uiStore.setLoading();
  try {
    const eventId = route.params.event_id as string;
    event.value = await eventsApiClient.getEventById(eventId);
    tickets.value = await ticketsApiClient.getTicketsByEvent(eventId);
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to load tickets');
    router.push('/admin/events');
  } finally {
    uiStore.removeLoading();
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div v-if="event">
    <TicketListDisplay :tickets="tickets" :eventName="event.name" />
  </div>
</template>
