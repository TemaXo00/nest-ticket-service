<script setup lang="ts">
import {useUserStore} from "@/stores/user.store.ts";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const store = useUserStore();

const newUser = ref<string>("");

const {
  user_id
} = storeToRefs(store);
</script>

<template>
  {{user_id}}
  <input v-model="newUser"/>
  <button @click="store.setUser(newUser)">Set user</button>
</template>

<style scoped></style>
