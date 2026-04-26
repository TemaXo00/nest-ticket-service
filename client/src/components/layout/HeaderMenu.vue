<script setup lang="ts">
import { CircleX } from '@lucide/vue';
import HeaderLink from "./HeaderLink.vue";
import { links } from "@/utils/links.util.ts";
import { useUIStore } from "@/stores/ui.store";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user.store.ts";
import LogoutButton from "./LogoutButton.vue";

const uiStore = useUIStore();
const { is_menu_open } = storeToRefs(uiStore);

const closeMenu = () => {
  uiStore.closeMenu();
};

const store = useUserStore();
</script>

<template>
  <Teleport to="body" v-if="store.user_id">
    <Transition name="fade">
      <div
        v-if="is_menu_open"
        class="fixed inset-0 z-9998 bg-black/50 backdrop-blur-sm md:hidden"
        @click="closeMenu"
      >
        <Transition name="slide">
          <div
            v-if="is_menu_open"
            class="fixed top-0 left-0 h-full w-64 bg-muted shadow-xl p-4 flex flex-col gap-3"
            @click.stop
          >
            <div class="flex justify-end">
              <button @click="closeMenu" class="text-accent">
                <CircleX />
              </button>
            </div>
            <HeaderLink
              v-for="item in links"
              :key="item.link"
              :link="item.link"
              :name="item.name"
              @click="closeMenu"
            />
            <LogoutButton @click="closeMenu" />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
