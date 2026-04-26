import {defineStore} from "pinia";
import {onMounted, ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const user_id = ref<string | null>(null);

  const setUser = (id: string): void => {
    user_id.value = id;
    localStorage.setItem('user', id)
  }

  const removeUser = (): void => {
    localStorage.removeItem('user');
  }

  const getUser = (): void => {
    const user = localStorage.getItem('user')
    if (user) {
      user_id.value = user
    }
  }

  onMounted(() => {
    getUser()
  })

  return {
    user_id,
    setUser,
    removeUser,
    getUser
  }
})
