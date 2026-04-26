import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const user_id = ref<string | null>(null);

  const setUser = (id: string): void => {
    user_id.value = id;
    localStorage.setItem('user', id);
    router.push('/');
  };

  const removeUser = (): void => {
    user_id.value = null;
    localStorage.removeItem('user');
    router.push('/login');
  };

  const getUser = (): void => {
    const user = localStorage.getItem('user');
    if (user) {
      user_id.value = user;
    }
  };

  return {
    user_id,
    setUser,
    removeUser,
    getUser
  };
});
