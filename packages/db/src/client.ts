// 1. Import PrismaClient from your custom generated path
import { PrismaClient } from "@sassy/db-node";

// import { PrismaClient as PrismaClientEdge } from "../generated/client/edge";

// 2. Extend the global NodeJS namespace to declare a 'cachedPrisma' variable
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient; // Note: Type is PrismaClient directly
}

// 3. Declare 'prisma' which will hold the client instance
let prisma: PrismaClient;

// 4. Conditional instantiation based on environment
if (process.env.NODE_ENV === "production") {
  // In production, always create a new instance.
  console.log("Creating new PrismaClient instance for production"); // For demonstration
  prisma = new PrismaClient({
    /* options */
  });
} else {
  // In development/other non-production environments:
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!global.cachedPrisma) {
    // If no cached instance exists on 'global', create one and cache it.
    // this is to avoid creating a new instance of the PrismaClient on hot reload in dev mode
    console.log(
      "Creating and caching new PrismaClient instance for development",
    ); // For demonstration
    global.cachedPrisma = new PrismaClient({
      /* options */
    });
  }
  // Use the cached instance.
  prisma = global.cachedPrisma;
}

// 5. Export the Prisma client instance as 'db' (or 'prisma')
export type { PrismaClient as PrismaClientType } from "@sassy/db-node";
export const db = prisma;

// // Create a clean Edge client without any global references
// // Each request will get a fresh instance
// export const dbEdge = new PrismaClientEdge({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });
// // Export the PrismaClient type for convenience if needed elsewhere
// export type { PrismaClient as PrismaClientType } from "../generated/client";

// // Export Prisma's transaction type.
// // This is the type of the `prisma` client passed to the transaction callback.
// // It's essentially a PrismaClient but scoped to the transaction.
// export type PrismaTransactionClient = Parameters<
//   Parameters<PrismaClient["$transaction"]>[0]
// >[0];
