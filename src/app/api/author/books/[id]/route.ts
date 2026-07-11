import { NextRequest, NextResponse } from "next/server";
import { getAuthor } from "@/lib/require-author";
import { getBookById, updateBook, deleteBook } from "@/lib/db";
import { parseBookInput } from "@/lib/book-input";

export const runtime = "edge";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const author = await getAuthor();
  if (!author) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;

  // Ownership check before any mutation.
  const existing = await getBookById(id);
  if (!existing || existing.author_id !== author.sub) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseBookInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const ok = await updateBook(id, author.sub, parsed.value);
  if (!ok) {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, slug: existing.slug });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const author = await getAuthor();
  if (!author) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;

  const existing = await getBookById(id);
  if (!existing || existing.author_id !== author.sub) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const ok = await deleteBook(id, author.sub);
  if (!ok) {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
