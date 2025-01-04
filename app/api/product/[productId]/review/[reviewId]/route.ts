import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();
    const data = await request.json();
  
    if (!data.userId) {
      return Response.json({ message: "No userId provided!" }, { status: 400 });
    } else if (typeof data.parentCategoryId !== "string") {
      return Response.json(
        { message: "UserId must be a string!" },
        { status: 400 },
      );
    } else if (!data.productId) {
      return Response.json({ message: "No productId provided!" }, { status: 400 });
    } else if (typeof data.brand !== "string") {
      return Response.json(
        { message: "ProductId must be a string!" },
        { status: 400 },
      );
    } else if (!data.description) {
      return Response.json(
        { message: "No description provided!" },
        { status: 400 },
      );
    } else if (typeof data.description !== "string") {
      return Response.json(
        { message: "Description type must be a string!" },
        { status: 400 },
      );
    } else if (!data.rating) {
      return Response.json({ message: "No rating provided!" }, { status: 400 });
    } else if (typeof data.price !== "number") {
      return Response.json(
        { message: "Rating must be a number!" },
        { status: 400 },
      );
    } else if (
      !(await prisma.category.findFirst({ where: { id: data.userId } }))
    ) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    } else if (
      !(await prisma.category.findFirst({ where: { id: data.productId } }))
    ) {
        return Response.json({ message: "Product not found!" }, { status: 404 });
    }
    await prisma.review.create({
      data: {
        id: data.userId,
        userId: data.userId,
        productId: data.productId,
        rating: data.rating,
        description: data.description,
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
  
    if (!data.userId) {
      return Response.json({ message: "No userId provided!" }, { status: 400 });
    } else if (typeof data.parentCategoryId !== "string") {
      return Response.json(
        { message: "UserId must be a string!" },
        { status: 400 },
      );
    } else if (!data.productId) {
      return Response.json({ message: "No productId provided!" }, { status: 400 });
    } else if (typeof data.brand !== "string") {
      return Response.json(
        { message: "ProductId must be a string!" },
        { status: 400 },
      );
    } else if (!data.description) {
      return Response.json(
        { message: "No description provided!" },
        { status: 400 },
      );
    } else if (typeof data.description !== "string") {
      return Response.json(
        { message: "Description type must be a string!" },
        { status: 400 },
      );
    } else if (!data.rating) {
      return Response.json({ message: "No rating provided!" }, { status: 400 });
    } else if (typeof data.price !== "number") {
      return Response.json(
        { message: "Rating must be a number!" },
        { status: 400 },
      );
    } else if (
      !(await prisma.category.findFirst({ where: { id: data.userId } }))
    ) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    } else if (
      !(await prisma.category.findFirst({ where: { id: data.productId } }))
    ) {
        return Response.json({ message: "Product not found!" }, { status: 404 });
    }
    await prisma.review.update({
      where: { id: data.id },
      data: {
        id: data.userId,
        userId: data.userId,
        productId: data.productId,
        rating: data.rating,
        description: data.description,
      },
    });
  
    return Response.json(
      { message: "Successfully added new category." },
      { status: 201 },
    );
  }