import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRY = "8h";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set. Configure it in server/.env (see .env.example).");
  }
  return secret;
}

export function login(req: Request, res: Response): void {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ error: "ADMIN_PASSWORD is not configured on the server. See server/.env.example." });
    return;
  }

  const { password } = req.body as { password?: string };
  if (!password || password !== adminPassword) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: TOKEN_EXPIRY });
  res.json({ token });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    res.status(401).json({ error: "Missing admin token" });
    return;
  }

  try {
    jwt.verify(token, getJwtSecret());
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired admin token" });
  }
}
