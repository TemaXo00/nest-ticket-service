<script setup lang="ts">
import { Ellipsis } from '@lucide/vue';

const emit = defineEmits<{
  (e: 'open'): void;
}>();

const click = (): void => {
  emit('open');
};
</script>

<template>
  <button
    @click="click"
    class="flex flex-col items-center justify-center p-1 md:hidden text-accent bg-container/60 rounded-xl hover:scale-95 hover:bg-container/50 transition-all ease-in duration-300"
  >
    <Ellipsis />
  </button>
</template>
