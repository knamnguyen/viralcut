"use client";

import Link from "next/link";

/**
 * Page shown when checkout is canceled
 */
export default function SubscriptionCanceledPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg bg-gray-100 p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Checkout Canceled
        </h1>
        <p className="mb-8 text-gray-600">
          Your payment was not processed. You have not been charged.
        </p>
        <Link
          href="/subscription"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
        >
          Return to Subscription Page
        </Link>
      </div>
    </div>
  );
}
