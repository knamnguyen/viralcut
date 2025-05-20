import { z } from "zod";

/**
 * Define a schema for environment variables
 */
const envSchema = z.object({
  // Required environment variables
  CLERK_WEBHOOK_SECRET: z.string().min(1, "CLERK_WEBHOOK_SECRET is required"),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
  DIRECT_URL: z.string().url("DIRECT_URL must be a valid URL"),

  // Optional environment variables with defaults
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * Type for the environment variables
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Parse and validate environment variables at runtime
 * This will throw an error if validation fails
 */
export function validateEnv(env: Record<string, unknown>): Env {
  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(", ");
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}`,
      );
    }
    throw new Error("Failed to validate environment variables");
  }
}

/**
 * Helper function to get a specific environment variable with proper typing
 */
export function getEnv<K extends keyof Env>(
  env: Record<string, unknown>,
  key: K,
): Env[K] {
  const validatedEnv = validateEnv(env);
  return validatedEnv[key];
}
