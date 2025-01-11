import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

import { decodeToken, generateTokens } from "@/app/api/auth/helper";

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
  const userId = await decodeToken(data.refreshToken);

  if (userId === null) {
    return Response.json(
      { message: "Invalid refresh token!" },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return Response.json(
      { message: "Invalid refresh token!" },
      { status: 401 },
    );
  }

  return Response.json(await generateTokens(user), { status: 200 });
}
