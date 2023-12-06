import { defineStore } from 'pinia';

export const useAccountStore = defineStore({
  id: 'account',

  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
  }),

  actions: {
    setAuthState(state: boolean) {
        this.isAuthenticated = state
        localStorage.setItem('isAuthenticated', state.toString())
    }
  }
});
