import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs));

export { cn };

// Export for SubscriptionPlanModal
export * from "./components/subscription-plan-modal";
