import crypto from "crypto";
import { NextRequest } from "next/server";

export const DEFAULT_ADMIN_EMAIL = "texpartdesign@gmail.com";
export const DEFAULT_ADMIN_PASSWORD = "123456";

const AUTH_SECRET =
  process.env.ADMIN_AUTH_SECRET ||
  process.env.CLOUDINARY_API_SECRET ||
  "texpart-enterprise-admin-secure-signing-secret-2026";

export interface AdminSession {
  email: string;
  role: string;
  name: string;
  exp: number; // Unix timestamp in ms
}

/**
 * Creates a cryptographically signed session token.
 */
export function createSessionToken(payload: Omit<AdminSession, "exp">, expiresInDays: number = 7): string {
  const exp = Date.now() + expiresInDays * 24 * 60 * 60 * 1000;
  const fullPayload: AdminSession = { ...payload, exp };

  const dataString = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(dataString)
    .digest("base64url");

  return `${dataString}.${signature}`;
}

/**
 * Verifies and parses a signed session token.
 * Returns null if token is invalid or expired.
 */
export function verifySessionToken(token: string | null | undefined): AdminSession | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [dataString, signature] = parts;

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(dataString)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  try {
    const payload: AdminSession = JSON.parse(
      Buffer.from(dataString, "base64url").toString("utf8")
    );

    // Check expiration
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates admin credentials.
 */
export function validateAdminCredentials(email?: string, password?: string): boolean {
  if (!email || !password) return false;

  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  // Primary check: required default credentials
  if (cleanEmail === DEFAULT_ADMIN_EMAIL.toLowerCase() && cleanPassword === DEFAULT_ADMIN_PASSWORD) {
    return true;
  }

  return false;
}

/**
 * Extracts and verifies the admin session from a NextRequest.
 */
export function getAdminSessionFromRequest(req: NextRequest): AdminSession | null {
  const token = req.cookies.get("admin_session")?.value;
  return verifySessionToken(token);
}
