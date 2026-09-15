import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "reception_admin";
const MAX_AGE_MS = 12 * 60 * 60 * 1000;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

export function signAdminSession() {
  const exp = Date.now() + MAX_AGE_MS;
  const payload = String(exp);
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token: string | undefined) {
  if (!token || !secret()) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_COOKIE)?.value);
}
