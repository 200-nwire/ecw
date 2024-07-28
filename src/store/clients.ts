import { IFilters } from '@/interfaces/filters'
import {
  fetchClientPaymentsService,
  fetchClientService,
  fetchClients,
  fetchClientsSummaryService,
} from '@/services/clients/Clients'
import { defineStore } from 'pinia'

export const useClientStore = defineStore({
  id: 'clients',

  state: () => ({
    searchFromHeader: false,
    clients: [] as any,
    isLoadingClients: false as boolean,
    isLoadingClientsInitial: false as boolean,
    client: {} as any,
    clientsSummary: {} as any,
    clientPayments: {},
    fullClientPayments: [] as any,
    hasNextPage: null as any,
    endCursor: '' as any,
    totalAccounts: 0 as number,
  }),

  actions: {
    setSearchFromHeader(isFromHeader: boolean) {
      this.searchFromHeader = isFromHeader
    },
    async getClients(filters?: IFilters, initialLoad = false) {
      try {
        this.isLoadingClients = true
        this.isLoadingClientsInitial = initialLoad;
        if (initialLoad) {
          this.clients = []
          this.hasNextPage = true
          this.endCursor = ''
        }

        filters = {
          ...filters,
          dates: {
            since: filters?.dates?.[0],
            until: filters?.dates?.[1],
          },
          after: this.endCursor
        }
        const { data } = await fetchClients(filters)
        this.clients.push(...(data.accounts?.edges ?? []))
        console.log('clients :>> ', this.clients);

        this.hasNextPage = data.accounts.pageInfo.hasNextPage
        this.endCursor = data.accounts.pageInfo.endCursor
        this.totalAccounts = data.accounts.totalCount
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoadingClients = false
        this.isLoadingClientsInitial = false
      }
    },
    async getClientsSummary(filters = {}, after = '') {
      try {
        const { data } = await fetchClientsSummaryService(filters)
        this.clientsSummary = data.accounts.summary
      } catch (error) {
        console.log(error)
      }
    },
    async getClientPayments(clientId: string, sum = 4, getFullClientPayments = false, after?: string) {
      try {
        const { data } = await fetchClientPaymentsService(clientId, (sum = 4), after)
        if (getFullClientPayments) this.fullClientPayments = data.invoices.edges
        else this.clientPayments = data.invoices.edges
      } catch (error) {
        console.log(error)
      }
    },
    async getClient(clientId: string) {
      try {
        const { data } = await fetchClientService(clientId)
        this.client = data
      } catch (error) {
        console.log(error)
      }
    },
  },
})
