import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@sassy/db-edge";

// //get database url from env
// const DATABASE_URL = process.env.DATABASE_URL;

// const adapter = new PrismaPg({ connectionString: DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// const dbEdge = prisma;

export { PrismaClient as PrismaClientEdge };
// /**
//  * Helper function to create an edge client with a Postgres adapter
//  * Compatible with Cloudflare Workers and other edge runtimes
//  */
// export const createEdgeClient = ({
//   connectionString,
//   pgAdapter,
// }: {
//   connectionString: string;
//   pgAdapter: any; // This will be PrismaPg instance from the adapter-pg package
// }): PrismaClientEdge => {
//   // Create a brand new client instance for each request
//   // When using an adapter, don't provide datasources config
//   // @ts-ignore - The adapter property is supported but TypeScript doesn't know it
//   return new PrismaClientEdge({
//     adapter: pgAdapter,
//   });
// };
