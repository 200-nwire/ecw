import { client } from '@/services/GraphQlClient'
import { provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(client)

import getOrders from '@/services/products/getProductOrders.graphql'

export const fetchClientProductsOrders = (clientId: string, sum = 4, after?: string) => {
  const query = {
    query: getOrders,
    variables: { clientId, sum, after },
  }
  return client.query(query)
}
