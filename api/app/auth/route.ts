import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

import { decodeToken } from "@/app/auth/helper";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (!data.accessToken) {
    return Response.json(
      { message: "Token is required" } as MessageResponse,
      { status: 400 }
    );
  }
  const userId = await decodeToken(data.accessToken);

  if (userId === null) {
    return Response.json(
      { message: "Invalid token" } as MessageResponse,
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user === null)
    return Response.json(
      { message: "User not found" } as MessageResponse, 
      { status: 404 }
    );

  return Response.json(user);
}
