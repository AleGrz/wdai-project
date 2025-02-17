import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { generateTokens } from "@/app/auth/helper";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (data.email === undefined) {
    return Response.json({ message: "No email provided!" }, { status: 400 });
  } else if (typeof data.email !== "string") {
    return Response.json(
      { message: "Email type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.password === undefined) {
    return Response.json({ message: "No password provided!" }, { status: 400 });
  } else if (typeof data.password !== "string") {
    return Response.json(
      { message: "Password type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    return Response.json(
      { message: "User not found!" } as MessageResponse,
      { status: 401 },
    );
  }
  if (!(await bcrypt.compare(data.password, user.password))) {
    return Response.json(
      { message: "Invalid password!" } as MessageResponse,
      { status: 401 },
    );
  }
  
  return Response.json(await generateTokens(user), { status: 200 });
}