import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

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
