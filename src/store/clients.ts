import { fetchClientPaymentsService, fetchClientService, fetchClients, fetchClientsSummaryService } from '@/services/clients/Clients';
import { defineStore } from 'pinia';

export const useClientStore = defineStore({
    id: 'clients',

  state: () => ({
    clients: [] as any,
    client: {} as any,
    clientsSummary: {} as any,
    clientPayments: {},
    fullClientPayments: [] as any,
    hasNextPage: null as any,
    endCursor: '' as any
  }),

  actions: {
    async getClients(filters = {}, after = '') {
        try {
            const { data } = await fetchClients(filters, after);
            if (!after) this.clients = data;
            else {
              this.clients.accounts.edges.push(...data.accounts.edges)
            }
            this.hasNextPage = data.accounts.pageInfo.hasNextPage;
            this.endCursor = data.accounts.pageInfo.endCursor;
        } catch (error) {
            console.log(error)

        }
    },
    async getClientsSummary(filters = {}, after = '') {
        try {
            const { data } = await fetchClientsSummaryService(filters);
            this.clientsSummary = data.accounts.summary;
        } catch (error) {
            console.log(error)
        }
    },
    async getClientPayments(clientId: string, sum = 4, getFullClientPayments = false, after?: string) {
        try {
            const { data } = await fetchClientPaymentsService(clientId, sum = 4, after);
            if (getFullClientPayments) this.fullClientPayments = data.invoices.edges;
            else this.clientPayments = data.invoices.edges;
        } catch (error) {
            console.log(error)
        }
    },
    async getClient(clientId: string) {
        try {
            const { data } = await fetchClientService(clientId);
            this.client = data;
        } catch (error) {
            console.log(error)
        }
    },
  }
})