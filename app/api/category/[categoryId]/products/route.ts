import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const prisma = new PrismaClient();
  const productId = (await params).productId;
  const product = await prisma.product.findUnique({ where: { id: parseInt(productId) } });

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = Math.min(
    parseInt(searchParams.get("pageSize") || "10", 10),
    100,
  );
  const skip = (page - 1) * pageSize;

  return Response.json(
    await prisma.review.findMany({
      skip: skip,
      take: pageSize,
      where: { productId: parseInt(productId) },
    }),
  );
}