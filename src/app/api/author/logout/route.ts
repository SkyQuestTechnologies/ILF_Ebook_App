import { NextResponse } from "next/server";
import { AUTHOR_COOKIE, clearAuthorCookie } from "@/lib/author";


export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearAuthorCookie(AUTHOR_COOKIE));
  return res;
}
