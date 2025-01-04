import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const id = (await params).productId;
  const category = await prisma.product.findUnique({ where: { id: id } });

  if (!category) {
    return Response.json({ message: "Product not found!" }, { status: 404 });
  }

  return Response.json(category);
}
