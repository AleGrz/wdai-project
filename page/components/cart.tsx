"use client";
import type { OrderWithOrderDetailWithProduct, OrderDetailWithProduct} from "@/types";

import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

import CartProduct from "./cartProduct";


export default function Cart({
  cart,
}: {
  cart: OrderWithOrderDetailWithProduct;
}) {
  const [total, setTotal] = useState<Map<number, number>>(new Map());

  const buy = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cart.userId}/buy`, {
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
        {cart.orderDetails.map((cartProduct: OrderDetailWithProduct) => {
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