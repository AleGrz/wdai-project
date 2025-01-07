"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryCard from "@/components/categoryCard";
import ProductCard from "@/components/productCard";
import { Category, Product } from "@prisma/client";
import { Flex } from "@chakra-ui/react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const categoryId = parseInt(searchParams.get("categoryId") || "1");

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const productResponse = await fetch(
        `http://localhost:3000/api/product?page=${page}&categoryId=${categoryId}`
      );
      const productData = await productResponse.json();
      setProducts(productData);
    }

    fetchData();
  }, [categoryId, page]);

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
