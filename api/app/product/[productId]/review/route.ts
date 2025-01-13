import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const productId = parseInt((await params).productId);

  if (isNaN(productId) || productId < 1) {
    return Response.json(
      { message: "Invalid product id!" } as MessageResponse,
      { status: 400 }
    );
  }
  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product) {
    return Response.json(
      { message: "Product not found!" } as MessageResponse,
      { status: 404 });
  }

  return Response.json(
    await prisma.review.findMany({
      where: { productId: productId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        }
      },
    })
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const productId = parseInt((await params).productId);

  if (isNaN(productId) || productId < 1) {
    return Response.json(
      { message: "Invalid product id!" } as MessageResponse,
      { status: 400 }
    );
  }

  if (data.userId === undefined) {
    return Response.json({ message: "No userId provided!" }, { status: 400 });
  } else if (typeof data.userId !== "number") {
    return Response.json(
      { message: "UserId must be a number!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.rating === undefined) {
    return Response.json({ message: "No rating provided!" }, { status: 400 });
  } else if (typeof data.rating !== "number") {
    return Response.json(
      { message: "Rating must be a number!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.description === undefined) {
    return Response.json(
      { message: "No description provided!" } as MessageResponse,
      { status: 400 },
    );
  } else if (typeof data.description !== "string") {
    return Response.json(
      { message: "Description type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (!(await prisma.user.findFirst({ where: { id: data.userId } }))) {
    return Response.json(
      { message: "User not found!" } as MessageResponse,
      { status: 404 });
  } else if (!(await prisma.product.findFirst({ where: { id: productId } }))) {
    return Response.json(
      { message: "Product not found!" } as MessageResponse,
      { status: 404 });
  } else if (await prisma.review.findFirst({ where: { userId: data.userId, productId: productId } })) {
    return Response.json(
      { message: "User has already reviewed this product!" } as MessageResponse,
      { status: 403 },
    );
  }
  await prisma.review.create({
    data: {
      userId: data.userId,
      productId: productId,
      rating: data.rating,
      description: data.description,
    },
  });

  const { reviewsCount = 0, rating = 0 } = await prisma.product.findFirst({
    where: { id: productId },
    select: { rating: true, reviewsCount: true },
  }) || {};

  await prisma.product.update({
    where: { id: productId },
    data: {
      reviewsCount: reviewsCount + 1,
      rating: (rating * reviewsCount + data.rating) / (reviewsCount + 1)
    }
  });
  
  return Response.json(
    { message: "Successfully added new review." } as MessageResponse,
    { status: 201 },
  );
}
