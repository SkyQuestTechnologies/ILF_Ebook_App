import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	// Clear the session cookie
	const res = new NextResponse(null, { status: 204 });
	res.cookies.set({ name: "session", value: "", path: "/", maxAge: 0 });
	return res;
}
