// Import necessary functions from React Query.
// defaultShouldDehydrateQuery: Default logic for deciding if a query should be dehydrated.
// QueryClient: The main client for managing queries and cache.
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
// SuperJSON for serializing/deserializing complex data types (like Dates, Maps, etc.)
// ensuring data integrity between server and client.
import SuperJSON from "superjson";

// Add a unique ID to help verify we're using the same QueryClient instance
let queryClientInstanceCount = 0;

// Function to create a new instance of QueryClient with custom default options.
// It's important to create a new client for each request in SSR to avoid sharing data between users
export const createQueryClient = () => {
  queryClientInstanceCount++;
  console.log(`Creating QueryClient instance #${queryClientInstanceCount}`);

  return new QueryClient({
    defaultOptions: {
      queries: {
        // Default staleTime for queries.
        // With Server-Side Rendering (SSR), setting a staleTime above 0
        // prevents queries from refetching immediately on the client after hydration
        // This means data fetched on the server will be considered fresh for the specified time.
        staleTime: 5 * 60 * 1000, // 5 minutes (increased from 30 seconds)

        // How long the data remains in the cache when there are no active queries.
        // This ensures data is available for optimistic updates even when the component is unmounted.
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
      dehydrate: {
        // Custom serialization for data when dehydrating (server -> client).
        // SuperJSON handles types that JSON.stringify might miss or convert incorrectly.
        serializeData: SuperJSON.serialize,
        // Custom logic to decide if a query's data should be included in dehydration.
        // It includes the default logic AND queries that are still pending (loading) on the server.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        // Custom logic for redacting errors during dehydration.
        shouldRedactErrors: () => {
          // Setting this to false means errors are not redacted by React Query here.
          // This is important for Next.js, as it uses server errors to detect dynamic pages
          // and has its own error redacting mechanisms.
          return false;
        },
      },
      hydrate: {
        // Custom deserialization for data when hydrating (client receives data from server).
        // SuperJSON ensures data is correctly parsed back into its original types.
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
};
