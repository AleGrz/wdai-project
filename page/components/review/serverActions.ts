"use server";
import type { MessageResponse } from "@/types";

import { redirect } from "next/navigation";

import { getTokensFromCookies, getUserData } from "@/app/(auth)/helper";

export async function addReview(productId: number, rating: number, description: string): Promise<{statusCode: number, message: string}> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/review`, {
    method: "POST",
    body: JSON.stringify({
      userId: user.id,
      rating: rating as number,
      description: description,
    }),
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });
  const data = await response.json() as MessageResponse;

  return { statusCode: response.status, message: data.message };
}

export async function deleteReview(productId: number, reviewId: string): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/review/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response.ok;
}

export async function editReview(rating: number, description: string, productId: number, reviewId: string): Promise<boolean> {
  const { accessToken } = await getTokensFromCookies();
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/review/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify({ description: description, rating: rating }),
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response.ok;
}