import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

declare global {
  // This prevents TypeScript from complaining about the 'global' object.
  // In development mode, this will allow you to reuse the PrismaClient across hot-reloads.
  var cachedPrisma: PrismaClient | undefined;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // Use a cached PrismaClient in development, or create a new one in production
    const prisma = global.cachedPrisma || new PrismaClient({ log: ['query', 'error'] });

    // Cache the Prisma Client in development for reuse
    if (process.env.NODE_ENV !== 'production') {
      global.cachedPrisma = prisma;
    }

    // Call the parent PrismaClient constructor to initialize the client
    super();
    // super({ log: prisma._log });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
