"use client";

import { useUser } from "@clerk/nextjs";

import { ManageSubscriptionButton } from "~/_components/manage-subscription-button";
import { SubscribeButton } from "~/_components/subscribe-button";
import { useSubscription } from "~/hooks/use-subscription";

/**
 * Example subscription page showing how to use the Stripe integration
 */
export default function SubscriptionPage() {
  const { isSignedIn } = useUser();
  const { hasAccess, accessType, isLoading } = useSubscription();

  // Whether to show the manage subscription button (only for subscription users, not lifetime)
  const showManageSubscription =
    hasAccess && (accessType === "monthly" || accessType === "yearly");

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Subscription Plans</h1>

      {isLoading ? (
        <div className="rounded-lg bg-gray-100 p-8 text-center">
          Loading subscription status...
        </div>
      ) : hasAccess ? (
        <div className="rounded-lg bg-green-100 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            {`Your ${accessType} access is now active!`}
          </h2>
          <p className="mb-4 text-green-700">
            Thank you for supporting our product. You have full access to all
            features.
          </p>
          {showManageSubscription && (
            <div className="mt-4">
              <ManageSubscriptionButton className="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700" />
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {/* Monthly subscription */}
          <div className="rounded-lg bg-black p-8 text-gray-100">
            <h2 className="mb-4 text-2xl font-bold">Monthly Plan</h2>
            <p className="mb-4 text-4xl font-bold">$9.99/month</p>
            <ul className="mb-8 space-y-2">
              <li>✓ Full access to all features</li>
              <li>✓ Premium support</li>
              <li>✓ Regular updates</li>
            </ul>
            {isSignedIn ? (
              <SubscribeButton
                priceId="price_1R3eUoRQf2ptbFsnXfCxNoDq" // Replace with your price ID
                mode="subscription"
                buttonText="Subscribe Monthly"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
              />
            ) : (
              <p className="text-center text-sm text-gray-500">
                Please sign in to subscribe
              </p>
            )}
          </div>

          {/* Yearly Plan - Modified from Lifetime access */}
          <div className="rounded-lg bg-black p-8 text-gray-100">
            <h2 className="mb-4 text-2xl font-bold">Yearly Plan</h2>
            <p className="mb-4 text-4xl font-bold">$99.99/year</p>
            <ul className="mb-8 space-y-2">
              <li>✓ Full access to all features</li>
              <li>✓ Premium support</li>
              <li>✓ Regular updates</li>
              <li>✓ Save vs Monthly</li>
            </ul>
            {isSignedIn ? (
              <SubscribeButton
                priceId="price_1R3eUJRQf2ptbFsnHuI2Kd3L" // Replace with your price ID
                mode="subscription"
                buttonText="Subscribe Yearly"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
              />
            ) : (
              <p className="text-center text-sm text-gray-500">
                Please sign in to subscribe
              </p>
            )}
          </div>

          {/* Lifetime Access - Modified from Lifetime Plus */}
          <div className="rounded-lg bg-black p-8 text-gray-100">
            <h2 className="mb-4 text-2xl font-bold">Lifetime Access</h2>
            <p className="mb-4 text-4xl font-bold">$99.99</p>
            <ul className="mb-8 space-y-2">
              <li>✓ One-time payment</li>
              <li>✓ All features forever</li>
              <li>✓ Premium support</li>
              <li>✓ All future updates</li>
            </ul>
            {isSignedIn ? (
              <SubscribeButton
                priceId="price_1R3eTqRQf2ptbFsnqzXdqDqe" // Replace with your price ID
                mode="payment"
                buttonText="Buy Lifetime Access"
                className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700"
              />
            ) : (
              <p className="text-center text-sm text-gray-500">
                Please sign in to purchase
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-16 rounded-lg bg-gray-100 p-8">
        <h2 className="mb-4 text-2xl font-bold">Next Steps</h2>
        <p className="mb-4">
          To make this work with real payments, you need to:
        </p>
        <ol className="list-inside list-decimal space-y-2">
          <li>Create products and prices in your Stripe dashboard</li>
          <li>Update the price IDs in the buttons above</li>
          <li>
            Set up a webhook endpoint in Stripe that points to{" "}
            <code className="rounded bg-gray-200 px-2 py-1">
              /api/webhooks/stripe
            </code>
          </li>
          <li>
            Update your environment variables with Stripe API keys and webhook
            secret
          </li>
        </ol>
      </div>
    </div>
  );
}
