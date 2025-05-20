import { useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react"; // Adjust the import path for useTRPC and its type

// Your custom hook
export function useTrpcReactQueryClient() {
  // Get the tRPC context instance
  // The useTRPC hook provides access to the tRPC client and other context-specific utilities [[6]](https://poe.com/citation?message_id=390149805375&citation=6).
  const trpc = useTRPC();

  // Get the React Query QueryClient instance
  // This is the standard way to access the QueryClient provided by QueryClientProvider [[3]](https://poe.com/citation?message_id=390149805375&citation=3).
  const queryClient = useQueryClient();

  return { trpc, queryClient };
}
