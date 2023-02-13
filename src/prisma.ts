import { PrismaClient } from '@prisma/client';

// add prisma to the NodeJS global type
declare global {
  var prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
// export const prisma = global.prisma || new PrismaClient({ log: ['query']});
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;
