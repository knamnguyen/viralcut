"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "~/trpc/react";

export function EntryInput() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createEntry = useMutation(
    trpc.founderlog.createEntry.mutationOptions({
      onSuccess: () => {
        setContent("");
        toast.success("Entry added successfully!");
        // Invalidate queries to refresh the timeline
        void queryClient.invalidateQueries(
          trpc.founderlog.getDashboardData.pathFilter(),
        );
      },
      onError: (err) => {
        toast.error(`Failed to add entry: ${err.message}`);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    }),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Entry content cannot be empty");
      return;
    }

    setIsSubmitting(true);
    createEntry.mutate({ content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col">
        <label htmlFor="entry-content" className="text-sm font-medium">
          What did you accomplish today?
        </label>
        <textarea
          id="entry-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter what you've accomplished or worked on today..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500">
          Separate multiple entries with new lines. Tags will be auto-generated
          based on keywords.
        </p>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Entry"}
        </button>
      </div>
    </form>
  );
}
