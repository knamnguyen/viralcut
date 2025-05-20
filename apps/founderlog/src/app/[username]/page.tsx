"use client";

import type { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { AppRouter } from "@sassy/api";
import { Badge } from "@sassy/ui/badge";
import { Button } from "@sassy/ui/button";
import { Card, CardContent } from "@sassy/ui/card";
import { Toaster } from "@sassy/ui/toast";

import { useTRPC } from "~/trpc/react";

// Define manual types to avoid inference errors until api is properly connected
interface TagWithName {
  name: string;
}

interface EntryTag {
  tagId: string;
  tag: TagWithName;
}

interface PublicEntry {
  id: string;
  content: string;
  upvoteCount: number;
  tags: EntryTag[];
  createdAt: string | Date;
}

const PublicEntryCard = ({ entry }: { entry: PublicEntry }) => {
  const trpc = useTRPC();

  // Use tanstack's useMutation hook with trpc mutation options
  const { mutate: upvoteEntry, isPending } = useMutation(
    trpc.founderlog.upvoteEntry.mutationOptions({
      onSuccess: () => {
        // Handle success (no toast for now since we removed the import)
        console.log("Upvoted successfully!");
      },
      onError: (error: TRPCClientErrorLike<AppRouter>) => {
        // Handle error
        console.error("Failed to upvote entry:", error);
      },
    }),
  );

  const handleUpvote = () => {
    upvoteEntry({ entryId: entry.id });
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <p className="mb-2 whitespace-pre-wrap">{entry.content}</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {entry.tags.map((tagRelation: EntryTag) => (
            <Badge key={tagRelation.tagId} variant="secondary">
              {tagRelation.tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(entry.createdAt).toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {entry.upvoteCount} upvotes
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleUpvote}
              disabled={isPending}
            >
              👍 Upvote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PublicTimelinePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const trpc = useTRPC();

  // Using tanstack's useQuery with trpc options
  const { data, isLoading, error } = useQuery({
    ...trpc.founderlog.getPublicTimeline.queryOptions({ username }),
  });

  if (isLoading)
    return <div className="p-8 text-center">Loading timeline...</div>;

  if (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">User not found</h1>
        <p className="mb-4">
          Could not find a timeline for username "{username}"
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{username}'s FounderLog</h1>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Back to dashboard
          </Link>
        </div>
        <p className="mt-2 text-muted-foreground">
          Public timeline of progress and achievements
        </p>
      </header>

      <div className="space-y-4">
        {data?.entries && data.entries.length > 0 ? (
          data.entries.map((entry: PublicEntry) => (
            <PublicEntryCard key={entry.id} entry={entry} />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No entries found for this user.
          </p>
        )}
      </div>

      <Toaster />
    </div>
  );
}
