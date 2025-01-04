import type { NextRequest } from "next/server";

import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).categoryId;
  const category = await prisma.category.findUnique({ where: { id: id } });

  if (!category) {
    return Response.json({ message: "Category not found!" }, { status: 404 });
  }

  return Response.json(category);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const id = (await params).categoryId;

  if (data.name === undefined) {
    return Response.json({ message: "No name provided!" }, { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" },
      { status: 400 },
    );
  } else if (data.parentCategoryId !== undefined) {
    if (typeof data.parentCategoryId !== "string") {
      return Response.json(
        { message: "ParentCategoryId type must be a string!" },
        { status: 400 },
      );
    }
    if (
      !(await prisma.category.findFirst({
        where: { id: data.parentCategoryId },
      }))
    ) {
      return Response.json(
        { message: "Parent category not found!" },
        { status: 404 },
      );
    }
  }
  try {
    await prisma.category.update({
      where: { id: id },
      data: {
        name: data.name,
        parentCategoryId: data.parentCategoryId,
      },
    });

    return Response.json(
      { message: "Successfully updated the category." },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json({ message: "Category not found!" }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).categoryId;

  try {
    await prisma.category.delete({ where: { id: id } });

    return Response.json(
      { message: "Successfully deleted the category." },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json({ message: "Category not found!" }, { status: 404 });
    }
    throw error;
  }
}
