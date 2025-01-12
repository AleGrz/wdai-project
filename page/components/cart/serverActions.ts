"use server";
import { redirect } from "next/navigation";

import { Product } from "@/types";
import { getTokensFromCookies, getUserData } from "@/app/(auth)/helper";

export default async function addProduct(product: Product, quantity: number): Promise<boolean> {
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