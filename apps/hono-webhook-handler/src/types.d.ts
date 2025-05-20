/// <reference types="@cloudflare/workers-types" />

import type { WebhookEvent } from "@clerk/backend";
import type { Context } from "hono";

import type { Env } from "./env";

// Extend the Hono context to include Cloudflare environment
declare module "hono" {
  interface ContextEnv {
    // Environment variables from our env.ts file
    Bindings: Env;
  }

  // Add typing for the webhookEvent property
  interface ContextVars {
    webhookEvent: WebhookEvent;
  }
}

// For modules that aren't correctly typed yet
declare module "@hono/trpc-server" {
  export const trpcServer: any;
}

declare module "@sassy/api" {
  export const appRouter: any;
  export const createServerClient: () => any;
  export const createTRPCContext: (opts: { headers: Headers }) => any;
}
