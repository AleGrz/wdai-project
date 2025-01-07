import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

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

  return new Response(JSON.stringify({ message: "Order details added successfully!" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}