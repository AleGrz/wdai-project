import type React from "react";

import { Product } from "@prisma/client";
import { AbsoluteCenter, Flex, Text } from "@chakra-ui/react";

import ProductCard from "@/components/productCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = "1", categoryId = "1" } = await searchParams
  const pageNum = Array.isArray(page) ? 1 : parseInt(page);
  const categoryIdNum = Array.isArray(categoryId) ? 1 : parseInt(categoryId);
  const productResponse = await fetch(
    `http://localhost:3000/api/product?page=${pageNum}&categoryId=${categoryIdNum}`, { next: { revalidate: 300 } }
  );
  const products = await productResponse.json();
  let counter = 0;

  return (
    <>
      {products.length > 0 ? (
        <Flex wrap={"wrap"} justifyContent={"center"} gap={20} margin={10}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} loading={counter++ < 5 ? "eager" : "lazy"} />
          ))}
        </Flex>
      ) : (
        <AbsoluteCenter axis="both">
          <Text fontSize={50} animation="spin infinite 2s linear">No products found.</Text>
        </AbsoluteCenter>
      )}
    </>
  );
}
