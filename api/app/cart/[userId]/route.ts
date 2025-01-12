import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
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
  if (await prisma.user.findFirst({ where: { id: id } }) === null) {
    return Response.json(
      { message: "User not found!" } as MessageResponse,
      { status: 404 }
    );
  }
  let cart = await prisma.order.findFirst({
    where: {
      userId: id,
      orderDate: null
    },
    include: {
      orderDetails: {
        include: {
          product: true
  }}}});

  if (!cart) {
    cart = await prisma.order.create({
      data: {
        userId: id
      },
        include: {
          orderDetails: {
            include: {
              product: true
    }}}});
  }
  
  return Response.json(cart);
}

export async function POST(
  request: NextRequest,
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
  const body = await request.json();

  if (await prisma.user.findFirst({ where: { id: parseInt((await params).userId) } }) === null) {
    return Response.json(
      { message: "User not found!" } as MessageResponse,
      { status: 404 }
    );
  }

  let cart = await prisma.order.findFirst({ where: { userId: id, orderDate: null}, include: { orderDetails: true } });

  if (!cart) {
    cart = await prisma.order.create({ data: { userId: id }, include: { orderDetails: true } });
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

  return Response.json(
    { message: "Order details added successfully!" } as MessageResponse,
    { status: 201 }
  );
}

export async function DELETE(
  _request: NextRequest,
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


  const cart = await prisma.order.findFirst({ where: { userId: id, orderDate: null }, include: { orderDetails: true } });

  if (!cart) {
    return Response.json(
      { message: "Cart not found!" } as MessageResponse,
      { status: 404 }
    );
  }

  await prisma.orderDetail.deleteMany({ where: { orderId: cart.id } });

  return Response.json(
    { message: "Cart deleted successfully!" } as MessageResponse,
    { status: 200 }
  );
}