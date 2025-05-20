export * from "../generated/node";
export { Prisma } from "../generated/node";
export { db } from "./client";
export { PrismaClientEdge } from "./edge";

// export type DatabaseTransaction = Parameters<
//   Parameters<(typeof db)["transaction"]>[0]
// >[0];
