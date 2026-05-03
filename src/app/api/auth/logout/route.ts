import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Clear the ilf_session cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "ilf_session", value: "", path: "/", maxAge: 0 });
  return res;
}
