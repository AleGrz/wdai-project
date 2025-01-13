import type { Product, ReviewWithUser } from "@/types";

import { Box, Tabs, Flex } from "@chakra-ui/react";
import { TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { notFound } from "next/navigation";

import ReviewLabel from "@/components/review/reviewLabel";
import AddToCartButton from "@/components/cart/addToCartButton";
import SkeletonNextImage from "@/components/skeletonNextImage";
import ReviewDialog from "@/components/review/reviewDialog";
import { getUserData } from "@/app/(auth)/helper";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
  ).then((res) => !res.ok ? null : res.json()) as Product | null;

  if (!product) notFound();
  const reviewsData = (await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/review`
  ).then((res) => !res.ok ? [] : res.json())) as ReviewWithUser[];
  const user = await getUserData(false);

  return (
    <>
      <Flex justifyContent={"center"} fontSize={"2xl"} flexDirection={{ base: "column", md: "row" }} gap={10} padding={50}>
        <Box position="relative" height={600} maxW={800} width="100%">
          <SkeletonNextImage
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
            alt={product.name}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 50%, (max-width: 1200px) 50%, 33%"
            style={{
              background: "white",
              borderRadius: "0.5rem",
            }}
            imageStyle={{
              objectFit: "contain",
            }}
          />
        </Box>

        <Flex flexDirection={"column"} width={"100%"} justifyContent={"space-between"}>
          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignItems={"center"}>
              <Flex flexDirection={"column"}>
                <Box as="span" color={"white"} fontSize="2xl">
                  {product.brand}
                </Box>
                <Box
                  fontSize="4xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  {product.name}
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box p="6">
            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="4xl" color={"white"}>
                <Box as="span" color={"white"} fontSize="3xl">
                  $
                </Box>
                {product.price.toFixed(2)}
              </Box>
            </Flex>
            <AddToCartButton productData={product} />
          </Box>
        </Flex>
      </Flex>
      <Tabs.Root defaultValue="description" variant={"line"}>
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

        <Tabs.Content value="description">
          <Flex justifyContent={"center"} fontSize={"2xl"} padding={50}>
            {product.description}
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <Flex justifyContent={"center"} width="100%">
            <Flex flexDirection={"column"} gap={10} padding={50} maxWidth={800} width={"80%"}>
            {user && 
                <ReviewDialog product={product} />}
                <Flex justifyContent="center" flexDirection={"column"} gap={5}>
              {reviewsData.length > 0 ?
                reviewsData.map((review) => (
                  <ReviewLabel
                    key={review.id}
                    review={review}
                    isUD={
                      review.user.id === user?.id || user?.isAdmin || false
                    }
                    productId={product.id}
                  />
                )) :
                  "No reviews yet"
              }
            </Flex>
          </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
