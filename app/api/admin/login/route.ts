import crypto from "crypto";
import { NextResponse } from "next/server";
import { adminCookie, createAdminToken } from "@/lib/admin-auth";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";
    const configured = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    if (!configured || !sessionSecret) {
      return NextResponse.json({ error: "Admin access unavailable" }, { status: 503, headers });
    }

    if (!password || !safeEqual(password, configured)) {
      return NextResponse.json({ error: "Access denied" }, { status: 401, headers });
    }

    const response = NextResponse.json({ success: true }, { headers });
    response.cookies.set(adminCookie, createAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 12 * 60 * 60
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Access denied" }, { status: 400, headers });
  }
}
