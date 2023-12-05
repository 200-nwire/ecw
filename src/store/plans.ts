import { fetchPlansService } from '@/services/plans/Plans';
import { defineStore } from 'pinia';

export const usePlanStore = defineStore({
    id: 'plans',

  state: () => ({
    plans: [] as any,
  }),

  actions: {
    async getPlans() {
        try {
            const { data } = await fetchPlansService();
            this.plans = data.plans;
        } catch {
            console.log('error')
        }
      },
  
  }
})