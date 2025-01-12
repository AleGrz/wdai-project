import type { Product } from "@/types";

import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

import SkeletonNextImage from "@/components/skeletonNextImage";
import { Rating } from "@/components/ui/rating";
import AddToCartButton from "@/components/cart/addToCartButton";

const ProductCard: React.FC<{
  product: Product;
  loading?: "eager" | "lazy" | undefined;
}> = ({ product, loading }) => {
  return (<>
    <Link href={`/product/${product.id}`} prefetch={true}>
      <Box
        bg={"gray.900"}
        w="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        _hover={{
          shadow: "0 0 1px 1px white"
        }}
      >
        <Flex
          justifyContent={"center"}
          roundedTop="lg"
          height={300}
          overflow="hidden"
        >
          <Box
            height={300}
            width="100%"
            position="relative"
          >
            <SkeletonNextImage
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
              alt={product.name}
              quality={50}
              loading={loading}
              fill
              variant="pulse"
              style={{
                background: "white"
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              imageStyle={{
                objectFit: "contain"
              }} />
          </Box>
        </Flex>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignItems={"center"}>
            <Flex flexDirection={"column"}>
              <Box as="span" color={"white"} fontSize="lg">
                {product.brand}
              </Box>
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                height={50}
              >
                {product.name}
              </Box>
            </Flex>
            <AddToCartButton productData={product} small={true} />
          </Flex>
        </Box>
        <Box p="6">
          <Flex justifyContent="space-between" alignContent="center">
            <Flex gap={3}>
              <Rating defaultValue={product.rating} allowHalf readOnly />
              <Box
                as="span"
                color={"white"}
                fontSize="lg"
                lineHeight={"1.9em"}
              >
                ({product.reviewsCount})
              </Box>
            </Flex>
            <Box fontSize="2xl" color={"white"}>
              <Box as="span" color={"white"} fontSize="lg">
                $
              </Box>
              {product.price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Link>
  </>);
};

export default ProductCard;
