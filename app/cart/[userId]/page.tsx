"use client";
import { useState, useEffect } from "react";
import { OrderDetail, Product } from "@prisma/client";
import CartProduct from "@/components/cartProduct";

export default function CartPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const [cart, setCart] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  async function getCart() {
    const response = await fetch(`/api/cart/${(await params).userId}`);
    if (!response.ok) {
      return;
    }
    const cart = await response.json();
    setCart(cart.orderDetails);
    for (const orderDetail of cart.orderDetails) {
      const productResponse = await fetch(
        `/api/product/${orderDetail.productId}`
      );
      if (!productResponse.ok) {
        continue;
      }
      const product = await productResponse.json();
      setProducts((products) => [...products, product]);
    }
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h1>Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map((cartProduct: OrderDetail) => {
        const product = products.find(
          (product) => product.id === cartProduct.productId
        );
        return (
          <CartProduct
            key={cartProduct.id}
            product={
              product || {
                name: "",
                id: 0,
                brand: "",
                description: "",
                price: 0,
                inStock: 0,
                categoryId: 0,
                imageUrl: "",
                reviewsCount: 0,
                rating: 0,
              }
            }
            quantity={cartProduct.quantity}
          />
        );
      })}
    </>
  );
}
