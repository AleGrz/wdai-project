import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import type { MessageResponse } from "@/types";

import { PrismaClient } from "@prisma/client";

async function getDescendantCategoryIds(prisma: PrismaClient, categoryId: number): Promise<number[]> {
  const descendants: number[] = [categoryId];

  const getChildren = async (parentId: number) => {
    const categories = await prisma.category.findMany({
      where: { parentCategoryId: parentId },
      select: { id: true },
    });

    for (const category of categories) {
      descendants.push(category.id);
      await getChildren(category.id);
    }
  };

  await getChildren(categoryId);

  return descendants;
}

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const searchParams = request.nextUrl.searchParams;
  const featured = searchParams.get("featured") === "true";
  const filters: Prisma.ProductWhereInput = {};
  let orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
  const searchParam = searchParams.get("query");

  if (featured) {
    orderBy = [
      {
        rating: "desc",
      },
      {
        reviewsCount: "desc",
      }
    ]
  }
  if (searchParam) {
    filters.OR = [
      {
        name: {
          contains: searchParam.toString(),
        },
      },
      {
        brand: {
          contains: searchParam.toString(),
        },
      },
      {
        description: {
          contains: searchParam.toString(),
        },
      },
    ];
  }
  if (searchParams.get("categoryId")) {
    const categoryId = parseInt(searchParams.get("categoryId") || "1");
    
    if (isNaN(categoryId) || categoryId < 1) {
      return Response.json(
        { message: "Invalid category id!" } as MessageResponse,
        { status: 400 }
      );
    }
    filters.categoryId = {
      in: await getDescendantCategoryIds(prisma, categoryId),
    };
  }

  return Response.json(
    await prisma.product.findMany({
      where: filters,
      orderBy: orderBy,
    }
  ));
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();

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
    return Response.json({ message: "No price provided!" }, { status: 400 });
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
  await prisma.product.create({
    data: {
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: data.price,
      inStock: data.inStock,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
    },
  });

  return Response.json(
    { message: "Successfully added new product." } as MessageResponse,
    { status: 201 },
  );
}
