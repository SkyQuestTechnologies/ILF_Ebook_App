// lib/author.ts
// Author-side session helpers. Reuses the HS256 JWT machinery from lib/session.ts
// but issues tokens carrying role="author" and stores them in a distinct cookie
// (ilf_author) so reader and author sessions never collide.

import { createSessionToken, verifySessionToken, getSessionSecret } from "@/lib/session";

export const AUTHOR_COOKIE = "ilf_author";

export type AuthorClaims = {
  sub: string;      // author id
  email: string;
  name: string;
  role: "author";
  unlocked: string[]; // unused for authors; kept for SessionClaims shape
  iat: number;
  exp: number;
};

export async function createAuthorToken(author: {
  id: string;
  email: string;
  name: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    sub: author.id,
    email: author.email,
    name: author.name,
    role: "author" as const,
    unlocked: [],
    iat: now,
    exp: now + 7 * 24 * 60 * 60,
  };
  // createSessionToken signs the whole claims object; extra fields survive round-trip.
  return createSessionToken(getSessionSecret(), claims as unknown as never);
}

export async function verifyAuthorToken(token: string): Promise<AuthorClaims | null> {
  const claims = (await verifySessionToken(getSessionSecret(), token)) as
    | (AuthorClaims & Record<string, unknown>)
    | null;
  if (!claims || claims.role !== "author") return null;
  return claims;
}
