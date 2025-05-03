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
  event?: Stripe.Event;
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

    // Prepare additional checkout configuration based on mode
    let additionalConfig = {};

    // this will add metadata to the subscription webhook event
    if (options.mode === "subscription") {
      additionalConfig = {
        subscription_data: {
          metadata: {
            clerkUserId,
            ...options.metadata,
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    } else if (options.mode === "payment") {
      // this will add metadata to the charge.succeeded webhook event
      additionalConfig = {
        payment_intent_data: {
          metadata: {
            clerkUserId,
            accessType: "lifetime",
            ...options.metadata,
          },
        },
      };
    }

    // Create a checkout session with the base config plus mode-specific additions
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
      ...additionalConfig, // Spread in the mode-specific config
    });

    //return url to redirect to stripe checkout
    return { url: session.url };
  }

  /**
   * Create a customer portal session for subscription management
   *
   * @param clerkUserId - The user's Clerk ID
   * @param returnUrl - URL to return to after customer is done in the portal
   * @returns URL to redirect user to Stripe customer portal
   */
  async createCustomerPortalSession(
    clerkUserId: string,
    returnUrl: string,
  ): Promise<{ url: string | null }> {
    try {
      // Find customer by Clerk ID
      const customerId = await this.findCustomerByClerkId(clerkUserId);

      if (!customerId) {
        throw new Error("Customer not found");
      }

      // Create customer portal session
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return { url: session.url };
    } catch (error) {
      console.error("Error creating customer portal session:", error);
      return { url: null };
    }
  }

  /**
   * Check if a user has an active subscription or lifetime access
   * This method directly queries Stripe's API instead of a local database
   *
   * @param clerkUserId - The user's Clerk ID
   * @returns Object with hasAccess boolean and accessType ('lifetime', 'monthly', 'yearly', or null)
   */
  async checkAccess(clerkUserId: string): Promise<{
    hasAccess: boolean;
    accessType: "lifetime" | "monthly" | "yearly" | "none";
  }> {
    try {
      // Find customer by Clerk ID
      const customerId = await this.findCustomerByClerkId(clerkUserId);

      if (!customerId) {
        return { hasAccess: false, accessType: "none" };
      }

      // Look for active subscriptions
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: "active",
      });

      // Check for active subscription
      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        // Determine if it's monthly or yearly
        let accessType: "monthly" | "yearly" = "monthly";

        // Get the first subscription item to check its plan interval
        if (subscription?.items.data[0]?.plan?.interval === "year") {
          accessType = "yearly";
        }

        return {
          hasAccess: true,
          accessType,
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
        accessType: hasLifetimePurchase ? "lifetime" : "none",
      };
    } catch (error) {
      console.error("Error checking subscription:", error);
      return { hasAccess: false, accessType: "none" };
    }
  }

  /**
   * Verify and process webhook events from Stripe
   * Send back result (extracted context) to webhook handler (for example nextjs route hander) t
   * @param signature - Stripe signature from headers
   * @param payload - Request body as buffer
   * @returns Confirmation of receipt with event type and clerkUserId if available
   */
  // eslint-disable-next-line @typescript-eslint/require-await
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

    //currently handles charge.succeeded to check for lifetime purchase
    // and customer.subscription.updated/deleted/created to check for subscription status

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      console.log("charge.succeeded event");
      console.log(charge.metadata);
      clerkUserId = charge.metadata.clerkUserId;
    }

    if (event.type.startsWith("customer.subscription.")) {
      const subscription = event.data.object as Stripe.Subscription;
      console.log("customer.subscription event");
      console.log(subscription.metadata);
      clerkUserId = subscription.metadata.clerkUserId;
    }

    return {
      received: true,
      event: event,
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
}
