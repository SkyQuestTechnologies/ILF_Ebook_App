import { NextResponse } from "next/server";
import { AUTHOR_COOKIE } from "@/lib/author";
import { cookieClear } from "@/lib/session";

export const runtime = "edge";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", cookieClear(AUTHOR_COOKIE));
  return res;
}
