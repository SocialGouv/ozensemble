const { version, mobileAppVersion } = require("../package.json");

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV || "development";

const SENTRY_KEY = process.env.SENTRY_KEY;

const VERSION = version;
const MOBILE_VERSION = mobileAppVersion;

module.exports = {
  PORT,
  ENVIRONMENT,
  SENTRY_KEY,
  VERSION,
  MOBILE_VERSION,
};
