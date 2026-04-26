<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { links } from "@/utils/links.util.ts";
import { useUserStore } from "@/stores/user.store.ts";
import LogoutButton from "./LogoutButton.vue";

const store = useUserStore();
</script>

<template>
  <div v-if="store.user_id" class="hidden md:flex flex-row items-center gap-3">
    <HeaderLink v-for="item in links" :key="item.link" :link="item.link" :name="item.name" />
    <LogoutButton />
  </div>
</template>
