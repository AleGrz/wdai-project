import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  const prisma = new PrismaClient();

  return Response.json(await prisma.product.findMany());
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (!data.name) {
    return Response.json({ message: "No name provided!" }, { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" },
      { status: 400 },
    );
  } else if (!data.brand) {
    return Response.json({ message: "No brand provided!" }, { status: 400 });
  } else if (typeof data.brand !== "string") {
    return Response.json(
      { message: "Brand type must be a string!" },
      { status: 400 },
    );
  } else if (!data.description) {
    return Response.json(
      { message: "No description provided!" },
      { status: 400 },
    );
  } else if (typeof data.description !== "string") {
    return Response.json(
      { message: "Description type must be a string!" },
      { status: 400 },
    );
  } else if (!data.price) {
    return Response.json({ message: "No price provided!" }, { status: 400 });
  } else if (typeof data.price !== "number") {
    return Response.json(
      { message: "Price type must be a number!" },
      { status: 400 },
    );
  } else if (!data.inStock) {
    return Response.json({ message: "No inStock provided!" }, { status: 400 });
  } else if (typeof data.inStock !== "number") {
    return Response.json(
      { message: "InStock type must be a number!" },
      { status: 400 },
    );
  } else if (!data.categoryId) {
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
    { message: "Successfully added new category." },
    { status: 201 },
  );
}
