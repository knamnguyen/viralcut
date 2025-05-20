"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { useTRPC } from "~/trpc/react";
import { EntryCard } from "../app/_components/entry-card";

export function Timeline() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.founderlog.getDashboardData.queryOptions(),
  );

  if (data.entries.length === 0) {
    return (
      <div className="mt-6 text-center">
        <p className="text-gray-500">
          No entries yet. Add your first entry above!
        </p>
      </div>
    );
  }

  // Group entries by date
  const entriesByDate = data.entries.reduce<
    Record<string, typeof data.entries>
  >((acc, entry) => {
    const date = format(new Date(entry.createdAt), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div className="mt-6 space-y-8">
      {Object.entries(entriesByDate).map(([date, entries]) => (
        <div key={date} className="space-y-4">
          <h3 className="font-medium">
            {format(new Date(date), "EEEE, MMMM d, yyyy")}
          </h3>
          <div className="space-y-4">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
