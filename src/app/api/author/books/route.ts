import { NextRequest, NextResponse } from "next/server";
import { getAuthor } from "@/lib/require-author";
import { createBook, slugExists } from "@/lib/db";
import { slugify, parseBookInput } from "@/lib/book-input";


export async function POST(req: NextRequest) {
  const author = await getAuthor();
  if (!author) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseBookInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  // Derive a unique slug from the title.
  const base = slugify(parsed.value.title) || "book";
  let slug = base;
  let n = 1;
  // Bounded retry to avoid an unbounded loop on pathological input.
  while (await slugExists(slug)) {
    n += 1;
    slug = `${base}-${n}`;
    if (n > 50) {
      slug = `${base}-${crypto.randomUUID().slice(0, 8)}`;
      break;
    }
  }

  let bookId: string;
  try {
    bookId = await createBook(author.sub, slug, parsed.value);
  } catch {
    return NextResponse.json({ error: "Could not create book." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug, id: bookId });
}
