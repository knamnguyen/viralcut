// apps/nextjs/src/_components/subscribe-button.tsx
"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react"; // Correct TRPC import

interface SubscribeButtonProps {
  priceId: string; // Stripe price ID
  mode?: "subscription" | "payment"; // Subscription or one-time
  buttonText?: string; // Custom button text
  className?: string; // CSS class for styling
}

/**
 * Button that redirects user to Stripe checkout
 * Uses tRPC to create a checkout session
 */
export function SubscribeButton({
  priceId,
  mode = "subscription",
  buttonText = mode === "subscription" ? "Subscribe" : "Buy Now",
  className = "py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300",
}: SubscribeButtonProps) {
  // const [isLoading, setIsLoading] = useState(false);
  const trpc = useTRPC();

  // react-query mutation for creating checkout
  const { mutateAsync: createCheckout, isPending } = useMutation(
    trpc.stripe.createCheckout.mutationOptions({}),
  );

  const handleClick = async () => {
    // setIsLoading(true);

    try {
      // Call tRPC to create checkout session
      const { url } = await createCheckout({
        priceId,
        mode,
      });

      // Redirect to Stripe checkout page
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={isPending} className={className}>
      {isPending ? "Redirecting to checkout..." : buttonText}
    </button>
  );
}
