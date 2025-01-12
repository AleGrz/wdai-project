"use client";
import { Button, Flex } from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { useState } from "react";
import CartProduct from "./cartProduct";

type OrderWithOrderDetailWithProducts = Prisma.OrderGetPayload<{
  include: {
    orderDetails: {
      include: {
        product: true;
      };
    };
  };
}>;

type OrderDetailWithProducts = Prisma.OrderDetailGetPayload<{
  include: {
    product: true;
  };
}>;

export default function Cart({
  cart,
}: {
  cart: OrderWithOrderDetailWithProducts;
}) {
  const [total, setTotal] = useState<Map<number, number>>(new Map());

  const buy = async () => {
    const response = await fetch(`/api/cart/${cart.userId}/buy`, {
      method: "POST",
    });
    if (!response.ok) {
      alert("Error buying products");
      return;
    }
    cart.orderDetails = [];
    setTotal(new Map());
    alert("Products bought successfully");
  };

  return (
    <>
      {cart.orderDetails.length === 0 && <p>Your cart is empty</p>}
      <Flex direction="column" gap={4}>
        {cart.orderDetails.map((cartProduct: OrderDetailWithProducts) => {
          return (
            <CartProduct
              key={cartProduct.id}
              product={cartProduct.product}
              quantity={cartProduct.quantity}
              setTotal={setTotal}
              userId={cart.userId}
            />
          );
        })}
      </Flex>
      <h2>
        Total: $
        {Array.from(total.values())
          .reduce((acc, curr) => acc + curr, 0)
          .toFixed(2)}
      </h2>
      <Button
        colorScheme="blue"
        onClick={buy}
        disabled={
          Array.from(total.values()).reduce((acc, curr) => acc + curr, 0) === 0
        }
      >
        Checkout
      </Button>
    </>
  );
}
