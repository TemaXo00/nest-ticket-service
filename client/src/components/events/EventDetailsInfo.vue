<script setup lang="ts">
import type { EventResponse } from "@/types/events.types";
import AppButton from "../shared/AppButton.vue";
import AppContainer from "../shared/AppContainer.vue";
import AppHeading from "../shared/AppHeading.vue";
import AppCard from "../shared/AppCard.vue";

interface Props {
  event: EventResponse;
  ticketsLeft: number;
  hasReserved: boolean;
  onReserve: () => void;
  onBack: () => void;
}

defineProps<Props>();
</script>

<template>
  <AppContainer direction="col" gap="md" fullWidth>
    <AppHeading :level="1" :text="event.name" />

    <AppCard padding="md">
      <AppContainer direction="col" gap="md">
        <p class="text-accent">Tickets left: {{ ticketsLeft }}</p>

        <AppButton
          v-if="!hasReserved && ticketsLeft > 0"
          @click="onReserve"
          variant="primary"
          size="lg"
        >
          Reserve Ticket
        </AppButton>

        <AppButton
          v-else-if="hasReserved"
          @click="onBack"
          variant="secondary"
          size="lg"
        >
          You have a ticket for this event
        </AppButton>

        <p v-else class="text-accent">No tickets available</p>
      </AppContainer>
    </AppCard>
  </AppContainer>
</template>
