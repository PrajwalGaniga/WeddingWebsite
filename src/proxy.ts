import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // When a guest visits a domain containing "gaywin" (e.g. gaywin-neslin.vercel.app)
  // rewrite the root path '/' to serve the Groom's invitation card behind the scenes.
  // The browser address bar stays clean as https://gaywin-neslin.vercel.app/
  if (host.toLowerCase().includes("gaywin") && pathname === "/") {
    return NextResponse.rewrite(new URL("/groom", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
