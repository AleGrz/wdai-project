import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const path = request.nextUrl.pathname;
  const response = await fetch(`${request.nextUrl.origin}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if ((path.startsWith("/cart") || path.startsWith("/api")) && !response.ok) {
    return NextResponse.redirect("/login");
  }

  const data = await response.json();
  const user = data.user;

  if (path.startsWith("/cart/") && !path.endsWith(user.id)) {
    return NextResponse.redirect(`/cart/${user.id}`);
  }

  if (path in ["/api/cart/", "/signup"] && user) {
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/user/:path*",
};
