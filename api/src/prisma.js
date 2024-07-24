const { PrismaClient } = require("@prisma/client");

const prisma =
  global.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL + "&connection_limit=5",
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

module.exports = prisma;
