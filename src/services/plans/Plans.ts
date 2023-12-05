import { client } from '@/services/GraphQlClient';
import {
  provideApolloClient
} from '@vue/apollo-composable';

provideApolloClient(client)

import getPlans from '@/services/plans/getPlans.graphql';

export const fetchPlansService = () => {
    const query = {
      query: getPlans,
    };
    return client.query(query);
  };
  