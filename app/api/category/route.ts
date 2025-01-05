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

  return Response.json(
    await prisma.category.findMany({
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
  } else if (data.parentCategoryId !== undefined) {
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
