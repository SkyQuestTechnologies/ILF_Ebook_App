import { NextRequest, NextResponse } from "next/server";
import { getAuthorByEmail, createAuthor } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { createAuthorToken, AUTHOR_COOKIE, serializeAuthorCookie } from "@/lib/author";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown; name?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Display name is required." }, { status: 400 });
  }

  // Reject if the account already exists — this is what distinguishes signup from login.
  const existing = await getAuthorByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists. Please log in." },
      { status: 409 }
    );
  }

  const id = crypto.randomUUID();
  const password_hash = await hashPassword(password);
  try {
    await createAuthor({ id, email, display_name: name, password_hash, created_at: Date.now() });
  } catch {
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }

  const token = await createAuthorToken({ id, email, name });
  const isDev = process.env.NODE_ENV !== "production";
  const cookie = serializeAuthorCookie(AUTHOR_COOKIE, token, {
    httpOnly: true,
    secure: !isDev,
    sameSite: "Lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  const res = NextResponse.json({ ok: true, next: "/author/dashboard" });
  res.headers.set("Set-Cookie", cookie);
  return res;
}
