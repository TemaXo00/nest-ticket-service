<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
  link: RouteLocationRaw;
  name: string;
}

defineProps<Props>();
</script>

<template>
  <router-link
    :to="link"
    class="text-sm px-4 py-2 border-2 border-accent rounded-lg hover:bg-container/40 text-accent transition-all ease-in duration-150"
    active-class="bg-container/65"
  >
    {{ name }}
  </router-link>
</template>
