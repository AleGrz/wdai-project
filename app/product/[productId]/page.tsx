import type { Prisma } from "@prisma/client";

import { Box, Tabs, Spinner, HStack, Flex } from "@chakra-ui/react";
import { TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";

import ReviewLabel from "@/components/reviewLabel";
import AddProduct from "@/components/addProduct";
import SkeletonNextImage from "@/components/skeletonNextImage";
import { getUserData } from "@/app/api/auth/helper";
import ReviewDialog from "@/components/reviewDialog";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}> & { isUD?: boolean };

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productData = await fetch(
    `http://localhost:3000/api/product/${(await params).productId}`
  ).then((res) => res.json());
  const reviewsData = (await fetch(
    `http://localhost:3000/api/product/${(await params).productId}/review`
  ).then((res) => res.json())) as ReviewWithUser[];
  const user = await getUserData();

  if (!productData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
      >
        <Spinner size="xl" color="teal.500" />
      </Box>
    );
  }

  return (
    <>
      <HStack
        alignItems="flex-start"
        bg={"gray.800"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Box position="relative" height={600} maxW={800} width="100%">
          <SkeletonNextImage
            src={productData.imageUrl}
            alt={productData.name}
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              background: "white",
              borderRadius: "0.5rem",
            }}
            imageStyle={{
              objectFit: "contain",
            }}
          />
        </Box>

        <Box>
          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignItems={"center"}>
              <Flex flexDirection={"column"}>
                <Box as="span" color={"white"} fontSize="lg">
                  {productData.brand}
                </Box>
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  {productData.name}
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box p="6">
            <Flex justifyContent="space-between" alignContent="center">
              <Box fontSize="2xl" color={"white"}>
                <Box as="span" color={"white"} fontSize="lg">
                  $
                </Box>
                {productData.price.toFixed(2)}
              </Box>
            </Flex>
            <AddProduct productData={productData} />
          </Box>
        </Box>
      </HStack>
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
          <Flex justifyContent={"center"} fontSize={"2xl"}>
            {productData.description}
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <Flex justifyContent={"center"}>
            <Flex flexFlow={"column"} justifyContent={"flex-start"} gap={10}>
              <ReviewDialog product={productData} />
              {reviewsData.length > 0
                ? reviewsData.map((review) => (
                    <ReviewLabel
                      key={review.id}
                      review={review}
                      isUD={
                        review.user.id === user?.id || user?.isAdmin || false
                      }
                      productId={productData.id}
                    />
                  ))
                : "No reviews yet"}
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
