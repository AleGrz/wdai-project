"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import {
  Box,
  Heading,
  Text,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
  Spinner,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchData() {
      const productData = await fetch(
        `http://localhost:3000/api/product/${(await params).productId}`
      ).then((res) => res.json());
      setProduct(productData);
    }

    fetchData();
  }, [params]);

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" thickness="4px" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box maxW="6xl" mx="auto" p={6}>
      <HStack alignItems="flex-start" spacing={10}>
        <Box flexShrink={0}>
          <Image
            src={
              "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/42e5394e-7250-4d5e-9ed2-03d618545268/md07501037-large01-jpg"
            }
            alt={product.name}
            boxSize="400px"
            objectFit="cover"
            borderRadius="md"
            shadow="lg"
          />
        </Box>

        <VStack align="flex-start" spacing={4} flex={1}>
          <Heading as="h1" size="xl" color="teal.600">
            {product.name}
          </Heading>
          <Text fontSize="lg" color="gray.700">
            {product.description}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="teal.800">
            ${product.price.toFixed(2)}
          </Text>

          {product.inStock ? (
            <Badge colorScheme="green" fontSize="md">
              In Stock
            </Badge>
          ) : (
            <Badge colorScheme="red" fontSize="md">
              Out of Stock
            </Badge>
          )}
        </VStack>
      </HStack>
      <Tabs.Root defaultValue="members" variant={"line"}>
        <Tabs.List>
          <Tabs.Trigger value="description">
            <TbListDetails />
            Description
          </Tabs.Trigger>
          <Tabs.Trigger value="reviews">
            <FaStar />
            Reviews
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="description">{product.description}</Tabs.Content>
        <Tabs.Content value="reviews"> projects</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
