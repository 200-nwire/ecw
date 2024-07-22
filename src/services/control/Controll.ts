import { client } from '@/services/GraphQlClient'
import { provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(client)

import { EventsMiter } from '@/services/control/eventsMitter'
import getControlForAccount from '@/services/control/getControlForAccount.graphql'

export const fetchClientActionsService = ({ clientId = '', first = 10 }, after?: string) => {
  const only = Object.keys(EventsMiter)
  const filterOnly = only.filter(on => on !== EventsMiter.ACCOUNT_ABANDONED).filter(on => on !== EventsMiter.CAR_WASHED)
  const query = {
    query: getControlForAccount,
    variables: { clientId, first, only: filterOnly, after },
  }
  return client.query(query)
}
