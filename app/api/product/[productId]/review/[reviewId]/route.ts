import type { NextRequest } from "next/server";

import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string; reviewId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).reviewId;
  const review = await prisma.review.findUnique({ where: { id: id } });

  if (!review) {
    return Response.json({ message: "Review not found!" }, { status: 404 });
  }

  return Response.json(review);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string; reviewId: string }> },
) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const id = (await params).reviewId;
  const productId = (await params).productId;

  if (data.description === undefined) {
    return Response.json(
      { message: "No description provided!" },
      { status: 400 },
    );
  } else if (typeof data.description !== "string") {
    return Response.json(
      { message: "Description type must be a string!" },
      { status: 400 },
    );
  } else if (data.rating === undefined) {
    return Response.json({ message: "No rating provided!" }, { status: 400 });
  } else if (typeof data.rating !== "number") {
    return Response.json(
      { message: "Rating must be a number!" },
      { status: 400 },
    );
  } else if (!(await prisma.product.findFirst({ where: { id: parseInt(productId) } }))) {
    return Response.json({ message: "Product not found!" }, { status: 404 });
  }
  try {
    await prisma.review.update({
      where: { id: id },
      data: {
        rating: data.rating,
        description: data.description,
      },
    });

    return Response.json(
      { message: "Successfully edited the review." },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json({ message: "Review not found!" }, { status: 404 });
    }
    throw error;
  }
}
