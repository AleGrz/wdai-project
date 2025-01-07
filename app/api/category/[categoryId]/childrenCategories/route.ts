import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).categoryId;

  if (await prisma.category.findUnique({ where: { id: parseInt(id) } })) {
    const categories = await prisma.category.findMany({
      where: { parentCategoryId: parseInt(id) },
    });

    return Response.json(categories);
  } else {
    return Response.json({ message: "Category not found!" }, { status: 404 });
  }
}