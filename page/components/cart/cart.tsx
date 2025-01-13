"use client";
import type { OrderWithOrderDetailWithProduct, OrderDetailWithProduct} from "@/types";

import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

import { buy } from "@/components/cart/serverActions";
import CartProduct from "@/components/cart/cartProduct";
import { toaster } from "@/components/ui/toaster";

export default function Cart({
  cart,
}: {
  cart: OrderWithOrderDetailWithProduct;
}) {
  const [total, setTotal] = useState<Map<number, number>>(new Map());

  const buyHandle = async () => {
    const promise = buy(cart.userId);
    
    toaster.promise(promise, {
      success: {
        title: "Success!",
        description: "Order has been finalized successfully!",
      },
      error: {
        title: "Failed to process",
        description: "Failed to finalize the order!",
      },
      loading: {
        title: "Finalizing the order...",
        description: "Please wait"
      },
    });
    if (!(await promise))
      return;
    cart.orderDetails = [];
    setTotal(new Map());
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
        onClick={buyHandle}
        disabled={
          Array.from(total.values()).reduce((acc, curr) => acc + curr, 0) === 0
        }
      >
        Checkout
      </Button>
    </>
  );
}