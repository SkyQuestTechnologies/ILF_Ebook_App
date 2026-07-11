// lib/require-author.ts
// Server-side helper: read + verify the author cookie. Returns claims or null.
// Used by server components (pages) and route handlers alike.

import { cookies } from "next/headers";
import { verifyAuthorToken, AUTHOR_COOKIE, type AuthorClaims } from "@/lib/author";

export async function getAuthor(): Promise<AuthorClaims | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTHOR_COOKIE)?.value;
  if (!token) return null;
  return verifyAuthorToken(token);
}
