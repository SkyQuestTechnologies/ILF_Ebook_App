import { NextRequest, NextResponse } from "next/server";
import { getReaderByEmail, createReader } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { createReaderToken, READER_COOKIE, serializeReaderCookie } from "@/lib/reader";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown; name?: unknown; next?: unknown; download?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const nextRaw = typeof body?.next === "string" ? body.next : "/library";
  const download = typeof body?.download === "string" ? body.download : "";
  const next = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/library";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const existing = await getReaderByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Please log in." },
      { status: 409 }
    );
  }

  const id = crypto.randomUUID();
  const password_hash = await hashPassword(password);
  try {
    await createReader({ id, email, display_name: name, password_hash, created_at: Date.now() });
  } catch {
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }

  const token = await createReaderToken({ id, email, name });
  const isProd = process.env.NODE_ENV === "production";
  const cookie = serializeReaderCookie(READER_COOKIE, token, {
    httpOnly: true, secure: isProd, sameSite: "Lax", path: "/", maxAge: 7 * 24 * 60 * 60,
  });

  const nextUrl = download ? `${next}?download=${encodeURIComponent(download)}` : next;
  const res = NextResponse.json({ ok: true, next: nextUrl });
  res.headers.set("Set-Cookie", cookie);
  return res;
}
