<script setup lang="ts">
import { LogIn } from '@lucide/vue';
import TitleComponent from "@/components/shared/TitleComponent.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store.ts";
import AppInput from "@/components/shared/AppInput.vue";
import AppButton from "@/components/shared/AppButton.vue";
import AppContainer from "@/components/shared/AppContainer.vue";

const user = ref<string>("");
const store = useUserStore();
</script>

<template>
  <AppContainer direction="col" gap="md">
    <TitleComponent name="Login" />

    <form @submit.prevent="store.setUser(user || 'default')" class="flex flex-col items-start gap-3">
      <AppInput
        v-model="user"
        placeholder="Username"
        label="Username"
        :required="true"
        class="w-80"
      />

      <AppButton type="submit" size="lg">
        <LogIn class="w-4 h-4" />
        Login
      </AppButton>
    </form>
  </AppContainer>
</template>
