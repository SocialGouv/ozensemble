const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const geoip = require("geoip-lite");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { isStrongPassword } = require("validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// 1 year
const JWT_MAX_AGE = "365d";

function validatePassword(password) {
  return isStrongPassword(password, {
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}

router.post(
  "/signup",
  catchErrors(async (req, res) => {
    const { email, password, matomoId } = req.body || {};
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "missing email or password" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ ok: false, error: "invalid email" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ ok: false, error: "password is not strong enough" });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ ok: false, error: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: updateObj,
      create: {
        email,
        password: hashedPassword,
        matomo_id: matomoId,
        created_from,
        ...updateObj,
      },
    });

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token });
  })
);

router.post(
  "/signin",
  catchErrors(async (req, res) => {
    const { email, password, matomoId } = req.body || {};
    validator.isEmail(email);
    validator.isStrongPassword(password);
    console.log("signin", email, password, matomoId);
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "missing email or password" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "wrong email or password" });
    }
    console.log("user", user);

    // const match = await bcrypt.compare(password, user.password);
    const match = password === user.password;

    if (!match) {
      return res.status(400).json({ ok: false, error: "wrong email or password" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token });
  })
);

router.get(
  "/signin_token",
  catchErrors(async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token extraction
    if (!token) {
      return res.status(401).json({ ok: false, error: "No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "user not found" });
    }

    return res.status(200).send({ ok: true, user, token });
  })
);

router.put(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const updateObj = {};

    let created_from = "User";
    if (req.body.hasOwnProperty("pushNotifToken")) {
      updateObj.push_notif_token = req.body.pushNotifToken ?? "";
      created_from = "User-PushNotif";
    }
    if (req.body.hasOwnProperty("isOverWritten")) {
      updateObj.isOverWritten = true;
      created_from = "User-OverWritten";
    }

    // TODO: fix concurrency issue Unique constraint failed on the fields: (`matomo_id`)
    // using a "version" field ? https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide#optimistic-concurrency-control
    await prisma.user.upsert({
      where: { matomo_id: matomoId },
      update: updateObj,
      create: {
        matomo_id: matomoId,
        email: "yoan.roszak@selego.co",
        password: "password12@Abc",
        created_from,
        ...updateObj,
      },
    });

    return res.status(200).send({ ok: true });
  })
);

router.get(
  "/location",
  catchErrors(async (req, res) => {
    const { matomoId } = req.query || {};
    let isWellLocated = false;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    if (!user) return res.status(404).json({ ok: false, error: "user not found" });

    const xforwarded = req.headers["x-forwarded-for"];
    const location = geoip.lookup(xforwarded);
    if (location) {
      const { region } = location;
      isWellLocated = region === "IDF";
    }

    return res.status(200).send({ ok: true, isWellLocated });
  })
);

module.exports = router;
