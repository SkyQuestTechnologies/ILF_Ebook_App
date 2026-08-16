import { NextRequest, NextResponse } from "next/server";
import { getAuthorByEmail } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createAuthorToken, AUTHOR_COOKIE, serializeAuthorCookie } from "@/lib/author";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; password?: unknown }
    | null;

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const author = await getAuthorByEmail(email);
  // Same generic message whether the email is unknown or the password is wrong,
  // so we don't leak which emails have accounts.
  if (!author || !(await verifyPassword(password, author.password_hash))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createAuthorToken({
    id: author.id,
    email: author.email,
    name: author.display_name,
  });

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
