import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function POST(_request: NextRequest,
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

  await prisma.order.updateMany({
    where: { userId: id, orderDate: null },
    data: { orderDate: new Date() },
  });

  return Response.json(
    { message: "Order details added successfully!" } as MessageResponse,
    { status: 200 }
  );
}