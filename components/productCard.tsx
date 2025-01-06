import { Product } from "@prisma/client";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <a href={`/product/${product.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <h4 className="font-semibold text-lg">{product.brand}</h4>
          <p className="text-gray-500">${product.price}</p>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-gray-500">In stock: {product.inStock}</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </a>
  );
}
