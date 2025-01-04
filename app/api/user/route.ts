import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(_request: NextRequest) {
  const prisma = new PrismaClient();

  return Response.json(await prisma.user.findMany());
}
