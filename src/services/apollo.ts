import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// Create HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT || "/graphql", // Use proxy endpoint
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Include cookies for CORS
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export default apolloClient;
