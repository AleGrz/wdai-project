import type { OrderWithOrderDetailWithProduct, OrderDetailWithProduct } from "@/types";

import { Flex, Stack } from "@chakra-ui/react";

import CartProduct from "@/components/cartProduct";
import { getTokensFromCookies } from "@/app/(auth)/helper";

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
      {cart.orderDetails.length === 0 && <p>Your cart is empty</p>}
      <Flex direction="column" gap={4}>
        {cart.orderDetails.map((cartProduct: OrderDetailWithProduct) => {
          return (
            <CartProduct
              key={cartProduct.id}
              product={cartProduct.product}
              quantity={cartProduct.quantity}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}
