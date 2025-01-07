import { Product } from "@prisma/client";
import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import NextImage from "next/image";
import React from "react";

const ProductCard: React.FC<{ product: Product, loading?: "eager" | "lazy" | undefined }> = ({ product, loading }) => {
  return (
    <>
      <Link
        href={`/product/${product.id}`}
        _hover={{ textDecoration: "none" }}
        margin={50}
      >
        <Box
          bg={"gray.800"}
          w="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
            <Flex justifyContent={"center"} roundedTop="lg" background={"#FFFFFF"} height={300} overflow="hidden">
                <Box height={300} width="100%" position="relative" _hover={{ transform: "scale(1.1)" }} transition="transform 0.3s ease-in-out">
                <NextImage
                  src={product.imageUrl}
                  alt={product.name}
                  quality={65}
                  layout="fill"
                  objectFit="contain"
                  loading={loading}
                  style={{ borderRadius: '0.5rem' }}
                />
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
    </>
  );
}
export default ProductCard;
