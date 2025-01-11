import { Product } from "@prisma/client";

export default function CartProduct({ product }: { product: Product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </div>
  );
}
