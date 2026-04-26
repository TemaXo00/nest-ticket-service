<script setup lang="ts">
import { ref } from "vue";
import { eventsApiClient } from "@/api/events.api";
import { useUIStore } from "@/stores/ui.store";
import AppInput from "../shared/AppInput.vue";
import AppButton from "../shared/AppButton.vue";
import AppContainer from "../shared/AppContainer.vue";
import AppHeading from "../shared/AppHeading.vue";
import AppCard from "../shared/AppCard.vue";

const emit = defineEmits<{
  (e: 'created'): void;
}>();

const name = ref("");
const tickets_amount = ref(1);
const uiStore = useUIStore();

const createEvent = async () => {
  uiStore.setLoading();
  try {
    await eventsApiClient.createEvent({
      name: name.value,
      tickets_amount: tickets_amount.value,
    });
    name.value = "";
    tickets_amount.value = 1;
    emit("created");
  } catch (err: any) {
    uiStore.setError(err.message || 'Failed to create event');
  } finally {
    uiStore.removeLoading();
  }
};
</script>

<template>
  <AppCard padding="md" class="mb-5">
    <form @submit.prevent="createEvent">
      <AppContainer direction="col" gap="md">
        <AppHeading :level="3" text="Create New Event" />

        <AppInput
          v-model="name"
          placeholder="Event Name"
          label="Event Name"
          required
        />

        <AppInput
          v-model.number="tickets_amount"
          type="number"
          :min="1"
          :max="10000"
          placeholder="Tickets Amount"
          label="Tickets Amount"
          required
        />

        <AppButton type="submit" size="md" class="max-w-40">
          Create Event
        </AppButton>
      </AppContainer>
    </form>
  </AppCard>
</template>
