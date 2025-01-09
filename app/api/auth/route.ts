import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (!data.accessToken) {
    return Response.json({ message: "Token is required" }, { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(
      data.accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
    );
    const user = await prisma.user.findUnique({
      where: { id: parseInt(payload.userId as string) },
    });

    return Response.json({
      userFound: user !== undefined,
      id: user?.id,
      isAdmin: user?.isAdmin || false,
    });
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 400 });
  }
}
