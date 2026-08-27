import { NextRequest, NextResponse } from "next/server";
import { verifyReaderToken } from "@/lib/reader";
import { verifyAuthorToken } from "@/lib/author";

export async function GET(req: NextRequest) {
  try {
    const authorToken = req.cookies.get("ilf_author")?.value;
    const author = authorToken ? await verifyAuthorToken(authorToken) : null;
    if (author?.email) {
      return NextResponse.json({
        session: { role: "author", email: author.email, name: author.name },
      });
    }

    const readerToken = req.cookies.get("ilf_session")?.value;
    const reader = readerToken ? await verifyReaderToken(readerToken) : null;
    if (reader?.email) {
      return NextResponse.json({
        session: { role: "reader", email: reader.email, name: reader.name },
      });
    }

    return NextResponse.json({ session: null });
  } catch {
    return NextResponse.json({ session: null });
  }
}
