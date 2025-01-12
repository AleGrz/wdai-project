import type { OrderWithOrderDetailWithProduct } from "@/types";

import { Stack } from "@chakra-ui/react";

import { getTokensFromCookies } from "@/app/(auth)/helper";
import Cart from "@/components/cart/cart";

export default async function CartPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  const { accessToken } = await getTokensFromCookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return;
  const cart = await response.json() as OrderWithOrderDetailWithProduct;

  return (
    <Stack>
      <h1>Cart</h1>
      <Cart cart={cart} />
    </Stack>
  );
}
