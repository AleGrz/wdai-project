import { Center, Flex } from "@chakra-ui/react";
import { Product } from "@prisma/client";

import ProductCard from "@/components/productCard";

export default async function Home() {
  const productResponse = await fetch(`http://localhost:3000/api/product`, { next: { revalidate: 300 } });
  const products = await productResponse.json();
  let counter = 0;

  return (
    <>
      {products.length > 0 ? (
        <Flex wrap={"wrap"} justifyContent={"center"} gap={20} margin={10} >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} loading={counter++ < 5 ? "eager" : "lazy"} />
          ))}
        </Flex>
      ) : (
        <Center>No products found.</Center>
      )}
    </>
  );
}
