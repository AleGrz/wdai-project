import { Product } from "@prisma/client";
import { Image, Box, Flex, Button, chakra } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <chakra.a
      href={`/product/${product.id}`}
      _hover={{ textDecoration: "none" }}
      margin={50}
    >
      <Box
        bg={"gray.800"}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={
            "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/42e5394e-7250-4d5e-9ed2-03d618545268/md07501037-large01-jpg"
          }
          alt={product.name}
          roundedTop="lg"
        />

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
    </chakra.a>
  );
}
