import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "bagsglory_luxury_atelier_secret_key_2026";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export const AUTH_COOKIE_NAME = "bagsglory_admin_token";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function signToken(payload: { id: string; email: string; name: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<{ id: string; email: string; name: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as { id: string; email: string; name: string; role: string };
  } catch {
    return null;
  }
}

export async function getAuthSession(): Promise<{ id: string; email: string; name: string; role: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}
