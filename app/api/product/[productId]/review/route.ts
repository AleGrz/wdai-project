import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
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

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "10", 10),
    100,
  );
  
  if (isNaN(page) || page < 1) {
    return Response.json(
      { message: "Invalid page number!" } as MessageResponse,
      { status: 400 }
    );
  }
  if (isNaN(pageSize) || pageSize < 1) {
    return Response.json(
      { message: "Invalid page size!" } as MessageResponse,
      { status: 400 }
    );
  }
  const skip = (page - 1) * pageSize;

  return Response.json(
    await prisma.review.findMany({
      skip: skip,
      take: pageSize,
      where: { productId: productId },
      include: {
        user: true,
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
  } else if (typeof data.userId !== "string") {
    return Response.json(
      { message: "UserId must be a string!" } as MessageResponse,
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
  }
  await prisma.review.create({
    data: {
      userId: data.userId,
      productId: productId,
      rating: data.rating,
      description: data.description,
    },
  });

  return Response.json(
    { message: "Successfully added new review." } as MessageResponse,
    { status: 201 },
  );
}
