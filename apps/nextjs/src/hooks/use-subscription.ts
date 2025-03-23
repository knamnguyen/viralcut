// apps/nextjs/src/hooks/use-subscription.ts
"use client";

import { useTRPC } from "~/trpc/react";

/**
 * React hook to check if user has access
 * Uses tRPC with React Query for caching
 */
export function useSubscription() {
  // Query with caching
  const { data, isLoading, error } = useTRPC().stripe.checkAccess.useQuery(
    undefined,
    {
      // Cache for 5 minutes, stale after 1 minute
      // This reduces Stripe trpc calls while keeping data relatively fresh
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  );

  return {
    hasAccess: data?.hasAccess ?? false,
    isLifetime: data?.isLifetime ?? false,
    isLoading,
    error,
  };
}
