"use client";

import { getUserData } from "@/app/api/auth/helper";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiShoppingCart } from "react-icons/fi";
import { StepperInput } from "./ui/stepper-input";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function AddProduct({ productData }: { productData: Product }) {
  const [quantity, setQuantity] = useState("1");

  const addToCart = async () => {
    const user = await getUserData();
    if (!user) {
      const router = useRouter();
      router.push("/login");
      return;
    }

    const response = await fetch(`/api/cart/${user.id}`, {
      body: JSON.stringify({
        productId: productData.id,
        quantity: parseInt(quantity),
      }),
      headers: { "Content-Type": "application/json" },
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
      <Button w={"auto"} margin={5} onClick={addToCart}>
        Add to cart
        <FiShoppingCart />
      </Button>
    </Flex>
  );
}
