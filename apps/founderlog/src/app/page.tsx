"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@sassy/ui/button";
import { Card } from "@sassy/ui/card";
import { Toaster } from "@sassy/ui/toast";

import { EntryCardList } from "./_components/entry";

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("public");

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
            variant={activeTab === "public" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("public")}
            className="rounded-sm"
          >
            Public Wall
          </Button>
          <Button
            variant={activeTab === "personal" ? "secondary" : "ghost"}
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
          {activeTab === "public" && <EntryCardList />}

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
