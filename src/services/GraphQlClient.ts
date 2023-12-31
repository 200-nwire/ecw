import { ApolloClient, DefaultOptions, InMemoryCache, createHttpLink, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

let wsLink;

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const getHttpLink = () => {
  const link = createHttpLink({
    //@ts-ignore
    uri: import.meta.env.VITE_GRAPHQL_URL,
  });
  return link;
};

const reconnectSocket = (error : any) => {
  if (error?.length > 0) {
    wsLink = new GraphQLWsLink(createClient(socketParams));
  }
};

const socketParams = {
  //@ts-ignore
  url: import.meta.env.VITE_GRAPHQL_URL.replace('http', 'ws'),
  options: {
    reconnect: true,
    reconnectionAttempts: 10,
    connectionCallback: reconnectSocket,
    connectionParams: {
      headers: {},
    },
  },
};

wsLink = new GraphQLWsLink(createClient(socketParams));

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  getHttpLink()
);

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions,
});

export function getToken() {
  return localStorage.getItem('token');
}
