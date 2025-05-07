"use client";

// Temporarily make root page client for hooks, can optimize later
import type { TRPCClientErrorLike } from "@trpc/client"; // Correct import for error type
import React from "react";
import { useAuth, UserButton } from "@clerk/nextjs";

import type { AppRouter } from "@sassy/api";
import { Badge } from "@sassy/ui/badge";
import { Button } from "@sassy/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@sassy/ui/card";
import { useToast } from "@sassy/ui/hooks/use-toast";
import { Textarea } from "@sassy/ui/textarea";
import { Toaster } from "@sassy/ui/toaster";

import { api } from "~/trpc/react";

// Placeholder Components (Implement fully in Step 18)
const ReflectionInput = ({ type }: { type: "morning" | "evening" }) => {
  const utils = api.useUtils();
  const { toast } = useToast();
  const [content, setContent] = React.useState("");

  // Use standard hook syntax via api object
  const addReflection = api.founderlog.addReflection.useMutation({
    onSuccess: () => {
      void utils.founderlog.getDashboardData.invalidate();
      setContent("");
      toast({
        title: "Reflection Saved",
        description: `Your ${type} reflection has been saved.`,
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast({
        title: "Error Saving Reflection",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
      console.error("Failed to add reflection:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim()) {
      addReflection.mutate({ type, content });
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {type === "morning" ? "Morning Intentions" : "Evening Achievements"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Textarea
            placeholder={`What are your ${type === "morning" ? "goals for today?" : "accomplishments?"}`}
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            rows={3}
          />
          <Button
            type="submit"
            disabled={addReflection.isPending || !content.trim()}
            className="self-end"
          >
            {addReflection.isPending ? "Saving..." : "Save Reflection"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const EntryInput = () => {
  const utils = api.useUtils();
  const { toast } = useToast();
  const [content, setContent] = React.useState("");

  const createEntry = api.founderlog.createEntry.useMutation({
    onSuccess: () => {
      void utils.founderlog.getDashboardData.invalidate();
      setContent("");
      toast({
        title: "Entries Logged",
        description: "Your progress has been logged successfully.",
      });
    },
    onError: (error: TRPCClientErrorLike<AppRouter>) => {
      toast({
        title: "Error Logging Entries",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
      console.error("Failed to create entry:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim()) {
      createEntry.mutate({ content });
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
            disabled={createEntry.isPending || !content.trim()}
            className="self-end"
          >
            {createEntry.isPending ? "Logging..." : "Log Entries"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Infer types from API response using standard api object
type TimelineEntry = ReturnType<
  typeof api.founderlog.getDashboardData.useQuery
>["data"]["entries"][number];

const Timeline = ({ entries }: { entries: readonly TimelineEntry[] }) => {
  if (!entries || entries.length === 0) {
    return <p>No entries yet. Start logging your progress!</p>;
  }
  return (
    <div className="space-y-4">
      {entries.map((entry: TimelineEntry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const EntryCard = ({ entry }: { entry: TimelineEntry }) => {
  // Infer Tag Relation Type more safely
  type TagRelation = TimelineEntry["tags"][number];

  return (
    <Card>
      <CardContent className="p-4">
        <p className="mb-2 whitespace-pre-wrap">{entry.content}</p>
        <div className="mb-2 flex flex-wrap gap-1">
          {entry.tags?.map((tagRelation: TagRelation) => (
            <Badge key={tagRelation.tagId} variant="secondary">
              {tagRelation.tag.name}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{new Date(entry.createdAt).toLocaleString()}</span>
          {entry.imagePlaceholder && (
            <div className="text-xs text-blue-500">(Image Placeholder)</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();

  // Use standard query syntax via api object
  const { data, isLoading, error } = api.founderlog.getDashboardData.useQuery(
    undefined,
    {
      enabled: !!isSignedIn,
    },
  );

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
        <h1 className="text-2xl font-bold">FounderLog Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <ReflectionInput type="morning" />
        <ReflectionInput type="evening" />
      </div>

      <EntryInput />

      <h2 className="mb-4 text-xl font-semibold">Your Timeline</h2>
      {data?.entries?.length ? (
        <Timeline entries={data.entries} />
      ) : (
        <p>No entries found.</p>
      )}

      <Toaster />
    </div>
  );
}
