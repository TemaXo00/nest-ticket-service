<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { EventResponse } from "@/types/events.types";
import AppButton from "../shared/AppButton.vue";
import AppCard from "../shared/AppCard.vue";
import AppContainer from "../shared/AppContainer.vue";
import AppHeading from "../shared/AppHeading.vue";
import AppInput from "../shared/AppInput.vue";

interface Props {
  event: EventResponse;
  isAdmin?: boolean;
  ticketsLeft?: number;
  hasReserved?: boolean;
}

const props = defineProps<Props>();
const router = useRouter();
const emit = defineEmits<{
  (e: 'delete', id: string): void;
  (e: 'updateTickets', id: string, tickets_amount: number): void;
}>();

const isEditing = ref(false);
const newTicketsAmount = ref(props.event.tickets_amount);

const viewDetails = () => {
  router.push(`/events/${props.event.id}`);
};

const viewTickets = () => {
  router.push(`/admin/tickets/${props.event.id}`);
};

const startEdit = () => {
  isEditing.value = true;
  newTicketsAmount.value = props.event.tickets_amount;
};

const saveTickets = () => {
  if (newTicketsAmount.value !== props.event.tickets_amount) {
    emit('updateTickets', props.event.id, newTicketsAmount.value);
  }
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
  newTicketsAmount.value = props.event.tickets_amount;
};
</script>

<template>
  <AppCard :padding="props.isAdmin ? 'md' : 'md'">
    <AppContainer direction="col" gap="md" class="h-full">
      <div class="grow">
        <AppHeading :level="3" :text="event.name" class="mb-3" />

        <div v-if="!isAdmin">
          <p class="text-accent">Total tickets: {{ event.tickets_amount }}</p>
          <p v-if="ticketsLeft !== undefined" class="text-accent">Tickets left: {{ ticketsLeft }}</p>
          <p v-if="hasReserved" class="text-accent font-bold mt-2">You have a ticket for this event</p>
        </div>

        <div v-else>
          <div v-if="!isEditing">
            <p class="text-accent">Total tickets: {{ event.tickets_amount }}</p>
          </div>

          <div v-else class="flex flex-col gap-2 mt-2">
            <AppInput
              v-model.number="newTicketsAmount"
              type="number"
              :min="1"
              :max="10000"
            />
            <div class="flex gap-2">
              <AppButton @click="saveTickets" size="sm" variant="primary">
                Save
              </AppButton>
              <AppButton @click="cancelEdit" size="sm" variant="secondary">
                Cancel
              </AppButton>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-auto flex-wrap">
        <template v-if="!isAdmin">
          <AppButton @click="viewDetails" size="sm" variant="primary">
            View Details
          </AppButton>
        </template>

        <template v-if="isAdmin && !isEditing">
          <AppButton @click="viewTickets" size="sm" variant="primary">
            View Tickets
          </AppButton>
          <AppButton @click="startEdit" size="sm" variant="secondary">
            Change Tickets
          </AppButton>
          <AppButton @click="emit('delete', event.id)" size="sm" variant="danger">
            Delete
          </AppButton>
        </template>
      </div>
    </AppContainer>
  </AppCard>
</template>
