import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function hasValidJwtShape(token?: string): boolean {
  return Boolean(token && token.split(".").length === 3);
}

function createBlankPdf(): Uint8Array {
  const enc = new TextEncoder();
  const hdr = "%PDF-1.4\n";
  const o1 = "1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n";
  const o2 = "2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n";
  const o3 = "3 0 obj\n<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>\nendobj\n";
  const off1 = enc.encode(hdr).length;
  const off2 = off1 + enc.encode(o1).length;
  const off3 = off2 + enc.encode(o2).length;
  const xrefPos = off3 + enc.encode(o3).length;
  const pad = (n: number) => String(n).padStart(10, "0");
  const xref =
    "xref\n0 4\n" +
    "0000000000 65535 f \n" +
    `${pad(off1)} 00000 n \n` +
    `${pad(off2)} 00000 n \n` +
    `${pad(off3)} 00000 n \n` +
    `trailer\n<</Size 4/Root 1 0 R>>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return enc.encode(hdr + o1 + o2 + o3 + xref);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const token = req.cookies.get("ilf_session")?.value;

  if (!hasValidJwtShape(token)) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", "/library");
    loginUrl.searchParams.set("download", slug);

    return NextResponse.redirect(loginUrl);
  }

  const pdf = createBlankPdf();
  return new NextResponse(pdf.buffer as ArrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}