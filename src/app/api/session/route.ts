
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("ilf_session")?.value;
    const secret = process.env.ILF_SESSION_SECRET || "dev-only-insecure-secret-change-me";
    let claims = null;
    try {
      if (cookie) {
        claims = await verifySessionToken(secret, cookie);
      }
    } catch {
      claims = null;
    }
    if (!claims || !claims.email) {
      return NextResponse.json({ session: null });
    }
    return NextResponse.json({ session: { email: claims.email } });
  } catch {
    return NextResponse.json({ session: null });
  }
}
import { createSessionToken, cookieSerialize } from "@/lib/session";

// DEMO_USERS map for demo user storage
const DEMO_USERS = new Map<
  string,
  { id: string; email: string; created: number }
>();

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // Safe parse and type the body
    const body = (await req.json().catch(() => null)) as { email?: unknown; campaign?: unknown; next?: unknown } | null;
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const campaign = typeof body?.campaign === "string" ? body.campaign : undefined;
    const next = typeof body?.next === "string" ? body.next : undefined;

    // Validate email: non-empty, string, includes @
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Lookup or create user
    let user = DEMO_USERS.get(email);
    if (!user) {
      user = { id: crypto.randomUUID(), email, created: Date.now() };
      DEMO_USERS.set(email, user);
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 7 * 24 * 60 * 60;
    const claims = {
      sub: user.id,
      email: user.email,
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
