"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useTRPC } from "~/trpc/react";

type ReflectionType = "morning" | "evening";

interface ReflectionInputProps {
  type: ReflectionType;
}

export function ReflectionInput({ type }: ReflectionInputProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const addReflection = useMutation(
    trpc.founderlog.addReflection.mutationOptions({
      onSuccess: () => {
        setContent("");
        toast.success(
          `${type === "morning" ? "Morning" : "Evening"} reflection added!`,
        );
        void queryClient.invalidateQueries(
          trpc.founderlog.getDashboardData.pathFilter(),
        );
      },
      onError: (err) => {
        toast.error(`Failed to add reflection: ${err.message}`);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    }),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Reflection content cannot be empty");
      return;
    }

    setIsSubmitting(true);
    addReflection.mutate({ type, content });
  };

  const title =
    type === "morning" ? "Morning Reflection" : "Evening Reflection";

  const placeholder =
    type === "morning"
      ? "What are your goals for today?"
      : "What did you accomplish today? What could you improve tomorrow?";

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col">
        <label htmlFor={`${type}-reflection`} className="text-sm font-medium">
          {title}
        </label>
        <textarea
          id={`${type}-reflection`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Reflection"}
        </button>
      </div>
    </form>
  );
}
