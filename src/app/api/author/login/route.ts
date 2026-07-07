import { NextRequest, NextResponse } from "next/server";
import { getAuthorByEmail, createAuthor } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createAuthorToken, AUTHOR_COOKIE } from "@/lib/author";
import { cookieSerialize } from "@/lib/session";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown; name?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!email || !email.includes("@") || password.length < 8) {
    return NextResponse.json(
      { error: "Valid email and password (min 8 chars) required." },
      { status: 400 }
    );
  }

  let author = await getAuthorByEmail(email);

  if (!author) {
    // Create-on-first-use (slice 1 convenience; replace with explicit signup later).
    const id = crypto.randomUUID();
    const password_hash = await hashPassword(password);
    await createAuthor({
      id,
      email,
      display_name: name || email.split("@")[0],
      password_hash,
      created_at: Date.now(),
    });
    author = {
      id,
      email,
      display_name: name || email.split("@")[0],
      password_hash,
      created_at: Date.now(),
    };
  } else {
    const ok = await verifyPassword(password, author.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
  }

  const token = await createAuthorToken({
    id: author.id,
    email: author.email,
    name: author.display_name,
  });

  const isDev = process.env.NODE_ENV !== "production";
  const cookie = cookieSerialize(AUTHOR_COOKIE, token, {
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
