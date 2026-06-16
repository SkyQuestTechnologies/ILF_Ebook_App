import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "ilf_session", value: "", path: "/", maxAge: 0 });
  res.cookies.set({ name: "ilf_user", value: "", path: "/", maxAge: 0 });
  return res;
}
