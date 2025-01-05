import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

async function handleRequest(
  request: NextRequest,
  message: string,
  url: string,
) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return Response.json({ message: message }, { status: 401 });
  }

  return NextResponse.redirect(new URL(url, request.url));
}

export async function middleware(request: NextRequest) {
  // const token = request.headers.get("Authorization")?.split(" ")[1];

  // if (!token) {
  //   return handleRequest(request, "No token provided!", "/home");
  // }
  // const response = await fetch(`${request.nextUrl.origin}/api/auth`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ token }),
  // });

  // if (!response.ok) {
  //   return handleRequest(request, "Invalid token!", "/home");
  // }

  // const authData = await response.json();

  // if (!authData.isAdmin) {
  //   return handleRequest(request, "You are not an admin!", "/home");
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/user/:path*",
};
