<script setup lang="ts">
interface Props {
  name: string | null;
}

defineProps<Props>();
</script>

<template>
  <p class="text-3xl text-accent font-bold">{{ name }}</p>
</template>
