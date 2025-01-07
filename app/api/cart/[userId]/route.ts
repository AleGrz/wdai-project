import { PrismaClient } from "@prisma/client";
import { OrderDetail } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).userId;
  const cart = await prisma.order.findFirst({
    where: { userId: parseInt(id), orderDate: null },
    include: { orderDetails: true },
  });

  if (!cart) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  return Response.json(cart);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).userId;
  const body = await request.json();

  const cart = await prisma.order.findFirst({ where: { userId: parseInt(id), orderDate: null}, include: { orderDetails: true } });

  if (!cart) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  const orderDetails = body.orderDetails.map((detail: OrderDetail) => {
    return {
      productId: detail.productId,
      orderId: cart.id,
    };
  });

  await prisma.orderDetail.create({ data: orderDetails });

  return Response.json({ message: "Order details added successfully!" });
}