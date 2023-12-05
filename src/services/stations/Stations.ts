import { client } from '@/services/GraphQlClient';
import {
  provideApolloClient
} from '@vue/apollo-composable';

provideApolloClient(client)

import getWashes from '@/services/stations/getWashes.graphql';

import getStations from '@/services/stations/getStations.graphql';

export const fetchStationsService = () => {
    const query = {
        query: getStations,
    };
    return client.query(query);
};

export const fetchWashesService = (filterObj?: {
  companyId?: any;
  clientId?: any;
  station?: any;
  search?: any;
  dates?: any;
  after?: any;
  first?: any;
}) => {
  const query = {
      query: getWashes,
      variables: { ...filterObj },
  };
  return client.query(query);
};