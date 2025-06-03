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
    trpc.stripe.checkAccess.queryOptions(),
  );

  return {
    hasAccess: data?.hasAccess ?? false,
    accessType: data?.accessType ?? "FREE",
    isLoading,
    error,
  };
}
