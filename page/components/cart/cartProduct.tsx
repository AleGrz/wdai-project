import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Product } from "@/types";
import { StepperInput } from "@/components/ui/stepper-input";
import { removeProduct, setQuantity } from "@/components/cart/serverActions";
import { toaster } from "@/components/ui/toaster";

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
    await setQuantity(product.id, change, userId);
  };

  const handleRemove = async () => {
    setActive(false);
    setTotal((prev: Map<number, number>) => new Map(prev).set(product.id, 0));
    const promise = removeProduct(product.id, userId);

    toaster.promise(promise, {
      success: {
        title: "Successfully remove!",
        description: "Look in the cart!",
      },
      error: {
        title: "Failed",
        description: "Failed to remove a product from the cart!",
      },
      loading: {
        title: "Removing item from the cart...",
        description: "Please wait"
      },
    });
    await promise;
  };

  return (
    active && (
      <Flex direction="row" gap={{"base": 5, "lg": 20}} justifyContent="space-between" alignItems="center">
        <h2>{product.name}</h2>
        <Flex direction="row" gap={2} alignItems="center">
          <p>{product.price}</p>
          <StepperInput
            defaultValue={currentQuantity.toString()}
            onValueChange={handleQuantityChange}
            min={1}
            max={product.inStock}
          />
          <Button onClick={handleRemove}>Remove</Button>
        </Flex>
      </Flex>
    )
  );
}