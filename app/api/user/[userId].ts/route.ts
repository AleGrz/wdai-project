import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).userId;
  const user = await prisma.user.findUnique({ where: { id: id } });

  if (!user) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  return Response.json({id: user.id, firstName: user.firstName, lastName: user.lastName});
}
