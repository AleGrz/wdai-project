import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = parseInt((await params).userId);

  if (isNaN(id) || id < 1) {
    return Response.json(
      { message: "Invalid user id!" } as MessageResponse,
      { status: 400 }
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      isAdmin: true,
    },
  });

  if (!user) {
    return Response.json(
      { message: "User not found!" } as MessageResponse,
      { status: 404 }
    );
  }

  return Response.json(user);
}
