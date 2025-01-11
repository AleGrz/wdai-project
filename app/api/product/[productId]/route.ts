import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).productId;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });

  if (!product) {
    return Response.json(
      { message: "Product not found!" } as MessageResponse,
      { status: 404 }
    );
  }

  return Response.json(product);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const id = (await params).productId;

  if (data.name === undefined) {
    return Response.json({ message: "No name provided!" }, { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.brand === undefined) {
    return Response.json({ message: "No brand provided!" }, { status: 400 });
  } else if (typeof data.brand !== "string") {
    return Response.json(
      { message: "Brand type must be a string!" } as MessageResponse,
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
  } else if (data.price === undefined) {
    return Response.json(
      { message: "No price provided!" } as MessageResponse,
      { status: 400 }
    );
  } else if (typeof data.price !== "number") {
    return Response.json(
      { message: "Price type must be a number!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.inStock === undefined) {
    return Response.json({ message: "No inStock provided!" }, { status: 400 });
  } else if (typeof data.inStock !== "number") {
    return Response.json(
      { message: "InStock type must be a number!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.categoryId === undefined) {
    return Response.json(
      { message: "No categoryId provided!" } as MessageResponse,
      { status: 400 },
    );
  } else if (typeof data.categoryId !== "string") {
    return Response.json(
      { message: "CategoryId type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (
    !(await prisma.category.findFirst({ where: { id: data.categoryId } }))
  ) {
    return Response.json(
      { message: "Category not found!" } as MessageResponse,
      { status: 404 }
    );
  }
  try {
    await prisma.product.update({
      where: { id: parseInt(id) },
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
      { message: "Successfully edited the product." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Product not found!" } as MessageResponse,
        { status: 404 }
      );
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).productId;

  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });

    return Response.json(
      { message: "Successfully deleted the product." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Product not found!" } as MessageResponse,
        { status: 404 }
      );
    } else if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003" &&
      error.meta?.field_name === "categoryId"
    ) {
      return Response.json(
        { message: "Invalid categoryId!" } as MessageResponse,
        { status: 400 }
      );
    }
    throw error;
  }
}
