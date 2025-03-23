# Stripe Integration for T3 Turbo

This package provides a Stripe integration for your T3 Turbo application, enabling subscription and one-time payment functionality with minimal database requirements.

## Features

- **Simple Subscription Management**: Easily set up recurring subscriptions or one-time payments
- **Lifetime Access Option**: Support for permanent access with one-time payments
- **Clerk Integration**: Works seamlessly with Clerk authentication
- **Single Source of Truth**: Uses Stripe as the source of truth for subscription status
- **Webhook Support**: Process Stripe events to keep data in sync

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env` file:

```
# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 2. Create Products in Stripe Dashboard

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Products → Create Product
3. Create at least two products:
   - A subscription product (e.g., "Monthly Subscription")
   - A one-time payment product (e.g., "Lifetime Access")
4. Note the Price IDs for each product (starts with `price_`)

### 3. Set Up Webhook Endpoint

1. In your Stripe Dashboard, go to Developers → Webhooks
2. Add an endpoint that points to your application webhook URL:
   - `https://your-domain.com/api/webhooks/stripe`
3. Subscribe to the following events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `charge.succeeded` (for lifetime access)
4. Get your webhook signing secret and add it to your environment variables

### 4. Update Price IDs in Components

In your subscription page components, update the price IDs to match your Stripe products:

```tsx
<SubscribeButton
  priceId="price_your_subscription_id"
  mode="subscription"
  buttonText="Subscribe Monthly"
/>

<SubscribeButton
  priceId="price_your_lifetime_id"
  mode="payment"
  buttonText="Buy Lifetime Access"
/>
```

## Usage

### Check Subscription Status

Use the `useSubscription` hook in your components:

```tsx
const { hasAccess, isLifetime, isLoading } = useSubscription();

if (hasAccess) {
  // User has access (either subscription or lifetime)
  if (isLifetime) {
    // User has lifetime access
  } else {
    // User has a subscription
  }
}
```

### Create Checkout Session

Use the `SubscribeButton` component to redirect users to Stripe Checkout:

```tsx
<SubscribeButton
  priceId="price_your_id_here"
  mode="subscription" // or "payment" for one-time
  buttonText="Subscribe Now"
/>
```

### Handling Webhooks

The webhook handler in `apps/nextjs/src/app/api/webhooks/stripe/route.ts` processes Stripe events and updates Clerk user metadata with subscription status.

## Database Schema

The integration uses the following Prisma schema for recording payments:

```prisma
model StripePayment {
  id               String   @id @default(cuid())
  clerkUserId      String   // Clerk user ID
  amount           Int      // in cents
  currency         String   @default("usd")
  status           String
  stripePaymentId  String   @unique
  metadata         Json?    // Optional metadata about the purchase
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  // Index to make querying by user efficient
  @@index([clerkUserId])
}
```

## Notes

- **Stripe as Source of Truth**: This implementation uses Stripe as the source of truth for subscription status, reducing database complexity
- **Clerk Metadata**: Subscription status is cached in Clerk user metadata for faster access
- **Webhook Security**: Make sure your webhook endpoint is properly secured with Stripe signature verification
