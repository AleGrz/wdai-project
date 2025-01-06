import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "10", 10),
    100,
  );
  const skip = (page - 1) * pageSize;

  if (searchParams.get("categoryId")) {
    const category = parseInt(searchParams.get("categoryId") || "1");
    return Response.json(
      await prisma.product.findMany({
        where: { categoryId: category },
        skip: skip,
        take: pageSize,
      }),
    );
  }

  return Response.json(
    await prisma.product.findMany({
      skip: skip,
      take: pageSize,
    }),
  );
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (data.name === undefined) {
    return Response.json({ message: "No name provided!" }, { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" },
      { status: 400 },
    );
  } else if (data.brand === undefined) {
    return Response.json({ message: "No brand provided!" }, { status: 400 });
  } else if (typeof data.brand !== "string") {
    return Response.json(
      { message: "Brand type must be a string!" },
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
  } else if (data.price === undefined) {
    return Response.json({ message: "No price provided!" }, { status: 400 });
  } else if (typeof data.price !== "number") {
    return Response.json(
      { message: "Price type must be a number!" },
      { status: 400 },
    );
  } else if (data.inStock === undefined) {
    return Response.json({ message: "No inStock provided!" }, { status: 400 });
  } else if (typeof data.inStock !== "number") {
    return Response.json(
      { message: "InStock type must be a number!" },
      { status: 400 },
    );
  } else if (data.categoryId === undefined) {
    return Response.json(
      { message: "No categoryId provided!" },
      { status: 400 },
    );
  } else if (typeof data.categoryId !== "string") {
    return Response.json(
      { message: "CategoryId type must be a string!" },
      { status: 400 },
    );
  } else if (
    !(await prisma.category.findFirst({ where: { id: data.categoryId } }))
  ) {
    return Response.json({ message: "Category not found!" }, { status: 404 });
  }
  await prisma.product.create({
    data: {
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: data.price,
      inStock: data.inStock,
      categoryId: data.categoryId,
    },
  });

  return Response.json(
    { message: "Successfully added new product." },
    { status: 201 },
  );
}
