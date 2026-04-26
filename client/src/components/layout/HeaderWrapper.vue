<script setup lang="ts">
import HeaderMenu from "./HeaderMenu.vue";
import HeaderMenuButton from "./HeaderMenuButton.vue";
import { useUIStore } from "@/stores/ui.store";

const uiStore = useUIStore();

const openMenu = () => {
  uiStore.openMenu();
};
</script>

<template>
  <header class="flex flex-row items-center justify-between bg-muted/60 px-6 py-3">
    <slot />
    <HeaderMenuButton @open="openMenu" />
    <HeaderMenu />
  </header>
</template>
