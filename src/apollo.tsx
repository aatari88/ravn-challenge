import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiYzVmMDk5NjQtODU1Mi00NWM3LWJmYTktMjEyOTI0YzQxZmQ2IiwicHJvamVjdElkIjoiYjU4ODVkZGMtMjdkMy00YjZiLWI1ZjEtMTI1ZGRhOGJjNTQxIiwiZnVsbE5hbWUiOiJBQVJPTiBBUlRVUk8gVEFQSUEgUklPUyIsImVtYWlsIjoiYXRhcGlhcjg4QGdtYWlsLmNvbSIsImlhdCI6MTcxMjM0MTM2NH0.tdBZP98V9ktr5u54hiGUr5ipZFvgDFnJAJs9dEhDYMc';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
