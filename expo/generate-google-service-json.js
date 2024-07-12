const fs = require("fs");

// we can't use `dotenv` in here because, as says Claude.ai:
// When running a local EAS build, the build process creates a temporary directory and copies your project files there. It seems the .env file is not being included in this process.
const googleServicesBase64 = process.env.GOOGLE_SERVICES_BASE64;

if (!googleServicesBase64) {
  console.error("GOOGLE_SERVICES_BASE64 environment variable is not set");
  process.exit(1);
}

const googleServicesJson = Buffer.from(googleServicesBase64, "base64").toString("utf-8");

fs.writeFileSync("./google-services.json", googleServicesJson);

console.log("google-services.json has been created successfully");
