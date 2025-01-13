import type React from "react";
import type { Product } from "@/types";

import { AbsoluteCenter, Flex, Separator, Stack } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

import ProductCard from "@/components/productCard";
import { EmptyState } from "@/components/ui/empty-state";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { page = "1", categoryId, query } = await searchParams
  const pageNum = Array.isArray(page) ? 1 : parseInt(page);
  const queryParams = new URLSearchParams({ page: pageNum.toString() });

  if (categoryId) queryParams.append('categoryId', categoryId.toString());
  if (query) queryParams.append('query', query.toString());

  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?${queryParams.toString()}`).then((res) => !res.ok ? [] : res.json()) as Product[];
  let counter = 0;

  return (
    <>
      {products.length > 0 ? (
        <Flex justifyContent={"center"} direction="column" >
          <Flex wrap={"wrap"} justifyContent={"center"} gap={20} margin={10}>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} loading={counter++ < 5 ? "eager" : "lazy"} />
            ))}
          </Flex>
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
