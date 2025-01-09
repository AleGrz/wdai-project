"use client";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";

export default function CartPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const [cart, setCart] = useState<Product[]>([]);
  async function getCart() {
    const response = await fetch(`/api/cart/${(await params).userId}`);
    if (!response.ok) {
      return;
    }
    const cart = await response.json();
    setCart(cart);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <h1>Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(({ id, name, description, price }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{price}</p>
        </div>
      ))}
    </>
  );
}
