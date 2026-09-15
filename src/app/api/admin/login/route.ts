import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  signAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  if (!password || !verifyAdminPassword(password)) {
    console.warn("admin login failed");
    return NextResponse.json({ ok: false, error: "パスワードが正しくありません" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: signAdminSession(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
