import { client } from '@/services/GraphQlClient'
import { provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(client)

import getClient from '@/services/clients/client/getClient.graphql'
import getClients from '@/services/clients/getClients.graphql'
import clients from '@/services/clients/getClientsSummary.graphql'
import getPayments from '@/services/clients/getPayments.graphql'

export function removeEmptyArray(obj: object) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (value?.length === 0) return undefined
      return value
    }),
  )
}

export const fetchClients = (
  filterObj?: {
    search?: any
    stations?: any
    dates?: any
    statuses?: any
    plans?: object[]
    company?: any
    value?: any
    clientsWithPurchases?: any
    clientsWithSubscriptions?: any
  },
  after?: any,
) => {
  const query = {
    query: getClients,
    variables: removeEmptyArray({ ...filterObj, after }),
  }
  return client.query(query)
}

export const fetchClientsSummaryService = (
  filterObj?: { search?: any; stations?: any; dates?: any; statuses?: any; plans?: any; company?: any },
  after?: any,
) => {
  const query = {
    query: clients,
    variables: removeEmptyArray({ ...filterObj, after }),
  }
  return client.query(query)
}

export const fetchClientPaymentsService = (clientId: string, sum = 4, after?: string) => {
  const query = {
    query: getPayments,
    variables: { clientId, sum, after },
  }
  return client.query(query)
}

export const fetchClientService = (clientId: string) => {
  const query = {
    query: getClient,
    variables: { clientId },
  }
  return client.query(query)
}
