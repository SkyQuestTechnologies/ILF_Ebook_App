import { NextRequest, NextResponse } from "next/server";
import { getReaderByEmail } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createReaderToken, READER_COOKIE, serializeReaderCookie } from "@/lib/reader";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown; next?: unknown; download?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const nextRaw = typeof body?.next === "string" ? body.next : "/library";
  const download = typeof body?.download === "string" ? body.download : "";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/library";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const reader = await getReaderByEmail(email);
  if (!reader || !(await verifyPassword(password, reader.password_hash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createReaderToken({
    id: reader.id,
    email: reader.email,
    name: reader.display_name,
  });

  const isProd = process.env.NODE_ENV === "production";
  const cookie = serializeReaderCookie(READER_COOKIE, token, {
    httpOnly: true, secure: isProd, sameSite: "Lax", path: "/", maxAge: 7 * 24 * 60 * 60,
  });

  const nextUrl = download ? `${next}?download=${encodeURIComponent(download)}` : next;
  const res = NextResponse.json({ ok: true, next: nextUrl });
  res.headers.set("Set-Cookie", cookie);
  return res;
}
