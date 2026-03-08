import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, cookieSerialize } from "@/lib/session";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      email?: string;
      campaign?: string;
      next?: string;
    };
    const { email, campaign, next } = body;

    // Improved email validation: must be string, contain @, and at least one dot after @
    if (
      typeof email !== "string" ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 7 * 24 * 60 * 60;
    const claims = {
      sub: crypto.randomUUID(),
      email,
      unlocked: campaign ? [campaign] : [],
      iat: now,
      exp,
    };

    // Harden secret handling: require secret in production
    const secret = process.env.ILF_SESSION_SECRET;
    const isDev = process.env.NODE_ENV !== "production";
    if (!secret && !isDev) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }
    const sessionSecret = secret || "dev-only-insecure-secret-change-me";

    const token = await createSessionToken(sessionSecret, claims);

    // Set cookie security based on environment
    const cookie = cookieSerialize("ilf_session", token, {
      httpOnly: true,
      secure: !isDev,
      sameSite: "Lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    // Safe redirect logic
    let safeNext = "/";
    if (typeof next === "string" && next.startsWith("/") && !next.startsWith("//")) {
      safeNext = next;
    } else if (campaign) {
      safeNext = `/unlocked/${encodeURIComponent(campaign)}`;
    }

    const res = NextResponse.json({ ok: true, next: safeNext });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
