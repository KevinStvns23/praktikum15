import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { pathToFileURL } from "node:url";
import path from "node:path";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const localDbPath = path.resolve(process.cwd(), "prisma", "dev.db");
const localDbUrl = pathToFileURL(localDbPath).toString();

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? localDbUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}