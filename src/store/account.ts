import { auth } from '@/Firebase'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useAccount = defineStore('account', () => {
  const user = computed(() => auth.currentUser)

  return {
    user,
  }
})
