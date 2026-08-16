import { NextRequest, NextResponse } from "next/server";
import { getAuthor } from "@/lib/require-author";
import { getBookById, getBucket, setBookPdfKey } from "@/lib/db";

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  const author = await getAuthor();
  if (!author) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data." }, { status: 400 });
  }

  const bookId = form.get("bookId");
  const file = form.get("file");

  if (typeof bookId !== "string" || !bookId) {
    return NextResponse.json({ error: "Missing bookId." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 50 MB)." }, { status: 400 });
  }

  // Ownership: the book must belong to this author.
  const book = await getBookById(bookId);
  if (!book || book.author_id !== author.sub) {
    return NextResponse.json({ error: "Book not found." }, { status: 404 });
  }

  const key = `books/${bookId}.pdf`;
  try {
    const bucket = await getBucket();
    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: "application/pdf" },
    });
    await setBookPdfKey(bookId, author.sub, key);
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pdfKey: key });
}
