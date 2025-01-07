import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";
import * as jose from "jose";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (data.refreshToken === undefined) {
    return Response.json(
      { message: "No refresh token provided!" },
      { status: 400 },
    );
  } else if (typeof data.refreshToken !== "string") {
    return Response.json(
      { message: "Refresh token type must be a string!" },
      { status: 400 },
    );
  }

  try {
    const decoded = await jose.jwtVerify(
      data.refreshToken,
      new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)
    );

    const user = await prisma.user.findUnique({
      where: { id: parseInt(decoded.payload.userId as string) },
    });

    if (!user) {
      return Response.json(
        { message: "Invalid refresh token!" },
        { status: 401 },
      );
    }

    const newToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const newRefreshToken = await new jose.SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET));

    return Response.json(
      {
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: 3600,
      },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { message: "Invalid refresh token!" },
      { status: 401 },
    );
  }
}
