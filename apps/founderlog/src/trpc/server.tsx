/**
 * For examples of usage, see: apps/nextjs/src/app/page.tsx
 */

// For typing tRPC query options, used with prefetch.
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";
// React's cache for memoizing results in Server Components.
import { cache } from "react";
// Next.js utility to access request headers in Server Components.
import { headers } from "next/headers";
// React Query tools for SSR data hydration.
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// tRPC utility to create a type-safe proxy for server-side calls/options.
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

// Type definition for your tRPC router.
import type { AppRouter } from "@sassy/api";
// Your actual tRPC router and context creation function from the API package.
import { appRouter, createTRPCContext } from "@sassy/api";

// Local helper to create a React Query client instance.
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

// Cached function to get a single QueryClient instance per request.
const getQueryClient = cache(createQueryClient);

// Server-side tRPC helper for making calls or getting query options in RSCs.
export const trpc = createTRPCOptionsProxy<AppRouter>({
  router: appRouter,
  ctx: createContext,
  queryClient: getQueryClient,
});

// Component to hydrate client-side React Query cache with server-fetched data.
export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

// Utility to prefetch tRPC query data on the server for client hydration.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}
