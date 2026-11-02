import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() || "";
  const { pathname } = request.nextUrl;

  // The groom domain starts with "gaywin" (e.g. gaywin-neslin.vercel.app)
  // whereas the bride domain starts with "neslin" (e.g. neslin-gaywin.vercel.app)
  const isGroomDomain = host.startsWith("gaywin") || host.includes("gaywin-neslin");

  if (isGroomDomain && pathname === "/") {
    return NextResponse.rewrite(new URL("/groom", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
