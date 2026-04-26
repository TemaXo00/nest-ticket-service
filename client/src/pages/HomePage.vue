<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.store.ts";
import {ticketsApiClient} from "@/api/tickets.api";
import {eventsApiClient} from "@/api/events.api";
import TitleComponent from "@/components/shared/TitleComponent.vue";
import type {TicketResponse} from "@/types/tickets.types";
import type {EventResponse} from "@/types/events.types";
import {useUIStore} from "@/stores/ui.store";
import AppCard from "@/components/shared/AppCard.vue";
import AppContainer from "@/components/shared/AppContainer.vue";
import AppButton from "@/components/shared/AppButton.vue";
import AppHeading from "@/components/shared/AppHeading.vue";

const userStore = useUserStore();
const uiStore = useUIStore();
const userTickets = ref<TicketResponse[]>([]);
const events = ref<EventResponse[]>([]);

const title = computed(() => {
  return `Welcome back, ${userStore.user_id}!`;
});

const loadUserTickets = async () => {
  uiStore.setLoading();
  try {
    userTickets.value = await ticketsApiClient.getTicketsByUser(userStore.user_id!);
    const eventIds = [...new Set(userTickets.value.map(t => t.event_id))];
    events.value = await Promise.all(
      eventIds.map(id => eventsApiClient.getEventById(id))
    );
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to load your tickets');
  } finally {
    uiStore.removeLoading();
  }
};

const cancelTicket = async (ticketId: string) => {
  uiStore.setLoading();
  try {
    await ticketsApiClient.cancelTicket(ticketId, {
      user_id: userStore.user_id!,
    });
    await loadUserTickets();
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to cancel ticket');
  } finally {
    uiStore.removeLoading();
  }
};

onMounted(() => {
  loadUserTickets();
});
</script>

<template>
  <TitleComponent :name="title" />

  <div v-if="userTickets.length === 0" class="mt-5">
    <p class="text-accent">You don't have any tickets yet</p>
  </div>

  <div v-else class="mt-5 flex flex-col gap-3 w-full">
    <div v-for="ticket in userTickets" :key="ticket.id">
      <AppCard padding="md">
        <AppContainer direction="col" gap="sm">
          <AppHeading :level="3" :text="events.find(e => e.id === ticket.event_id)?.name || 'Unknown Event'" />
          <p class="text-accent">Ticket ID: {{ ticket.id }}</p>
          <AppButton @click="cancelTicket(ticket.id)" variant="primary" size="sm" class="mt-2">
            Cancel Ticket
          </AppButton>
        </AppContainer>
      </AppCard>
    </div>
  </div>
</template>
