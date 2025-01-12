import type { NextRequest } from "next/server";

import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { generateTokens } from "@/app/auth/helper";

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
  } else if (data.firstName === undefined) {
    return Response.json(
      { message: "No first name provided!" },
      { status: 400 },
    );
  } else if (typeof data.firstName !== "string") {
    return Response.json(
      { message: "First name type must be a string!" },
      { status: 400 },
    );
  } else if (data.lastName === undefined) {
    return Response.json(
      { message: "No last name provided!" },
      { status: 400 },
    );
  } else if (typeof data.lastName !== "string") {
    return Response.json(
      { message: "Last name type must be a string!" },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return Response.json(await generateTokens(user), { status: 200 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { message: "Email already exists!" },
        { status: 400 },
      );
    }
    throw error;
  }
}
