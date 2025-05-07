"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";

interface ManageSubscriptionButtonProps {
  buttonText?: string;
  className?: string;
}

/**
 * Button that redirects user to Stripe customer portal
 * Only shows for users with active subscriptions (not lifetime users)
 * Uses tRPC to create a customer portal session
 */
export function ManageSubscriptionButton({
  buttonText = "Manage subscription",
  className = "py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300",
}: ManageSubscriptionButtonProps) {
  const trpc = useTRPC();

  // react-query mutation for creating customer portal session
  const { mutateAsync: createCustomerPortal, isPending } = useMutation(
    trpc.stripe.createCustomerPortal.mutationOptions({}),
  );

  const handleClick = async () => {
    try {
      // Call tRPC to create customer portal session
      const { url } = await createCustomerPortal({});

      // Redirect to Stripe customer portal
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No portal URL received");
      }
    } catch (error) {
      console.error("Customer portal error:", error);
    }
  };

  return (
    <button onClick={handleClick} disabled={isPending} className={className}>
      {isPending ? "Redirecting to portal..." : buttonText}
    </button>
  );
}
