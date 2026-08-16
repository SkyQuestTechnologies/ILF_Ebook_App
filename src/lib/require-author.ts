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
  // Local dev/preview convenience only. Activates ONLY when DEV_AUTH_BYPASS=1 is
  // present in the environment (via .dev.vars locally). It is never set in
  // production — .dev.vars is gitignored and the flag is absent from wrangler.jsonc,
  // so deployed environments always fall through to real cookie auth below.
  try {
    const { env } = await getCloudflareContext({ async: true });
    if ((env as { DEV_AUTH_BYPASS?: string }).DEV_AUTH_BYPASS === "1") return true;
  } catch {
    // getCloudflareContext unavailable — treat as no bypass.
  }
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
