import { NextResponse } from "next/server";

export async function GET() {
  const content = "This is your free ebook content. Thank you for claiming your copy!";
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": 'attachment; filename="free-ebook.txt"',
    },
  });
}
