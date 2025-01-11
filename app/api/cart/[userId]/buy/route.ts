import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function POST(_request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const { userId } = await params;
  const id = userId;

  await prisma.order.updateMany({
    where: { userId: parseInt(id), orderDate: null },
    data: { orderDate: new Date() },
  });

  return Response.json(
    { message: "Order details added successfully!" } as MessageResponse,
    { status: 200 }
  );
}