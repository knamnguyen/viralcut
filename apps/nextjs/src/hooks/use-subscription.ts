// apps/nextjs/src/hooks/use-subscription.ts
"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";

/**
 * React hook to check if user has access
 * Uses tRPC with React Query for caching
 */
export function useSubscription() {
  const trpc = useTRPC();

  // Query with caching using standard useQuery + queryOptions
  const { data, isLoading, error } = useQuery(
    trpc.stripe.checkAccess.queryOptions(undefined, {
      // Cache for 5 minutes, stale after 1 minute
      // This reduces Stripe trpc calls while keeping data relatively fresh
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    }),
  );

  return {
    hasAccess: data?.hasAccess ?? false,
    isLifetime: data?.isLifetime ?? false,
    isLoading,
    error,
  };
}
