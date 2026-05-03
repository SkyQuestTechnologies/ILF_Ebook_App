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
    JSON.stringify({
      email,
      iat: Math.floor(Date.now() / 1000),
    })
  );

  return `${header}.${payload}.demo-signature`;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const nextRaw = String(formData.get("next") || "/library");
  const download = String(formData.get("download") || "");

  const next = isSafePath(nextRaw) ? nextRaw : "/library";

  if (!email || !email.includes("@")) {
    const errorUrl = new URL("/login", req.url);
    errorUrl.searchParams.set("error", "invalid_email");
    errorUrl.searchParams.set("next", next);

    if (download) {
      errorUrl.searchParams.set("download", download);
    }

    return NextResponse.redirect(errorUrl);
  }

  const redirectUrl = new URL(next, req.url);

  if (download) {
    redirectUrl.searchParams.set("download", download);
  }

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

  return res;
}