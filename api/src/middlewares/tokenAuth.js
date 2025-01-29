const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const prisma = require("../prisma");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token extraction
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ ok: false, error: "No token provided" });
  }

  try {
    console.log("verifying token", token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);
    const user = await prisma.user.findFirst({
      where: { email: decoded.email },
    });
    console.log("user");
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ ok: false, error: "User not found" });
    }
    console.log("user found", user);

    // Attach user info to req object
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ ok: false, error: "Token is invalid or expired" });
  }
};

module.exports = { authenticateToken };
