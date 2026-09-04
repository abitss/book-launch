import { NextResponse } from "next/server";
import { adminCookie, createAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return NextResponse.json({ error: "ADMIN_PASSWORD is not configured" }, { status: 503 });
  if (typeof password !== "string" || password !== configured) return NextResponse.json({ error: "Invalid admin password" }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(adminCookie, createAdminToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60 });
  return response;
}
