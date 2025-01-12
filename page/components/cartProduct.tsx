import { HStack } from "@chakra-ui/react";

import { Product } from "@/types";

export default function CartProduct({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <HStack>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>Quantity: {quantity}</p>
    </HStack>
  );
}
