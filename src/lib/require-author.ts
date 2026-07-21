// lib/require-author.ts
import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyAuthorToken, AUTHOR_COOKIE, type AuthorClaims } from "@/lib/author";

const DEV_AUTHOR: AuthorClaims = {
  sub: "dev-author-0000",
  email: "dev@local.test",
  name: "Dev Author",
  role: "author",
  unlocked: [],
  iat: 0,
  exp: 0,
};

async function bypassEnabled(): Promise<boolean> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    if ((env as { DEV_AUTH_BYPASS?: string }).DEV_AUTH_BYPASS === "1") return true;
  } catch {}
  if (typeof process !== "undefined" && process.env?.DEV_AUTH_BYPASS === "1") return true;
  return false;
}

export async function getAuthor(): Promise<AuthorClaims | null> {
  if (await bypassEnabled()) return DEV_AUTHOR;
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTHOR_COOKIE)?.value;
  if (!token) return null;
  return verifyAuthorToken(token);
}
