import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

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
    const decoded = jwt.verify(
      data.refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return Response.json(
        { message: "Invalid refresh token!" },
        { status: 401 },
      );
    }

    const newToken = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" },
    );

    return Response.json(
      {
        refreshToken: newRefreshToken,
        token: newToken,
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
