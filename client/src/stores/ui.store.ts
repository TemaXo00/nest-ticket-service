import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore('ui', () => {
  const is_loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const is_menu_open = ref<boolean>(false);

  const setLoading = (): void => {
    is_loading.value = true;
  };

  const removeLoading = (): void => {
    is_loading.value = false;
  };

  const setError = (err: string): void => {
    error.value = err;
    setTimeout(() => {
      if (error.value === err) {
        removeError();
      }
    }, 5000);
  };

  const removeError = (): void => {
    error.value = null;
  };

  const openMenu = (): void => {
    is_menu_open.value = true;
  };

  const closeMenu = (): void => {
    is_menu_open.value = false;
  };

  return {
    is_loading,
    error,
    is_menu_open,
    setLoading,
    removeLoading,
    setError,
    removeError,
    openMenu,
    closeMenu,
  };
});
