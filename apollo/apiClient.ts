import {
    ApolloClient,
    InMemoryCache,
    split,
    HttpLink,
    from,
  } from "@apollo/client";
  import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
  import { createClient } from "graphql-ws";
  import { getMainDefinition } from "@apollo/client/utilities";
  import { onError } from "@apollo/client/link/error";
//   import { logout } from "@/stores";
  import { getCookie } from "typescript-cookie";
  import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
  
  // Ensure WebSocketLink runs only on the client-side
  const isBrowser = typeof window !== "undefined";
  
  // Create an error handling link
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions?.code === "AUTH_NOT_AUTHENTICATED") {
          console.error("❌ GraphQL Unauthorized:", err.message);
        //   logout();
        }
      }
    }
  
    if (networkError) {
      console.error("❌ Network Error:", networkError);
      if ((networkError as any).statusCode === 401) {
        // logout();
      }
    }
  });
  
  // ✅ Use `createUploadLink` instead of `HttpLink`
  const httpLink = createUploadLink({
    uri: `http${process.env.NEXT_PUBLIC_API_GQL_URL}graphql`, // ✅ HTTP API URL
    headers: isBrowser
      ? {
        Authorization: `Bearer ${getCookie("authToken") || ""}`,
      }
      : {},
  });
  
  let wsLink;
  if (isBrowser) {
    wsLink = new GraphQLWsLink(
      createClient({
        url: `ws${process.env.NEXT_PUBLIC_API_GQL_URL}graphql`, // ✅ WebSocket URL
        //   connectionParams: {
        //     Authorization: `Bearer your-auth-token`, // ✅ Use auth token if required
        //   },
        on: {
          connected: () => console.log("✅ WebSocket Connected"),
          error: (err) => console.error("❌ WebSocket Error:", err),
          closed: () => console.log("❌ WebSocket Disconnected"),
        },
      })
    );
  }
  
  // Split HTTP and WebSocket connections
  const splitLink = isBrowser
    ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      from([errorLink, httpLink])
    )
    : from([errorLink, httpLink]);
  
  const apiClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // serviceRequestQuery: {
            //   merge(existing = {}, incoming) {
            //     return { ...existing, ...incoming };
            //   },
            // },
            // Dynamically apply merge policy to all queries
            ...generateMergePolicies([
              "documentRequestMasterQuery",
            ]),
            // This applies a default merge policy for all queries dynamically
            // It merges incoming data with existing cached data instead of replacing it
            // Useful when pagination or dynamic query caching is needed
            // _: {
            //   merge(existing = {}, incoming) {
            //     return { ...existing, ...incoming };
            //   },
            // },
          },
        },
      },
    }),
  });
  
  function generateMergePolicies(queryNames) {
    return queryNames.reduce((acc, queryName) => {
      acc[queryName] = {
        merge(existing = {}, incoming) {
          return { ...existing, ...incoming };
        },
      };
      return acc;
    }, {});
  }
  
  export default apiClient;
  