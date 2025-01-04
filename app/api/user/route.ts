import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  const prisma = new PrismaClient();

  return Response.json(await prisma.user.findMany());
}
