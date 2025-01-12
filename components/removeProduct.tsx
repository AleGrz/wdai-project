"use client";
import type { Product } from "@/types";

import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useRef } from "react";

import { getUserData } from "@/app/(auth)/helper";
import { StepperInput } from "@/components/ui/stepper-input";

export default function AddProduct({ productData }: { productData: Product }) {
  const [quantity, setQuantity] = useState("1");
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const addToCart = async () => {
    const user = await getUserData();

    if (!user) {
      router.push("/login");

      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${user.id}`, {
      body: JSON.stringify({
        productId: productData.id,
        quantity: parseInt(quantity),
      }),
      method: "POST",
    });

    if (!response.ok) {
      console.error("Failed to add product to cart");

      return;
    }
  };

  return (
    <Flex alignContent="center">
      <StepperInput
        defaultValue="1"
        min={1}
        max={productData.inStock || 1}
        margin={5}
        onValueChange={(value) => setQuantity(value.value)}
      />
      <Button ref={buttonRef} w={"auto"} margin={5} onClick={addToCart}>
        Add to cart
        <FiShoppingCart />
      </Button>
    </Flex>
  );
}
