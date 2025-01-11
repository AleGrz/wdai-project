import { Product } from "@prisma/client";
import { Box, Flex, Button } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import React from "react";

import SkeletonNextImage from "@/components/skeletonNextImage";

import { Rating } from "./ui/rating";

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
              src={product.imageUrl}
              alt={product.name}
              quality={65}
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
            <Button w={30}>
              <FiShoppingCart />
            </Button>
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
