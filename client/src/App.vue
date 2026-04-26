<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppMain from "@/components/layout/AppMain.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import ErrorAlert from "@/components/shared/ErrorAlert.vue";
import { useUserStore } from "@/stores/user.store.ts";
import { onMounted } from "vue";

const store = useUserStore();

onMounted(() => {
  store.getUser();
});
</script>

<template>
  <AppHeader />
  <AppMain>
    <router-view />
  </AppMain>
  <AppFooter />
  <LoadingSpinner />
  <ErrorAlert />
</template>
