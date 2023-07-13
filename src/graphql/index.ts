import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const backend_uri = process.env.REACT_APP_JUZAM2_URI;
const mock_uri = process.env.REACT_APP_MOCK_GRAPHQL_URL;
const client = new ApolloClient({
  credentials: 'include',
  uri: `${backend_uri}/graphql-api`,
  cache: new InMemoryCache(),
});

export const fakeDeletedItemsVar = makeVar<string[]>([]);
export const userDataVar = makeVar<any>('');
export const userEffectiveRoleVar = makeVar<string | null>('guest');

export default client;

export const mockupClient = new ApolloClient({
  uri: mock_uri,
  cache: new InMemoryCache(),
});
