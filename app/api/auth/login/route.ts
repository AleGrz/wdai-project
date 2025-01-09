import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (data.email === undefined) {
    return Response.json({ message: "No email provided!" }, { status: 400 });
  } else if (typeof data.email !== "string") {
    return Response.json(
      { message: "Email type must be a string!" },
      { status: 400 },
    );
  } else if (data.password === undefined) {
    return Response.json({ message: "No password provided!" }, { status: 400 });
  } else if (typeof data.password !== "string") {
    return Response.json(
      { message: "Password type must be a string!" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return Response.json(
      { message: "Invalid email or password!" },
      { status: 401 },
    );
  }
  if (!(await bcrypt.compare(data.password, user.password))) {
    return Response.json(
      { message: "Invalid email or password!" },
      { status: 401 },
    );
  }
  const accessToken = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

  const refreshToken = await new jose.SignJWT({ userId: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET as string));

  return Response.json(
    {
      accessToken: accessToken,
      refreshToken: refreshToken
    },
    { status: 200 },
  );
}
