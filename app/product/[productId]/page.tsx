"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import {
  Box,
  Image,
  Tabs,
  Spinner,
  HStack,
  Flex,
  Button,
  Fieldset,
  Textarea,
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
import ReviewLabel from "@/components/review";
import { Rating } from "@/components/ui/rating";
import { Field } from "@/components/ui/field";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<
    { rating: number; description: string; userFullName: string }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const productData = await fetch(
        `http://localhost:3000/api/product/${(await params).productId}`
      ).then((res) => res.json());
      setProduct(productData);

      const reviewsData = await fetch(
        `http://localhost:3000/api/product/${(await params).productId}/review`
      ).then((res) => res.json());
      setReviews(reviewsData);
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
          src={product.imageUrl}
          alt={product.name}
          rounded="lg"
          height={600}
          maxW={800}
        />

        <Box>
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
            <Flex alignContent="center">
              <StepperInput
                defaultValue="1"
                min={1}
                max={product.inStock}
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
            {product.description}
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="reviews">
          <Flex justifyContent={"center"}>
            <Flex flexFlow={"column"} justifyContent={"flex-start"} gap={10}>
              <DialogRoot>
                <DialogBackdrop />
                <DialogTrigger>
                  <Button>Write a review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogCloseTrigger />
                  <DialogHeader>
                    <DialogTitle>Write a review for {product.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={onSubmit}>
                    <DialogBody>
                      <Fieldset.Root size="lg">
                        <Fieldset.Content>
                          <Field
                            label="Rating"
                            errorText="This field is required"
                            required
                          >
                            <Rating name="rating" />
                          </Field>
                          <Field
                            label="Comment"
                            errorText="This field is required"
                            required
                          >
                            <Textarea
                              name="description"
                              resize="none"
                              height={300}
                              maxLength={500}
                            />
                          </Field>
                        </Fieldset.Content>
                      </Fieldset.Root>
                    </DialogBody>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </DialogRoot>
              {reviews.length > 0
                ? reviews.map((r) => (
                    <ReviewLabel key={r.userFullName} review={r} />
                  ))
                : "No reviews yet"}
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

function onSubmit(event: any) {
  event.preventDefault();
  if (!event.target.rating.value || !event.target.description.value) {
    event.target.rating.
    return;
  }
}
