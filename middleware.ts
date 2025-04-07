import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add the real IP to the request headers if it's available
  const ip =
    request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for");

  if (ip) {
    requestHeaders.set("x-real-ip", ip);
  }

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Apply this middleware to API routes
    "/api/:path*",
  ],
};
