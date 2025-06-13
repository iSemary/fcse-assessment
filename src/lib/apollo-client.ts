import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://cms.trial-task.k8s.ext.fcse.io/graphql',
});

const authLink = setContext((operation, { headers }) => {
  if (operation.operationName === 'Login') {
    console.log('Login mutation - skipping auth header');
    return {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    };
  }

  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken');
  }

  console.log(
    `Operation: ${operation.operationName}, Token: ${
      token ? 'Present' : 'None'
    }`
  );

  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  console.log(`Error in operation: ${operation.operationName}`);

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]:`, networkError);

    if ('result' in networkError) {
      console.error('Network error result:', networkError.result);
    }
    if ('statusCode' in networkError) {
      console.error('Status code:', networkError.statusCode);
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
