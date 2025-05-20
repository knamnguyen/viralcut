"use client";

import type { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
//change the name to distinguish from the createTRPCContext in the api package
//which provides the context for the server-side tRPC calls
//this is the client-side tRPC context for the tanstack-react-query provider
// tRPC TanStack Query: Renamed import for client-side tRPC context.
import { createTRPCContext as createTRPCContextTanstack } from "@trpc/tanstack-react-query";
// SuperJSON: For advanced data serialization/deserialization.
import SuperJSON from "superjson";

//By using import type you ensure that the reference will be stripped at compile-time, meaning you don't inadvertently import server-side code into your client
//this is the type of the tRPC router you defined in the api package
//which will give you the types for the queries and mutations when using from the client
import type { AppRouter } from "@sassy/api";

import { env } from "~/env";
import { createQueryClient } from "./query-client";

// Singleton QueryClient for browser environment.
let browserQueryClient: QueryClient | undefined = undefined;

// Provides QueryClient: new on server (per request, avoids data sharing singleton in browser.
// Ensures correct behavior for SSR hydration and client-side persistence.
// Used by TRPCReactProvider for client-side setup.
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always new QueryClient per request.
    return createQueryClient();
  } else {
    // Browser: singleton QueryClient.
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }
};

// tRPC Link: Shared logger, active in dev or on error.
const sharedLoggerLink = loggerLink({
  enabled: (op) =>
    env.NODE_ENV === "development" || // Log in development.
    (op.direction === "down" && op.result instanceof Error), // Log if response is an error.
});

// Utility: Determines API base URL for client, Vercel, or local.
const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin; // Client-side.
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`; // Vercel deployment.
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3000}`; // Local development.
};

// tRPC Link: Creates HTTP batch stream link; header varies by environment.
const getNonSharedUnstableHttpBatchStreamLink = () => {
  // Config for the HTTP batch stream link.
  const linkConfig = {
    transformer: SuperJSON, // Data serialization/deserialization.
    url: getBaseUrl() + "/api/trpc", // API endpoint.
    headers() {
      const headers = new Headers();
      // 'x-trpc-source': 'nextjs-react' (server-side context), 'nextjs-ssr' (client-side context).
      headers.set(
        "x-trpc-source",
        typeof window === "undefined" ? "nextjs-react" : "nextjs-ssr",
      );
      return headers;
    },
  };
  return unstable_httpBatchStreamLink(linkConfig);
};

// Singleton tRPC client instance for the browser.
let _trpcClient: ReturnType<typeof createTRPCClient<AppRouter>> | undefined;
// Provides tRPC Client: new on server (per request), singleton in browser.
const getTrpcClient = () => {
  if (typeof window === "undefined") {
    // Server: always new tRPC client per request.
    return createTRPCClient<AppRouter>({
      links: [sharedLoggerLink, getNonSharedUnstableHttpBatchStreamLink()], // Client links.
    });
  } else {
    // Browser: singleton tRPC client if it doesn't exist
    if (!_trpcClient) {
      _trpcClient = createTRPCClient<AppRouter>({
        links: [sharedLoggerLink, getNonSharedUnstableHttpBatchStreamLink()],
      });
    }
    return _trpcClient;
  }
};

export const { useTRPC, TRPCProvider } = createTRPCContextTanstack<AppRouter>();
// React Provider: Sets up tRPC and React Query for the application.
export function TRPCReactProvider(props: { children: React.ReactNode }) {
  // Get QueryClient (singleton in browser, new on server).
  const queryClient = getQueryClient();

  // Get tRPC client (singleton in browser, new on server), memoized with useState.
  const [trpcClient] = useState(getTrpcClient);

  return (
    // TanStack Query: Makes QueryClient available.
    <QueryClientProvider client={queryClient}>
      {/* tRPC: Makes tRPC client and QueryClient available via tRPC context. */}
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
