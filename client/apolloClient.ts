import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  });

  const link = ApolloLink.from([
    errorLink,
    (httpLink as unknown) as ApolloLink,
  ]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: link as any,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState != null) {
    // Restore the cache with the merged data
    _apolloClient.cache.restore(initialState!);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
