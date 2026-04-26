<script setup lang="ts">
import { useRouter } from "vue-router";
import AppButton from "../shared/AppButton.vue";

const router = useRouter();
</script>

<template>
  <div class="flex gap-3 mt-5">
    <AppButton @click="router.push('/admin/events')" size="md">
      Manage Events
    </AppButton>
  </div>
</template>
