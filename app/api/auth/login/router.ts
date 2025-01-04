import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const token = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );

  return Response.json(
    {
      refreshToken: refreshToken,
      token: token,
      expiresIn: 3600,
    },
    { status: 200 },
  );
}
