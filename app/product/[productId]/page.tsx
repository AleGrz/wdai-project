import type { Prisma } from "@prisma/client";
import {
  Box,
  Image,
  Tabs,
  Spinner,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TbListDetails } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { StepperInput } from "@/components/ui/stepper-input";
import { Button } from "@/components/ui/button";
import ReviewLabel from "@/components/reviewLabel";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;


export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productData = await fetch(
    `http://localhost:3000/api/product/${(await params).productId}`
  ).then((res) => res.json());
  const reviewsData = await fetch(
    `http://localhost:3000/api/product/${(await params).productId}/review`
  ).then((res) => res.json()) as ReviewWithUser[];

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
        <Image
          src={productData.imageUrl}
          alt={productData.name}
          rounded="lg"
          height={600}
          maxW={800}
        />

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
            <Flex alignContent="center">
              <StepperInput
                defaultValue="1"
                min={1}
                max={productData.inStock}
                margin={5}
              />
              <Button w={"auto"} margin={5}>
                Add to cart
                <FiShoppingCart />
              </Button>
            </Flex>
          </Box>
        </Box>
      </HStack>
      <Tabs.Root defaultValue="members" variant={"line"}>
        <Tabs.List>
          <Tabs.Trigger value="description" defaultChecked>
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
              <DialogRoot>
                <DialogBackdrop />
                <DialogTrigger asChild>
                  <Button>Write a review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogCloseTrigger />
                  <DialogHeader>
                    <DialogTitle />
                  </DialogHeader>
                  <DialogBody />
                  <DialogFooter />
                </DialogContent>
              </DialogRoot>
              {reviewsData.length > 0
                ? reviewsData.map(review => (
                    <ReviewLabel key={review.id} review={review} />
                  ))
                : "No reviews yet"}
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
