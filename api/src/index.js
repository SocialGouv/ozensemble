require("dotenv").config({ path: "./.env" });

const Sentry = require("@sentry/node");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const prisma = require("./prisma");

const { PORT, VERSION, MOBILE_VERSION } = require("./config");
const errors = require("./middlewares/errors");
const versionCheck = require("./middlewares/versionCheck");
const { capture } = require("./third-parties/sentry");

// Put together a schema
const app = express();
// if (process.env.NODE_ENV === "development") {
app.use(logger("dev"));
// }

app.use(Sentry.Handlers.requestHandler());

app.use(cors());

// kube probe
app.get("/healthz", async (req, res) => {
  res.send(`Hello World`);
});

app.get("/sentry-check", async (req, res) => {
  capture("sentry-check");
  res.send(`Sentry checked!`);
});

// hello world
const now = new Date();
app.get("/", async (req, res) => {
  res.send(`Hello World at ${now.toISOString()}`);
});
app.get("/config", async (req, res) => {
  res.send({ VERSION, MOBILE_VERSION });
});

// Add header with API version to compare with client.
app.use((_req, res, next) => {
  res.header("X-API-VERSION", VERSION);
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
  res.header("Access-Control-Expose-Headers", "X-API-VERSION");
  next();
});

//
app.set("json replacer", (k, v) => (v === null ? undefined : v));

// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(helmet());

// redirect links qr codes
app.use("/qr", require("./controllers/qr"));

// check version before checking other controllers
app.use(versionCheck);

// Routes

app.use("/event", require("./controllers/event"));
app.use("/user", require("./controllers/user"));
app.use("/mail", require("./controllers/mail").router);
app.use("/reminder", require("./controllers/reminder").router);
app.use("/badge", require("./controllers/badge"));
app.use("/consommation", require("./controllers/consommation"));
app.use("/goal", require("./controllers/goal"));
app.use("/appMilestone", require("./controllers/appMilestone"));

app.use(errors.sendError);

require("./cronjobs");

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));
