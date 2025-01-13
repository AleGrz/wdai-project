"use server";
import { redirect } from "next/navigation";

import { Product } from "@/types";
import { getTokensFromCookies, getUserData } from "@/app/(auth)/helper";

export async function addProduct(product: Product, quantity: number): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`, {
    body: JSON.stringify({
      productId: product.id,
      quantity: quantity,
    }),
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response.ok;
}

export async function removeProduct(productId: number, userId: number): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`, {
    method: "DELETE",
    body: JSON.stringify({
      productId: productId,
    }),
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response.ok;
}

export async function setQuantity(productId: number, quantity: number, userId: number): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  
  return response.ok;
}

export async function buy(userId: number): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}/buy`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  
  return response.ok;
}