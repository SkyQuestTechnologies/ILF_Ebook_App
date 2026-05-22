import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function isSafePath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

function base64UrlEncode(value: string): string {
  return btoa(value)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function createDemoJwt(email: string): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({ email, iat: Math.floor(Date.now() / 1000) })
  );
  return `${header}.${payload}.demo-signature`;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const username = String(formData.get("username") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();
  const nextRaw = String(formData.get("next") || "/library");
  const download = String(formData.get("download") || "");

  const next = isSafePath(nextRaw) ? nextRaw : "/library";

  const errorBase = new URL("/login", req.url);
  errorBase.searchParams.set("next", next);
  if (download) errorBase.searchParams.set("download", download);

  if (!username || !password) {
    errorBase.searchParams.set("error", "missing_fields");
    return NextResponse.redirect(errorBase);
  }

  if (!email || !email.includes("@")) {
    errorBase.searchParams.set("error", "invalid_email");
    return NextResponse.redirect(errorBase);
  }

  const redirectUrl = new URL(next, req.url);
  if (download) redirectUrl.searchParams.set("download", download);

  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set({
    name: "ilf_session",
    value: createDemoJwt(email),
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.cookies.set({
    name: "ilf_user",
    value: JSON.stringify({ email, username }),
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
