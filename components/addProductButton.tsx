"use client";

import { getUserData } from "@/app/validator";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiShoppingCart } from "react-icons/fi";

export default function AddProductButton() {
  const addToCart = async () => {
    const user = await getUserData();
    if (!user) {
      const router = useRouter();
      router.push("/login");
    }
    await fetch(`/api/cart`, {
      body: JSON.stringify({ userId: user?.id }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  };
  return (
    <Button w={"auto"} margin={5} onClick={addToCart}>
      Add to cart
      <FiShoppingCart />
    </Button>
  );
}
