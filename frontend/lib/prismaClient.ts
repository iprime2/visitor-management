import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ log: ["query", "error"] });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ log: ["query", "error"] });
  }
  prisma = global.cachedPrisma;
}

export const prismaClient = prisma;
