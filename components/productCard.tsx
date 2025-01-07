import { Product } from "@prisma/client";
import { Image, Box, Flex, Icon } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { Tooltip } from "@/components/ui/tooltip";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
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
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {product.name}
            </Box>
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={"white"}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                $
              </Box>
              {product.price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
