const { PrismaClient } = require("@prisma/client");

console.log("DATABASE_URL", process.env.DATABASE_URL);

const prisma =
  global.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL + "&connection_limit=5",
  });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

module.exports = prisma;
