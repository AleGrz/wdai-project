import type { OrderWithOrderDetailWithProduct } from "@/types";

import { Text } from "@chakra-ui/react";

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
    <>
      <Text fontSize={50} fontWeight={900}>Cart</Text>
      <Cart cart={cart} />
    </>
  );
}
