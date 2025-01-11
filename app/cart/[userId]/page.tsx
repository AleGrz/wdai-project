import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { Flex, Stack } from "@chakra-ui/react";

import CartProduct from "@/components/cartProduct";

type OrderWithOrderDetailWithProducts = Prisma.OrderGetPayload<{
  include: { 
    orderDetails: {
      include: {
        product: true
}}}}>;

type OrderDetailWithProducts = Prisma.OrderDetailGetPayload<{
  include: { 
    product: true
}}>;

export default async function CartPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(x => `${x.name}=${x.value}`).join("; ");
  const response = await fetch(`http://localhost:3000/api/cart/${(await params).userId}`, {
    headers: {
      Cookie: allCookies
    }
  });

  if (!response.ok) return;
  const cart = await response.json() as OrderWithOrderDetailWithProducts;

  return (
    <Stack>
      <h1>Cart</h1>
      {cart.orderDetails.length === 0 && <p>Your cart is empty</p>}
      <Flex direction="column" gap={4}>
        {cart.orderDetails.map((cartProduct: OrderDetailWithProducts) => {
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
