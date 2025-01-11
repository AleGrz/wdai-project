import { Product } from "@prisma/client";

export default function CartProduct({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>Quantity: {quantity}</p>
    </div>
  );
}
