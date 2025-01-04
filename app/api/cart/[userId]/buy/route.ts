import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> },
  ) {
    const prisma = new PrismaClient();
    const id = (await params).userId;
  
    await prisma.order.updateMany({ where: { userId: id, orderDate: null}, data: { orderDate: new Date() } });

  return Response.json({ message: "Order details added successfully!" });
}