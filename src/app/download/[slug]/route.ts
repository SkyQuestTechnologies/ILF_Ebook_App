import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export async function GET(req: NextRequest, { params }) {
  const cookie = req.cookies.get("session")?.value;
  const session = await verifySession(cookie || "");
  if (!session) {
    return NextResponse.redirect(`/login?next=/download/${params.slug}`);
  }
  // Path to the sample PDF in the public folder
  const filePath = join(process.cwd(), "public", "demo", "sample-ebook.pdf");
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="sample-ebook.pdf"',
      },
    });
  } catch (e) {
    return new NextResponse("File not found", { status: 404 });
  }
}
