"use client";

import { useMutation } from "@tanstack/react-query";

import type { RouterOutputs } from "@sassy/api";

import { useTrpcReactQueryClient } from "~/hooks/use-trpc-react-query";

// Define the type for the response from getAllPublicEntries
type EntryDataResponse = RouterOutputs["founderlog"]["getAllPublicEntries"];
// Define the type for a single entry
type EntryType = EntryDataResponse[number];

export const useOptimisticUpvote = () => {
  const { trpc, queryClient } = useTrpcReactQueryClient();

  // Define the query filter for getAllPublicEntries
  // This assumes your trpc instance and procedure paths are stable
  const allPublicEntriesFilter =
    trpc.founderlog.getAllPublicEntries.queryOptions();

  console.log("this is the key produced by the hook");
  console.log(allPublicEntriesFilter.queryKey);

  const { mutate, isPending } = useMutation(
    // Pass the mutation options directly
    trpc.founderlog.upvoteEntry.mutationOptions({
      onMutate: async (variables: { entryId: string }) => {
        // Cancel out any queries that are fetching the same data
        await queryClient.cancelQueries({
          queryKey: allPublicEntriesFilter.queryKey,
        });

        // Try to get data from cache first
        const previousData = queryClient.getQueryData<EntryDataResponse>(
          allPublicEntriesFilter.queryKey,
        );

        console.log("Previous data from cache:", previousData);

        // Simple approach: if we have data in the cache, update it optimistically
        if (previousData && previousData.length > 0) {
          // Update the cache optimistically
          queryClient.setQueryData<EntryDataResponse>(
            allPublicEntriesFilter.queryKey,
            previousData.map((e: EntryType) =>
              e.id === variables.entryId
                ? { ...e, upvoteCount: e.upvoteCount + 1 }
                : e,
            ),
          );

          console.log("Optimistic upvote applied successfully");
        } else {
          // Log that we couldn't do an optimistic update, but the mutation will still proceed
          console.log(
            "No data in cache, skipping optimistic update but continuing with mutation",
          );
        }

        return { previousData };
      },
      onError: (error, variables, context) => {
        console.error("Failed to upvote entry (optimistic):", error);
        // Only rollback if we had data to begin with
        if (context?.previousData) {
          queryClient.setQueryData<EntryDataResponse>(
            allPublicEntriesFilter.queryKey,
            context.previousData,
          );
        }
      },
      onSuccess: async () => {
        console.log("Upvoted successfully on server (from custom hook)!");
        // Invalidate the query to refetch the data
        await queryClient.invalidateQueries(allPublicEntriesFilter);
      },
    }),
  );

  return { mutate, isPending };
};
