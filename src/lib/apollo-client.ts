import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeClient(): any {
  return new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || '/api/graphql',
  });
}
