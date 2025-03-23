import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

async function main() {
  //change to reference a table in your schema
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
