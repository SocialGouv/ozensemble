
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { prisma } from "../db";




export const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token extraction
  if (!token) {
    return res.status(401).json({ ok: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "User not found" });
    }

    // Attach user info to req object
    req.user = user;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ ok: false, error: "Token is invalid or expired" });
  }
};

module.exports = { authenticateToken };