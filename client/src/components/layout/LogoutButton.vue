<script setup lang="ts">
import { LogOut } from '@lucide/vue';
import { useUserStore } from "@/stores/user.store.ts";

const store = useUserStore();

const logout = () => {
  store.removeUser();
};
</script>

<template>
  <button
    @click="logout"
    class="border-2 border-accent rounded-lg hover:bg-container/40 text-accent transition-all ease-in duration-150 flex items-center gap-2 px-4 py-2 text-sm"
  >
    <LogOut />
    Logout
  </button>
</template>
