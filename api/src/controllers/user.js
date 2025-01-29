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
const { authenticateToken } = require("../middlewares/tokenAuth");

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
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "missing email or password" });
    }

    console.log("validator.isEmail(email)", validator.isEmail(email));
    if (!validator.isEmail(email)) {
      return res.status(400).json({ ok: false, error: "invalid email" });
    }
    console.log("validatePassword(password)", validatePassword(password));
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

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, newUser });
  })
);

router.post(
  "/signin",
  catchErrors(async (req, res) => {
    const { email, password } = req.body || {};
    validator.isEmail(email);
    validator.isStrongPassword(password);
    console.log("signin", email, password);

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
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ ok: false, error: "wrong email or password" });
    }

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: JWT_MAX_AGE,
    });

    return res.status(200).send({ ok: true, token, user });
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

    return res.status(200).send({ ok: true, user, token, user });
  })
);

router.put(
  "/",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;

    const updateObj = {};

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
    await prisma.user.update({
      where: { id: user.id },
      data: updateObj,
    });

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/delete",
  authenticateToken,
  catchErrors(async (req, res) => {
    const { email, password } = req.body || {};
    console.log("delete", email, password);
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Missing email or password" });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "Wrong email or password" });
    }

    // Compare provided password with the hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ ok: false, error: "Wrong email or password" });
    }

    // Delete the user
    await prisma.user.delete({
      where: { email },
    });

    return res.status(200).send({ ok: true, message: "User deleted successfully" });
  })
);

router.post(
  "/update",
  authenticateToken,
  catchErrors(async (req, res) => {
    const { email, password, newPassword } = req.body || {};
    console.log("update", email, password, newPassword);

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Missing email or password" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ ok: false, error: "Password is not strong enough" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ ok: false, error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "Wrong email or password" });
    }
    console.log("fkrfikefk", password, user.password);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ ok: false, error: "Wrong email or password" });
    }

    const updateObj = {};
    console.log("alo oui non", newPassword);
    if (newPassword) {
      if (!validator.isStrongPassword(newPassword)) {
        return res.status(400).json({ ok: false, error: "New password is not strong enough" });
      }
      updateObj.password = await bcrypt.hash(newPassword, 10);
    }
    console.log("breolirdo", email, decoded.email);
    let newToken = "";
    if (email && email !== decoded.email) {
      updateObj.email = email;
      newToken = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: JWT_MAX_AGE,
      });
    }

    if (Object.keys(updateObj).length === 0) {
      return res.status(400).json({ ok: false, error: "Nothing to update" });
    }
    console.log("updateObj", updateObj);

    await prisma.user.update({
      where: { email: decoded.email },
      data: updateObj,
    });

    return res.status(200).send({ ok: true, token: newToken ?? "", message: "User updated successfully" });
  })
);
router.get(
  "/location",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;
    let isWellLocated = false;

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
