import { PrismaClient } from "@prisma/client";
import { OrderDetail } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).userId;
  let cart = await prisma.order.findFirst({
    where: { userId: parseInt(id), orderDate: null },
    include: { orderDetails: true },
  });

  if (await prisma.user.findFirst({ where: { id: parseInt((await params).userId) } }) === null) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  if (!cart) {
    cart = await prisma.order.create({ data: { userId: parseInt(id) }, include: { orderDetails: true } });
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

  if (await prisma.user.findFirst({ where: { id: parseInt((await params).userId) } }) === null) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  }

  let cart = await prisma.order.findFirst({ where: { userId: parseInt(id), orderDate: null}, include: { orderDetails: true } });

  if (!cart) {
    cart = await prisma.order.create({ data: { userId: parseInt(id) }, include: { orderDetails: true } });
  }

  if (await prisma.orderDetail.findFirst({ where: { orderId: cart.id, productId: body.productId } }) !== null) {
    await prisma.orderDetail.updateMany({
      where: {orderId: cart.id, productId: body.productId },
      data: { quantity: { increment: body.quantity } },
      });
  } else {
  await prisma.orderDetail.create({
    data: {
      orderId: cart.id,
      productId: body.productId,
      quantity: body.quantity,
    },
  });
  }
  return Response.json({ message: "Order details added successfully!" });
}