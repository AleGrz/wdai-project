import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "10", 10),
    100,
  );

  if (isNaN(page) || page < 1) {
    return Response.json(
      { message: "Invalid page number!" } as MessageResponse,
      { status: 400 }
    );
  }
  if (isNaN(pageSize) || pageSize < 1) {
    return Response.json(
      { message: "Invalid page size!" } as MessageResponse,
      { status: 400 }
    );
  }
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
  });

  return Response.json(users);
}
