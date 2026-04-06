import { NextRequest, NextResponse } from "next/server";
import { signSession, verifySession } from "@/lib/session";

const DEMO_USERS = new Map(); // In-memory demo user store

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  // Demo: create user if not exists
  let user = DEMO_USERS.get(email);
  if (!user) {
    user = { id: Math.random().toString(36).slice(2), email };
    DEMO_USERS.set(email, user);
  }
  const session = { userId: user.id, email: user.email, iat: Date.now(), exp: Date.now() + 86400000 };
  const cookie = await signSession(session);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", cookie, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  return res;
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value;
  if (!cookie) return NextResponse.json({ session: null });
  const session = await verifySession(cookie);
  return NextResponse.json({ session });
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("session", "", { httpOnly: true, expires: new Date(0), path: "/" });
  return res;
}
