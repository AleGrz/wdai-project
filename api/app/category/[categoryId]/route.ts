import type { NextRequest } from "next/server";
import type { MessageResponse } from "@/types";

import { PrismaClient, Prisma, Category } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const id = parseInt((await params).categoryId);

  if (isNaN(id) || id < 1) {
    return Response.json(
      { message: "Invalid category id!" } as MessageResponse,
      { status: 400 }
    );
  }
  const category = await prisma.category.findFirst({
    where: { id: id },
    include: {
      childrenCategories: {
        select: {
          id: true,
          name: true,
          parentCategoryId: true,
        }
      }
    }
  }) as Category;

  if (!category) {
    return Response.json(
      { message: "Category not found!" } as MessageResponse,
      { status: 404 });
  }

  return Response.json(category);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const id = parseInt((await params).categoryId);

  if (isNaN(id) || id < 1) {
    return Response.json(
      { message: "Invalid category id!" } as MessageResponse,
      { status: 400 }
    );
  }

  if (data.name === undefined) {
    return Response.json(
      { message: "No name provided!" } as MessageResponse,
      { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" } as MessageResponse,
      { status: 400 },
    );
  } else if (data.parentCategoryId !== undefined) {
    if (typeof data.parentCategoryId !== "string") {
      return Response.json(
        { message: "ParentCategoryId type must be a string!" } as MessageResponse,
        { status: 400 },
      );
    }
    if (
      !(await prisma.category.findFirst({
        where: { id: data.parentCategoryId },
      }))
    ) {
      return Response.json(
        { message: "Parent category not found!" } as MessageResponse,
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
      { message: "Successfully updated the category." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Category not found!" } as MessageResponse,
        { status: 404 }
      );
    }
    throw error;
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const id = parseInt((await params).categoryId);

  if (isNaN(id) || id < 1) {
    return Response.json(
      { message: "Invalid category id!" } as MessageResponse,
      { status: 400 }
    );
  }

  try {
    await prisma.category.delete({ where: { id: id } });

    return Response.json(
      { message: "Successfully deleted the category." } as MessageResponse,
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json(
        { message: "Category not found!" } as MessageResponse,
        { status: 404 }
      );
    }
    throw error;
  }
}
