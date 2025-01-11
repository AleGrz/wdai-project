import { AbsoluteCenter, Flex, Separator, Stack } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";

import ProductCard from "@/components/productCard";
import { EmptyState } from "@/components/ui/empty-state";

export default async function Home() {
  const products = await fetch(`http://localhost:3000/api/product?featured=true&pageSize=9`).then((res) => res.json());
  let counter = 0;

  return (
    <>
      {products.length > 0 ? (
        <Flex wrap={"wrap"} justifyContent={"center"} gap={20} margin={10}>
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              loading={counter++ < 5 ? "eager" : "lazy"}
            />
          ))}
        </Flex>
      ) : (
        <AbsoluteCenter>
          <Stack width={{ base: "100%", lg: "600px" }}>
            <Separator />
            <EmptyState
              icon={<RxCross2 />}
              size="lg"
              title="No products found"
              description="Try adjusting your search"
            >
            </EmptyState>
            <Separator />
          </Stack>
        </AbsoluteCenter>
      )}
    </>
  );
}
