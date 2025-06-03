import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import type { AppType } from "./types";
import { prismaMiddleware } from "./middleware/db";
import { clerkWebhooksRouter } from "./routes/clerk-webhooks";
import { stripeWebhooksRouter } from "./routes/stripe-webhooks";
import { userRouter } from "./routes/users";

// Initialize Hono app with typed environment and variables
const app = new Hono<AppType>();

// Add logger middleware
app.use("*", logger());

// Add CORS middleware
app.use(
  "*",
  cors({
    origin: "*", // For production, specify your actual origins
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// Add Prisma middleware to all API routes
// Ensure this middleware handles its own potential errors or lets them propagate
app.use("/*", prismaMiddleware());

// --- Centralized Error Handler ---
// This should ideally be registered after general middleware but before specific routes
// if you want it to catch errors from the routing layer.
// Or, place it towards the end to catch any unhandled errors from routes.
// For simplicity and broad coverage of route errors, placing it here is fine.
app.onError((err, c) => {
  // Log the error to your server console or a logging service
  console.error("Unhandled application error:", err);

  // Send a generic, user-friendly JSON response
  // This prevents the app from crashing and leaking error details
  return c.json(
    {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      // You might want to include an error ID for tracking in more advanced setups
      // errorId: generateSomeUniqueId()
    },
    500,
  ); // HTTP 500 Internal Server Error
});

// Health check endpoint
app.get("/", (c) => c.text("Webhook handler is running"));
app.get("/health", (c) => c.json({ status: "ok" }));

// Mount route modules
// If an error is thrown within these route handlers and not caught locally,
// the app.onError handler above will catch it.
app.route("/webhooks", userRouter);
app.route("/webhooks", clerkWebhooksRouter);
app.route("/webhooks", stripeWebhooksRouter);

// Export for Cloudflare Workers (or your deployment target)
export default app;
