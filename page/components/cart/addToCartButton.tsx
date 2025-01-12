"use client";

import { Flex } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";

import { toaster } from "@/components/ui/toaster";
import { Product } from "@/types";
import { StepperInput } from "@/components/ui/stepper-input";
import addProduct from "@/components/cart/serverActions";
import { Button } from "@/components/ui/button";

const AddToCartButton: React.FC<{
  productData: Product,
  small?: boolean,
}> = ({ productData, small = false }) => {
  const [quantity, setQuantity] = useState("1");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = buttonRef.current;
    
    if (!button) {
      console.error("Button position not found to throw confetti!");

      return;
    }
    button.disabled = true;
    const promise = addProduct(productData, parseInt(quantity));

    toaster.promise(promise, {
      success: {
        title: "Successfully added!",
        description: "Look in the cart for the product!",
      },
      error: {
        title: "Failed",
        description: "Failed to add a product to the cart!",
      },
      loading: {
        title: "Adding to the cart...",
        description: "Please wait"
      },
    });

    if (!await promise) return;
    const { left, top, width, height } = button.getBoundingClientRect();

    const x = (left + width / 2) / window.innerWidth;
    const y = (top + height / 2) / window.innerHeight;

    button.disabled = false;
    await confetti({
      particleCount: 150,
      spread: 60,
      origin: { x, y },
    });
  };

  return (
    <Flex alignContent="center">
      {small &&
        <StepperInput
          defaultValue="1"
          min={1}
          max={productData.inStock || 1}
          margin={5}
          onValueChange={e => setQuantity(e.value)}
        />}
      <Button ref={buttonRef} w={"auto"} margin={small ? 0 : 5} onClick={addToCart}>
        {small && "Add to cart"}
        <FiShoppingCart />
      </Button>
    </Flex>
  );
}

export default AddToCartButton;