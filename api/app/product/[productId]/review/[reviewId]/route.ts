import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string; reviewId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).reviewId;
  
  const review = await prisma.review.findUnique({
    where: { id: id },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      }
    }
  });

  if (!review) {
    return Response.json(
      { message: "Review not found!" } as MessageResponse,
      { status: 404 });
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
  const productId = parseInt((await params).productId);

  if (isNaN(productId) || productId < 1) {
    return Response.json(
      { message: "Invalid product id!" } as MessageResponse,
      { status: 400 }
    );
  }

  if (data.description === undefined) {
    return Response.json(
      { message: "No description provided!" } as MessageResponse,
      { status: 400 },
    );
  } else if (typeof data.description !== "string") {
    return Response.json(
      { message: "Description type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.rating === undefined) {
    return Response.json(
      { message: "No rating provided!" } as MessageResponse,
      { status: 400 }
    );
  } else if (typeof data.rating !== "number") {
    return Response.json(
      { message: "Rating must be a number!" } as MessageResponse,
      { status: 400 },
    );
  } else if (!(await prisma.product.findFirst({ where: { id: productId } }))) {
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
      { message: "Successfully edited the review." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Review not found!" } as MessageResponse,
        { status: 404 }
      );
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string; reviewId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).reviewId;
  
  try {
    await prisma.review.delete({ where: { id: id } });

    return Response.json(
      { message: "Successfully deleted the review." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Review not found!" } as MessageResponse,
        { status: 404 }
      );
    }
    throw error;
  }
}