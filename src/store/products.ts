import { fetchClientProductsOrders } from '@/services/products/Products';
import { defineStore } from 'pinia';

export const useProductStore = defineStore({
    id: 'products',

  state: () => ({
    clientOrders: [] as any,
    fullClientOrders: [] as any,
    hasNextPage: false as any,
    endCursor: '' as any
  }),

  actions: {
    async getClientOrders(clientId: string, sum = 4, showFull = false, after?: string) {
        try {
            const { data } = await fetchClientProductsOrders(clientId, sum, after);
            if (showFull) this.fullClientOrders = data.orders.edges
            else this.clientOrders = data.orders.edges;
        } catch {
            console.log('error')
        }
      },
  
  }
})