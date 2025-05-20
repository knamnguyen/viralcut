"use client";

import type { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import Link from "next/link";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AppRouter } from "@sassy/api";
import { Badge } from "@sassy/ui/badge";
import { Button } from "@sassy/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@sassy/ui/card";
import { Textarea } from "@sassy/ui/textarea";
import { Toaster } from "@sassy/ui/toast";

import { useTRPC } from "~/trpc/react";

// Entry input component for logging progress
const EntryInput = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [content, setContent] = React.useState("");

  const dashboardQueryOptions = trpc.founderlog.getDashboardData.queryOptions();

  const { mutate: createEntry, isPending } = useMutation(
    trpc.founderlog.createEntry.mutationOptions({
      onSuccess: async () => {
        setContent("");
        console.log("Entry created successfully");
        //revalidate so that data shows up
        await queryClient.invalidateQueries({
          queryKey: dashboardQueryOptions.queryKey,
        });
      },
      onError: (error: TRPCClientErrorLike<AppRouter>) => {
        console.error("Failed to create entry:", error);
      },
    }),
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim()) {
      createEntry({ content });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Log Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Textarea
            placeholder="What did you work on?\nEach new line becomes a separate entry..."
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            rows={4}
          />
          <Button
            type="submit"
            disabled={isPending || !content.trim()}
            className="self-end"
          >
            {isPending ? "Logging..." : "Log Entries"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Define types for entries
interface EntryTag {
  tagId: string;
  tag: {
    name: string;
  };
}

interface TimelineEntryType {
  id: string;
  content: string;
  createdAt: string | Date;
  tags: EntryTag[];
}

// Timeline component for displaying entries
const Timeline = ({ entries }: { entries: readonly TimelineEntryType[] }) => {
  if (entries.length === 0) {
    return <p>No entries yet. Start logging your progress!</p>;
  }
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

// Entry card component
const EntryCard = ({ entry }: { entry: TimelineEntryType }) => {
  const [showImagePlaceholder, setShowImagePlaceholder] = React.useState(false);

  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-2 whitespace-pre-wrap">{entry.content}</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {entry.tags.map((tagRelation) => (
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
            {showImagePlaceholder ? (
              <div className="flex items-center text-sm text-blue-500">
                <span>Image upload coming soon</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImagePlaceholder(false)}
                >
                  ✕
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() => setShowImagePlaceholder(true)}
              >
                Add image proof
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const trpc = useTRPC();

  // Use standard query syntax via trpc object
  const { data, isLoading, error } = useQuery({
    ...trpc.founderlog.getDashboardData.queryOptions(),
    enabled: !!isSignedIn,
  });

  if (!isLoaded || (isLoading && isSignedIn))
    return <div>Loading dashboard...</div>;
  if (!isSignedIn) return <div>Please sign in to view your dashboard.</div>;
  if (error)
    return (
      <div>
        Error loading data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My FounderLog Dashboard</h1>
          {user?.username && (
            <p className="text-sm text-muted-foreground">
              Public profile:{" "}
              <Link
                href={`/${user.username}`}
                className="text-blue-600 hover:underline"
              >
                /{user.username}
              </Link>
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Public Wall
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <EntryInput />

      <h2 className="mb-4 text-xl font-semibold">Your Timeline</h2>
      {data?.entries.length ? (
        <Timeline entries={data.entries} />
      ) : (
        <p>No entries found.</p>
      )}

      <Toaster />
    </div>
  );
}
