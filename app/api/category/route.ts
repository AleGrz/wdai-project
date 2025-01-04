import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  const prisma = new PrismaClient();

  return Response.json(await prisma.category.findMany());
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
  } else if (data.parentCategoryId) {
    if (typeof data.parentCategoryId !== "string") {
      return Response.json(
        { message: "ParentCategoryId type must be a string!" },
        { status: 400 },
      );
    }
    if (!prisma.category.findFirst({ where: { id: data.parentCategoryId } })) {
      return Response.json(
        { message: "Parent category not found!" },
        { status: 404 },
      );
    }
  }
  await prisma.category.create({
    data: {
      name: data.name,
      parentCategoryId: data.parentCategoryId,
    },
  });

  return Response.json(
    { message: "Successfully added new category." },
    { status: 201 },
  );
}

export async function PATCH(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

  if (!data.name) {
    return Response.json({ message: "No name provided!" }, { status: 400 });
  } else if (typeof data.name !== "string") {
    return Response.json(
      { message: "Name type must be a string!" },
      { status: 400 },
    );
  } else if (data.parentCategoryId) {
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
  } else if (!(await prisma.category.findFirst({ where: { id: data.id } }))) {
    return Response.json({ message: "Category not found!" }, { status: 404 });
  }
  await prisma.category.update({
    where: { id: data.id },
    data: {
      name: data.name,
      parentCategoryId: data.parentCategoryId,
    },
  });

  return Response.json(
    { message: "Successfully edited the category." },
    { status: 201 },
  );
}
