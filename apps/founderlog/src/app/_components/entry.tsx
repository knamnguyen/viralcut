"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import type { RouterOutputs } from "@sassy/api";
import { Badge } from "@sassy/ui/badge";
import { Button } from "@sassy/ui/button";
import { Card, CardContent } from "@sassy/ui/card";

import { useOptimisticUpvote } from "~/hooks/use-optimistic-upvote";
import { useTrpcReactQueryClient } from "~/hooks/use-trpc-react-query";

export const EntryCardList = () => {
  const { trpc } = useTrpcReactQueryClient();

  const { data, isLoading, error } = useQuery(
    trpc.founderlog.getAllPublicEntries.queryOptions(),
  );

  const entries = data;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p className="text-center">Loading entries...</p>
      ) : error ? (
        <p className="text-center text-red-500">
          Error loading entries: {error.message || "Unknown error"}
        </p>
      ) : entries && entries.length > 0 ? (
        entries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
      ) : (
        <p className="text-center">
          No entries found. Be the first to share your progress!
        </p>
      )}
    </div>
  );
};

// interface EntryCardProps {
//   entry: RouterOutputs["founderlog"]["getAllPublicEntries"][number];
// }

export const EntryCard = (props: {
  entry: RouterOutputs["founderlog"]["getAllPublicEntries"][number];
}) => {
  const { mutate: upvoteEntry, isPending } = useOptimisticUpvote();

  const handleUpvote = () => {
    upvoteEntry({ entryId: props.entry.id });
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {props.entry.user.username && (
          <Link
            href={`/${props.entry.user.username}`}
            className="mb-2 block text-sm font-medium text-blue-600 hover:underline"
          >
            @{props.entry.user.username}
          </Link>
        )}
        <p className="mb-2 whitespace-pre-wrap">{props.entry.content}</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {props.entry.tags.map((tagRelation) => (
            <Badge key={tagRelation.tagId} variant="secondary">
              {tagRelation.tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(props.entry.createdAt).toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {props.entry.upvoteCount} upvotes
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
