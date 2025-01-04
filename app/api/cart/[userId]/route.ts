import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).userId;
  const cart = await prisma.order.findFirst({ where: { userId: id, orderDate: null}, include: { orderDetails: true } });

  if (!cart) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  return Response.json(cart);
}
