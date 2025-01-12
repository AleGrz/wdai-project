import { Button, HStack } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { StepperInput } from "./ui/stepper-input";

import { useEffect, useState } from "react";

type ValueChangeDetails = {
  value: string;
};

export default function CartProduct({
  product,
  quantity,
  setTotal,
  userId,
}: {
  product: Product;
  quantity: number;
  setTotal: React.Dispatch<React.SetStateAction<Map<number, number>>>;
  userId: number;
}) {
  const [active, setActive] = useState(true);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  useEffect(() => {
    setTotal((prev: Map<number, number>) =>
      new Map(prev).set(product.id, product.price * currentQuantity)
    );
  }, [product, currentQuantity, setTotal]);

  const handleQuantityChange = async (details: ValueChangeDetails) => {
    const newQuantity = parseInt(details.value);
    if (isNaN(newQuantity) || newQuantity < 0) return;

    const change = newQuantity - currentQuantity;

    setCurrentQuantity(newQuantity);

    try {
      await fetch(`/api/cart/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: change,
        }),
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDelete = async () => {
    setActive(false);
    setTotal((prev: Map<number, number>) => new Map(prev).set(product.id, 0));

    try {
      await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
        }),
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    active && (
      <HStack>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <StepperInput
          defaultValue={currentQuantity.toString()}
          onValueChange={handleQuantityChange}
          min={1}
          max={product.inStock}
        />
        <Button onClick={handleDelete}>Delete</Button>
      </HStack>
    )
  );
}
