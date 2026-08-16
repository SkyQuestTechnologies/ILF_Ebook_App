import { NextRequest, NextResponse } from "next/server";
import { getBookForDownload, getBucket } from "@/lib/db";

function hasValidJwtShape(token?: string): boolean {
  return Boolean(token && token.split(".").length === 3);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Reader must be logged in (unchanged gate). Redirect to login otherwise.
  const token = req.cookies.get("ilf_session")?.value;
  if (!hasValidJwtShape(token)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", "/library");
    loginUrl.searchParams.set("download", slug);
    return NextResponse.redirect(loginUrl);
  }

  const book = await getBookForDownload(slug);
  if (!book || book.status !== "published") {
    return new NextResponse("Not found.", { status: 404 });
  }

  // Paid books are not downloadable in the free-launch scope. (Purchase flow TBD.)
  if (!book.free) {
    return new NextResponse("This title requires purchase.", { status: 402 });
  }

  if (!book.pdf_key) {
    return new NextResponse("No file available for this book yet.", { status: 404 });
  }

  const bucket = await getBucket();
  const obj = await bucket.get(book.pdf_key);
  if (!obj) {
    return new NextResponse("File not found in storage.", { status: 404 });
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
