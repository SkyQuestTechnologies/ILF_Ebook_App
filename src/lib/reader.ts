// lib/reader.ts — self-contained reader auth (no @/lib/session dependency)
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const READER_COOKIE = "ilf_session";

export type ReaderClaims = {
  sub: string; email: string; name: string;
  role: "reader"; iat: number; exp: number;
};

async function getSecret(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const s = (env as { ILF_SESSION_SECRET?: string }).ILF_SESSION_SECRET;
    if (s) return s;
  } catch {}
  if (typeof process !== "undefined" && process.env?.ILF_SESSION_SECRET) return process.env.ILF_SESSION_SECRET;
  return "dev-only-reader-secret-change-me";
}

function b64urlFromBytes(bytes: Uint8Array): string {
  let s = ""; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function b64urlFromString(str: string): string { return b64urlFromBytes(new TextEncoder().encode(str)); }
function bytesFromB64url(b64: string): Uint8Array {
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64.replaceAll("-", "+").replaceAll("_", "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function createReaderToken(r: { id: string; email: string; name: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const claims: ReaderClaims = { sub: r.id, email: r.email, name: r.name, role: "reader", iat: now, exp: now + 7 * 24 * 60 * 60 };
  const enc = new TextEncoder();
  const data = `${b64urlFromString(JSON.stringify({ alg: "HS256", typ: "JWT" }))}.${b64urlFromString(JSON.stringify(claims))}`;
  const key = await crypto.subtle.importKey("raw", enc.encode(await getSecret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return `${data}.${b64urlFromBytes(new Uint8Array(sig))}`;
}

export async function verifyReaderToken(token: string): Promise<ReaderClaims | null> {
  if (!token) return null;
  const parts = token.split("."); if (parts.length !== 3) return null;
  const data = `${parts[0]}.${parts[1]}`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(await getSecret()), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const valid = await crypto.subtle.verify("HMAC", key, new Uint8Array(bytesFromB64url(parts[2])), enc.encode(data));
  if (!valid) return null;
  try {
    const claims = JSON.parse(new TextDecoder().decode(bytesFromB64url(parts[1]))) as ReaderClaims;
    const now = Math.floor(Date.now() / 1000);
    if (typeof claims.exp !== "number" || now > claims.exp) return null;
    if (claims.role !== "reader") return null;
    return claims;
  } catch { return null; }
}

export type CookieOptions = { httpOnly?: boolean; secure?: boolean; sameSite?: "Lax" | "Strict" | "None"; path?: string; maxAge?: number };
export function serializeReaderCookie(name: string, value: string, opts: CookieOptions = {}): string {
  const p = [`${name}=${value}`, `Path=${opts.path ?? "/"}`];
  if (opts.maxAge !== undefined) p.push(`Max-Age=${opts.maxAge}`);
  p.push(`SameSite=${opts.sameSite ?? "Lax"}`);
  if (opts.httpOnly !== false) p.push("HttpOnly");
  if (opts.secure !== false) p.push("Secure");
  return p.join("; ");
}
export function clearReaderCookie(name: string): string {
  return `${name}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly; Secure`;
}
