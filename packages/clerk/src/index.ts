import type { User } from "@clerk/backend";
import { Clerk } from "@clerk/backend";

// clerk-service.ts

export interface ClerkConfig {
  CLERK_SECRET_KEY: string;
  CLERK_WEBHOOK_SECRET?: string;
}

export class ClerkService {
  private clerk: ReturnType<typeof Clerk>;
  private webhookSecret?: string;

  constructor(config: ClerkConfig) {
    this.clerk = Clerk({
      secretKey: config.CLERK_SECRET_KEY,
    });
    this.webhookSecret = config.CLERK_WEBHOOK_SECRET;
  }

  /**
   * Extracts a bearer token from Authorization header or Clerk session from cookies.
   * Supports both for maximum framework compatibility.
   */
  static extractToken(headers: Headers): string | null {
    // Try Authorization header first
    const authHeader = headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.slice("Bearer ".length);
    }
    // Try Clerk session cookie (__session)
    const cookieHeader = headers.get("cookie");
    if (cookieHeader) {
      const match = cookieHeader.match(/__session=([^;]+)/);
      if (match?.[1]) return match[1];
    }
    return null;
  }

  /**
   * Tries to get a User object from the request headers.
   * Tries JWT first, then session token.
   */
  async currentUser(headers: Headers): Promise<User | null> {
    const token = ClerkService.extractToken(headers);
    if (!token) return null;

    // Try JWT verification
    try {
      const claims = await this.clerk.tokens.verify(token);
      return await this.clerk.users.getUser(claims.sub);
    } catch {}

    // Try session token verification
    try {
      const session = await this.clerk.sessions.verifySession(token);
      return await this.clerk.users.getUser(session.userId);
    } catch {}

    return null;
  }

  /**
   * Gets a userId from token (for internal use).
   */
  async getUserIdFromToken(token: string): Promise<string | null> {
    try {
      const claims = await this.clerk.JWT.verifyToken(token);
      return claims.sub;
    } catch {}
    try {
      const session = await this.clerk.sessions.verifySession(token);
      return session.userId;
    } catch {}
    return null;
  }

  /**
   * Fetches a Clerk user by userId.
   */
  async getUser(userId: string) {
    return this.clerk.users.getUser(userId);
  }

  /**
   * (Optional) Verifies Clerk webhook signature.
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // Implement properly based on Clerk webhook docs and use this.webhookSecret
    return true;
  }
}

// Also export User type for easy import in your trpc package
export type { User } from "@clerk/backend";
