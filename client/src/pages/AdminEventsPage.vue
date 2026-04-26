<script setup lang="ts">
import { onMounted, ref } from "vue";
import { eventsApiClient } from "@/api/events.api";
import type { EventResponse } from "@/types/events.types";
import TitleComponent from "@/components/shared/TitleComponent.vue";
import EventCardComponent from "@/components/events/EventCardComponent.vue";
import CreateEventForm from "@/components/admin/CreateEventForm.vue";
import { useUIStore } from "@/stores/ui.store";

const events = ref<EventResponse[]>([]);
const uiStore = useUIStore();

const loadEvents = async () => {
  uiStore.setLoading();
  try {
    events.value = await eventsApiClient.getAllEvents();
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to load events');
  } finally {
    uiStore.removeLoading();
  }
};

const deleteEvent = async (id: string) => {
  uiStore.setLoading();
  try {
    await eventsApiClient.deleteEvent(id);
    await loadEvents();
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to delete event');
  } finally {
    uiStore.removeLoading();
  }
};

const updateTickets = async (id: string, tickets_amount: number) => {
  uiStore.setLoading();
  try {
    await eventsApiClient.updateEventTickets(id, { tickets_amount });
    await loadEvents();
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to update tickets amount');
  } finally {
    uiStore.removeLoading();
  }
};

onMounted(() => {
  loadEvents();
});
</script>

<template>
  <TitleComponent name="Manage Events" />
  <CreateEventForm @created="loadEvents" />
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-5">
    <EventCardComponent
      v-for="event in events"
      :key="event.id"
      :event="event"
      :isAdmin="true"
      @delete="deleteEvent"
      @updateTickets="updateTickets"
    />
  </div>
</template>
