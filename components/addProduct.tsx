"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { Product } from "@prisma/client";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";

import { getUserData } from "@/app/api/auth/helper";

import { StepperInput } from "./ui/stepper-input";

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

    const response = await fetch(`/api/cart/${user.id}`, {
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

    const button = buttonRef.current;

    if (button) {
      const { left, top, width, height } = button.getBoundingClientRect();
      console.log(left, top, width, height);
      const x = (left + width / 2) / window.innerWidth;
      const y = (top + height / 2) / window.innerHeight;
      confetti({
        particleCount: 150,
        spread: 60,
        origin: { x, y },
      });
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
