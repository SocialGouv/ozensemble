const bcrypt = require("bcryptjs");
const prisma = require("./prisma");
const { capture } = require("./third-parties/sentry");

async function upsertUserWithLock(upsertObj) {
  try {
    const matomoId = upsertObj?.where?.matomo_id;

    if (!/^[0-9a-fA-F]{16}$/.test(matomoId)) {
      throw new Error(`Invalid matomo_id: ${matomoId}`);
    }
    return await prisma.$transaction(async (tx) => {
      // Lock the row for the given matomo_id using $executeRaw -> variable is escaped
      const select = await tx.$executeRaw`SELECT * FROM "User" WHERE "matomo_id" = ${matomoId} FOR UPDATE`;

      // Perform the upsert operation
      const result = await tx.user.upsert(upsertObj);

      if (!result) {
        throw new Error(`Upsert failed for matomo_id: ${matomoId}`);
      }

      return result;
    });
  } catch (error) {
    capture(error);
  }
}

async function comparePassword(password, expected) {
  return bcrypt.compare(password, expected);
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

const looseUuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const obnjectIdRegex = /^[a-f0-9]{24}$/;
const cryptoHexRegex = /^[A-Fa-f0-9]{16,128}$/;
const positiveIntegerRegex = /^\d+$/;

module.exports = {
  upsertUserWithLock,
  comparePassword,
  hashPassword,
  looseUuidRegex,
  obnjectIdRegex,
  positiveIntegerRegex,
  cryptoHexRegex,
};
