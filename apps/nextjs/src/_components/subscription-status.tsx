"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useSubscription } from "~/hooks/use-subscription";

/**
 * Displays the user's subscription status
 * Also shows temporary status messages for successful or canceled payments
 */
export function SubscriptionStatus() {
  const { hasAccess, isLifetime, isLoading } = useSubscription();
  const searchParams = useSearchParams();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle payment status messages
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setStatusMessage(
        "Payment successful! Your access should be active soon.",
      );
    } else if (payment === "canceled") {
      setStatusMessage("Payment canceled. You have not been charged.");
    }

    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      setStatusMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500">
        Loading subscription status...
      </div>
    );
  }

  return (
    <div className="my-4 text-center">
      {statusMessage && (
        <div className="mb-2 rounded-md bg-blue-50 px-4 py-2 text-blue-700">
          {statusMessage}
        </div>
      )}

      {hasAccess ? (
        <div className="rounded-md bg-green-50 px-4 py-2 text-green-700">
          {isLifetime
            ? "You have lifetime access!"
            : "You have an active subscription!"}
        </div>
      ) : (
        <div className="rounded-md bg-yellow-50 px-4 py-2 text-yellow-700">
          <span>No active subscription. </span>
          <a href="/subscription" className="underline hover:text-yellow-800">
            Subscribe now
          </a>
        </div>
      )}
    </div>
  );
}
