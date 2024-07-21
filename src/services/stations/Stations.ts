import { client } from '@/services/GraphQlClient'
import { provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(client)

import getWashes from '@/services/stations/getWashes.graphql'

import getStations from '@/services/stations/getStations.graphql'
import getStationWashesSummary from '@/services/stations/getStationWashesSummary.graphql'

export const fetchStationsService = (stationId?: String) => {
  const query = {
    query: getStations,
    variables: { stationId },
  }
  return client.query(query)
}

export const fetchWashesService = (filterObj?: {
  companyId?: any
  clientId?: any
  station?: any
  search?: any
  dates?: any
  after?: any
  first?: any
}) => {
  const query = {
    query: getWashes,
    variables: { ...filterObj },
  }
  return client.query(query)
}

export const fetchStationWashesSummaryService = (filterObj?: { station?: any; search?: any; dates?: any }) => {
  const query = {
    query: getStationWashesSummary,
    variables: { ...filterObj },
  }
  return client.query(query)
}
