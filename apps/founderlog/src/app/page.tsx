"use client";

import type { TRPCClientErrorLike } from "@trpc/client";
import React from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { AppRouter } from "@sassy/api";
import { Badge } from "@sassy/ui/badge";
import { Button } from "@sassy/ui/button";
import { Card, CardContent } from "@sassy/ui/card";
import { Toaster } from "@sassy/ui/toaster";

import { useTRPC } from "~/trpc/react";

// Define types
interface EntryTag {
  tagId: string;
  tag: {
    name: string;
  };
}

interface PublicEntryType {
  id: string;
  content: string;
  upvoteCount: number;
  tags: EntryTag[];
  createdAt: string | Date;
  userId: string;
  user?: {
    username?: string;
  };
}

const PublicEntryCard = ({ entry }: { entry: PublicEntryType }) => {
  const trpc = useTRPC();

  const { mutate: upvoteEntry, isPending } = useMutation(
    trpc.founderlog.upvoteEntry.mutationOptions({
      onSuccess: () => {
        console.log("Upvoted successfully!");
      },
      onError: (error: TRPCClientErrorLike<AppRouter>) => {
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
        {entry.user?.username && (
          <Link
            href={`/${entry.user.username}`}
            className="mb-2 block text-sm font-medium text-blue-600 hover:underline"
          >
            @{entry.user.username}
          </Link>
        )}
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

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const trpc = useTRPC();
  const [activeTab, setActiveTab] = React.useState("public");

  // Query all public entries for the wall - handle the case where trpc endpoint doesn't exist yet
  let queryOptions;
  try {
    queryOptions = trpc.founderlog.getAllPublicEntries?.queryOptions?.();
  } catch (e) {
    console.error("getAllPublicEntries endpoint not implemented yet:", e);
  }

  const { data, isLoading, error } = useQuery({
    ...queryOptions,
    enabled: !!queryOptions,
  });

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">FounderLog</h1>
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                My Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          Track progress, share achievements, and stay accountable
        </p>
      </header>

      {/* Custom Tabs */}
      <div className="mb-8">
        <div className="grid w-full grid-cols-2 rounded-md bg-muted p-1">
          <Button
            variant={activeTab === "public" ? "default" : "ghost"}
            onClick={() => setActiveTab("public")}
            className="rounded-sm"
          >
            Public Wall
          </Button>
          <Button
            variant={activeTab === "personal" ? "default" : "ghost"}
            onClick={() => {
              if (isSignedIn) {
                setActiveTab("personal");
              } else {
                // Keep the tab on public but show sign in UI
                setActiveTab("public");
                document.getElementById("sign-in-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="rounded-sm"
          >
            Personal Log
          </Button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "public" && (
            <div className="space-y-4">
              {!queryOptions ? (
                <Card className="p-6 text-center">
                  <p className="mb-4">Welcome to FounderLog!</p>
                  <SignInButton mode="modal">
                    <Button>Sign In</Button>
                  </SignInButton>
                </Card>
              ) : isLoading ? (
                <p className="text-center">Loading entries...</p>
              ) : error ? (
                <p className="text-center text-red-500">
                  Error loading entries: {error.message || "Unknown error"}
                </p>
              ) : data?.entries && data.entries.length > 0 ? (
                data.entries.map((entry: PublicEntryType) => (
                  <PublicEntryCard key={entry.id} entry={entry} />
                ))
              ) : (
                <p className="text-center">
                  No entries found. Be the first to share your progress!
                </p>
              )}
            </div>
          )}

          {activeTab === "personal" && (
            <SignedIn>
              <div className="text-center">
                <p className="mb-4">View and manage your personal logs</p>
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </SignedIn>
          )}

          {/* Sign-in section that will be shown when user clicks personal tab while signed out */}
          <SignedOut>
            <div
              id="sign-in-section"
              className={activeTab === "public" ? "mt-8" : "hidden"}
            >
              <Card className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-lg font-medium">
                    Sign in to access your personal log
                  </h2>
                  <p className="text-center text-muted-foreground">
                    Create and manage your progress log with auto-tagging and
                    more
                  </p>
                  <div className="flex gap-4">
                    <SignInButton mode="modal">
                      <Button size="lg">Sign in</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button size="lg" variant="outline">
                        Sign up
                      </Button>
                    </SignUpButton>
                  </div>
                </div>
              </Card>
            </div>
          </SignedOut>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
