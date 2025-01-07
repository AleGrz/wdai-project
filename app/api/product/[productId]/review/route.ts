import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const productId = (await params).productId;
  const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

  if (!product) {
    return Response.json({ message: "Product not found!" }, { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "10", 10),
    100,
  );
  
  const skip = (page - 1) * pageSize;

  return Response.json(
    await prisma.review.findMany({
      skip: skip,
      take: pageSize,
      where: { productId: parseInt(productId) },
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
  const productId = (await params).productId;

  if (data.userId === undefined) {
    return Response.json({ message: "No userId provided!" }, { status: 400 });
  } else if (typeof data.userId !== "string") {
    return Response.json(
      { message: "UserId must be a string!" },
      { status: 400 },
    );
  } else if (data.rating === undefined) {
    return Response.json({ message: "No rating provided!" }, { status: 400 });
  } else if (typeof data.rating !== "number") {
    return Response.json(
      { message: "Rating must be a number!" },
      { status: 400 },
    );
  } else if (data.description === undefined) {
    return Response.json(
      { message: "No description provided!" },
      { status: 400 },
    );
  } else if (typeof data.description !== "string") {
    return Response.json(
      { message: "Description type must be a string!" },
      { status: 400 },
    );
  } else if (!(await prisma.user.findFirst({ where: { id: data.userId } }))) {
    return Response.json({ message: "User not found!" }, { status: 404 });
  } else if (!(await prisma.product.findFirst({ where: { id: parseInt(productId) } }))) {
    return Response.json({ message: "Product not found!" }, { status: 404 });
  }
  await prisma.review.create({
    data: {
      userId: data.userId,
      productId: parseInt(productId),
      rating: data.rating,
      description: data.description,
    },
  });

  return Response.json(
    { message: "Successfully added new review." },
    { status: 201 },
  );
}
