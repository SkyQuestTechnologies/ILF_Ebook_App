// lib/session.ts
// Minimal session utilities for Edge runtime (Cloudflare Workers, Next.js App Router)
// No Node APIs, no dependencies. All browser-compatible.

// 1) SessionClaims type
export type SessionClaims = {
  sub: string;
  email: string;
  unlocked: string[];
  iat: number;
  exp: number;
};

// 2) getSessionSecret()
// Returns the secret used to sign tokens.
// Throws if not set in production, but only when called (not at import time).
export function getSessionSecret(): string {
  let secret: string | undefined = undefined;
  if (typeof process !== "undefined" && process.env && process.env.ILF_SESSION_SECRET) {
    secret = process.env.ILF_SESSION_SECRET;
  } else if (typeof globalThis !== "undefined" && (globalThis as any).ILF_SESSION_SECRET) {
    secret = (globalThis as any).ILF_SESSION_SECRET;
  } else if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "development") {
    secret = "dev-only-secret-change-me";
  }
  if (!secret) {
    throw new Error("ILF_SESSION_SECRET must be set in production");
  }
  return secret;
}

// 7) Utilities: base64url encode/decode (browser-compatible)
function base64urlEncode(input: Uint8Array): string {
  let str = "";
  for (let i = 0; i < input.length; ++i) str += String.fromCharCode(input[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(input: string): Uint8Array {
  // Pad to multiple of 4
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; ++i) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

// 3) createSessionToken(secret, claims)
export async function createSessionToken(
  secret: string,
  claims: SessionClaims
): Promise<string> {
  const enc = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = base64urlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64urlEncode(enc.encode(JSON.stringify(claims)));
  const data = `${headerB64}.${payloadB64}`;
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  const sigB64 = base64urlEncode(new Uint8Array(sig));
  return `${data}.${sigB64}`;
}

// 4) verifySessionToken(secret, token)
export async function verifySessionToken(
  secret: string,
  token: string
): Promise<SessionClaims | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;
  const data = `${headerB64}.${payloadB64}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const sigDecoded = base64urlDecode(sigB64);
  // Ensure sig is a Uint8Array backed by ArrayBuffer, not ArrayBufferLike
  const sig = new Uint8Array(sigDecoded); // This guarantees ArrayBuffer backing
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sig,
    enc.encode(data)
  );
  if (!valid) return null;
  try {
    const payloadJson = new TextDecoder().decode(base64urlDecode(payloadB64));
    const claims: SessionClaims = JSON.parse(payloadJson);
    const now = Math.floor(Date.now() / 1000);
    if (typeof claims.exp !== "number" || now > claims.exp) return null;
    return claims;
  } catch {
    return null;
  }
}

// 5) cookieSerialize(name, value, options)

// 5) cookieSerialize(name, value, options)

export type CookieOptions = {
  httpOnly?: boolean; // default true
  secure?: boolean;   // default true
  sameSite?: "Lax" | "Strict" | "None";
  path?: string;      // default "/"
  maxAge?: number;
};

export function cookieSerialize(
  name: string,
  value: string,
  opts: CookieOptions = {}
): string {
  const parts: string[] = [];

  parts.push(`${name}=${encodeURIComponent(value)}`);
  parts.push(`Path=${opts.path ?? "/"}`);

  if (opts.maxAge != null) parts.push(`Max-Age=${opts.maxAge}`);

  // Default SameSite=Lax unless explicitly set
  parts.push(`SameSite=${opts.sameSite ?? "Lax"}`);

  // Default to secure cookie flags ON (typical auth cookie)
  if (opts.httpOnly ?? true) parts.push("HttpOnly");
  if (opts.secure ?? true) parts.push("Secure");

  return parts.join("; ");
}

// 6) cookieClear(name)
export function cookieClear(name: string): string {
  // Standard clear: expires immediately, path=/, secure, samesite=lax, httponly
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly; Secure`;
}

// (Secret validation now happens only when getSessionSecret() is called, not at import time)