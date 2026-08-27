import { NextRequest, NextResponse } from "next/server";
import { getBookForDownload, getBucket } from "@/lib/db";
import { verifyReaderToken } from "@/lib/reader";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Reader must be logged in with a valid signed token.
  const token = req.cookies.get("ilf_session")?.value;
  const reader = token ? await verifyReaderToken(token) : null;
  if (!reader) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", "/library");
    loginUrl.searchParams.set("download", slug);
    return NextResponse.redirect(loginUrl);
  }

  const book = await getBookForDownload(slug);
  if (!book || book.status !== "published") {
    const url = new URL("/library", req.url);
    url.searchParams.set("error", "not-found");
    return NextResponse.redirect(url);
  }

  if (!book.free) {
    return NextResponse.redirect(new URL(`/paywall/${slug}`, req.url));
  }

  if (!book.pdf_key) {
    const url = new URL("/library", req.url);
    url.searchParams.set("error", "no-file");
    return NextResponse.redirect(url);
  }

  const bucket = await getBucket();
  const obj = await bucket.get(book.pdf_key);
  if (!obj) {
    const url = new URL("/library", req.url);
    url.searchParams.set("error", "no-file");
    return NextResponse.redirect(url);
  }

  const safeName = book.title.replace(/[^a-z0-9\-_ ]/gi, "").trim() || slug;
  return new NextResponse(obj.body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeName}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
