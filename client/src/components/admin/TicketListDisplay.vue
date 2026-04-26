<script setup lang="ts">
import type { TicketResponse } from "@/types/tickets.types";
import AppCard from "../shared/AppCard.vue";
import AppContainer from "../shared/AppContainer.vue";
import AppHeading from "../shared/AppHeading.vue";

interface Props {
  tickets: TicketResponse[];
  eventName?: string;
}

defineProps<Props>();
</script>

<template>
  <AppContainer direction="col" gap="md" fullWidth>
    <AppHeading v-if="eventName" :level="2" :text="`Tickets for ${eventName}`" />

    <div v-for="ticket in tickets" :key="ticket.id">
      <AppCard padding="md">
        <AppContainer direction="col" gap="sm">
          <p class="text-accent">Ticket ID: {{ ticket.id }}</p>
          <p class="text-accent">User ID: {{ ticket.user_id }}</p>
        </AppContainer>
      </AppCard>
    </div>

    <p v-if="tickets.length === 0" class="text-accent">No tickets reserved yet</p>
  </AppContainer>
</template>
