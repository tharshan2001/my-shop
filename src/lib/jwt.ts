import * as jwt from "jsonwebtoken";

// Load secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in .env.local");
}

const SECRET: string = JWT_SECRET;

// Define payload type for our JWTs
export interface JwtPayload {
  id: string;
  email: string;
}

/**
 * Sign a JWT token with a payload.
 * Expires in 1 hour.
 */
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
}


export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET, { algorithms: ["HS256"] });

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "id" in decoded &&
      "email" in decoded
    ) {
      return decoded as JwtPayload;
    }

    return null;
  } catch {
    return null;
  }
}