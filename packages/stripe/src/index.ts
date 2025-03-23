// packages/stripe/src/index.ts
import Stripe from "stripe";

/**
 * Configuration options for Stripe service
 */
export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
  apiVersion?: string;
}

/**
 * Result of handleWebhookEvent
 */
export interface WebhookResult {
  received: boolean;
  event?: string;
  clerkUserId?: string;
}

/**
 * Stripe service for handling payments and subscriptions
 * This implementation uses Stripe as the single source of truth
 * for subscription status, eliminating the need for a database table
 */
export class StripeService {
  private stripe: Stripe;
  private webhookSecret: string;

  constructor(config: StripeConfig) {
    // Initialize Stripe with API key
    this.stripe = new Stripe(config.secretKey, {
      apiVersion: "2023-08-16", // Use a stable version
    });
    this.webhookSecret = config.webhookSecret;
  }

  /**
   * Create a checkout session for subscription or one-time purchase
   *
   * @param clerkUserId - The user's Clerk ID (stored in Stripe metadata)
   * @param email - User's email address
   * @param options - Configuration for the checkout
   * @returns URL to redirect user to Stripe checkout
   */
  async createCheckoutSession(
    clerkUserId: string,
    email: string,
    options: {
      priceId: string;
      mode: "subscription" | "payment"; // 'payment' for one-time payments like lifetime
      successUrl: string;
      cancelUrl: string;
      metadata?: Record<string, string>;
    },
  ): Promise<{ url: string | null }> {
    // Get or create a Stripe customer with Clerk ID in metadata
    const customerId = await this.getOrCreateCustomer(clerkUserId, email);

    // Create a checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: options.priceId,
          quantity: 1,
        },
      ],
      mode: options.mode,
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      metadata: {
        clerkUserId, // Include Clerk ID for webhook reference
        ...options.metadata,
      },
    });

    return { url: session.url };
  }

  /**
   * Check if a user has an active subscription or lifetime access
   * This method directly queries Stripe's API instead of a local database
   *
   * @param clerkUserId - The user's Clerk ID
   * @returns Whether the user has access
   */
  async hasAccess(clerkUserId: string): Promise<{
    hasAccess: boolean;
    isLifetime: boolean;
    subscription?: Stripe.Subscription | null;
  }> {
    try {
      // Find customer by Clerk ID
      const customerId = await this.findCustomerByClerkId(clerkUserId);

      if (!customerId) {
        return { hasAccess: false, isLifetime: false };
      }

      // Look for active subscriptions
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: "active",
      });

      // Check for active subscription
      if (subscriptions.data.length > 0) {
        return {
          hasAccess: true,
          isLifetime: false,
          subscription: subscriptions.data[0],
        };
      }

      // If no active subscription, check for successful lifetime purchases
      // We use charges that have specific metadata
      const charges = await this.stripe.charges.list({
        customer: customerId,
      });

      // Look for successful lifetime purchases
      const hasLifetimePurchase = charges.data.some(
        (charge) =>
          charge.status === "succeeded" &&
          charge.metadata.accessType === "lifetime",
      );

      return {
        hasAccess: hasLifetimePurchase,
        isLifetime: hasLifetimePurchase,
      };
    } catch (error) {
      console.error("Error checking subscription:", error);
      return { hasAccess: false, isLifetime: false };
    }
  }

  /**
   * Verify and process webhook events from Stripe
   *
   * @param signature - Stripe signature from headers
   * @param payload - Request body as buffer
   * @returns Confirmation of receipt with event type and clerkUserId if available
   */
  async handleWebhookEvent(
    signature: string,
    payload: Buffer,
  ): Promise<WebhookResult> {
    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.webhookSecret,
      );
    } catch (err) {
      throw new Error(
        `Webhook signature verification failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );
    }

    // Extract clerk user ID from metadata if available
    let clerkUserId: string | undefined = undefined;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      clerkUserId = session.metadata?.clerkUserId;
    } else if (event.type.startsWith("customer.subscription.")) {
      const subscription = event.data.object as Stripe.Subscription;
      clerkUserId = subscription.metadata.clerkUserId;
    }

    return {
      received: true,
      event: event.type,
      clerkUserId,
    };
  }

  /**
   * Find a Stripe customer by Clerk ID
   *
   * @param clerkUserId - The user's Clerk ID
   * @returns Stripe customer ID if found
   */
  private async findCustomerByClerkId(
    clerkUserId: string,
  ): Promise<string | null> {
    // Search for customers with standard API
    const customers = await this.stripe.customers.list({
      limit: 100, // List more customers to increase chance of finding
    });

    // Manually filter for the clerkUserId in metadata
    const customer = customers.data.find(
      (cust) => cust.metadata.clerkUserId === clerkUserId,
    );

    if (customer) {
      return customer.id;
    }

    return null;
  }

  /**
   * Get or create a Stripe customer for a Clerk user
   *
   * @param clerkUserId - The user's Clerk ID
   * @param email - User's email address
   * @returns Stripe customer ID
   */
  private async getOrCreateCustomer(
    clerkUserId: string,
    email: string,
  ): Promise<string> {
    // Check if customer already exists
    const existingCustomerId = await this.findCustomerByClerkId(clerkUserId);

    if (existingCustomerId) {
      return existingCustomerId;
    }

    // Create new customer with Clerk ID in metadata
    const customer = await this.stripe.customers.create({
      email,
      metadata: {
        clerkUserId, // This is key for finding customers later
      },
    });

    return customer.id;
  }

  /**
   * Sync subscription status to Clerk metadata
   * This is useful if you want to avoid Stripe API calls for basic checks
   *
   * @param clerkUserId - The user's Clerk ID
   * @param updateFn - Function to update Clerk metadata
   *
   * needs to add function as input later
   */
  async syncSubscriptionToClerk(
    clerkUserId: string,
    updateFn: (data: {
      hasAccess: boolean;
      isLifetime: boolean;
    }) => Promise<void>,
  ): Promise<void> {
    try {
      const status = await this.hasAccess(clerkUserId);
      await updateFn(status);
    } catch (error) {
      console.error("Error syncing to Clerk:", error);
    }
  }
}
