<script setup lang="ts">
import { useUIStore } from "@/stores/ui.store";
import { storeToRefs } from "pinia";
import { XCircle } from '@lucide/vue';

const uiStore = useUIStore();
const { error } = storeToRefs(uiStore);

const clearError = () => {
  uiStore.removeError();
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="error"
      class="fixed bottom-5 right-5 z-[9999] bg-accent text-white rounded-lg shadow-xl p-4 max-w-md"
    >
      <div class="flex items-start gap-3">
        <XCircle class="flex-shrink-0 mt-0.5" />
        <div class="flex-1">
          <p class="font-bold text-sm">Error</p>
          <p class="text-sm">{{ error }}</p>
        </div>
        <button
          @click="clearError"
          class="text-white hover:text-gray-200 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  </Teleport>
</template>
