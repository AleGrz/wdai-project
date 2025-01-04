import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import * as jose from "jose";
import { PrismaClient } from "@prisma/client";

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
  const prisma = new PrismaClient();
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return handleRequest(request, "No token provided!", "/home");
  }

  try {
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    const user = await prisma.user.findUnique({
      where: { id: decoded.payload.userId as string },
    });

    if (!user?.isAdmin || false) {
      return handleRequest(request, "You are not an admin!", "/home");
    }
  } catch(error) {
    console.log(error)
    return handleRequest(request, "Invalid token!", "/home");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/user/:path*",
};
