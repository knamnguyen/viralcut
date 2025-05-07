"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useSubscription } from "~/hooks/use-subscription";

/**
 * Page shown after successful checkout
 */
export default function SubscriptionSuccessPage() {
  const { hasAccess, accessType, isLoading } = useSubscription();

  // Force a refetch of subscription status on page load
  useEffect(() => {
    // This would typically use a query client invalidation
    // For example: queryClient.invalidateQueries(['subscription'])
    window.location.reload();
  }, []);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg bg-green-100 p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-800">
          Payment Successful!
        </h1>

        {isLoading ? (
          <p className="mb-8 text-gray-600">
            Verifying your subscription status...
          </p>
        ) : hasAccess ? (
          <p className="mb-8 text-green-700">
            {`Your ${accessType} access is now active!`}
          </p>
        ) : (
          <p className="mb-8 text-yellow-600">
            Payment received. Your access should be activated soon. It may take
            a few moments to update.
          </p>
        )}

        <Link
          href="/subscription"
          className="inline-block rounded-lg bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700"
        >
          Return to Subscription Page
        </Link>
      </div>
    </div>
  );
}
