"use client";

import ProductCard from "@/components/productCard";
import { Flex } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchData() {
      const productResponse = await fetch(`http://localhost:3000/api/product`);
      const productData = await productResponse.json();
      setProducts(productData);
    }

    fetchData();
  }, []);

  return (
    <>
      {products.length > 0 ? (
        <Flex wrap={"wrap"} justifyContent={"center"}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Flex>
      ) : (
        <p>No products found.</p>
      )}
    </>
  );
}
