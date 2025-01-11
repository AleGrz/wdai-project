"use client";
import type { Prisma } from "@prisma/client";

import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { useState, useRef } from "react";

import { Rating } from "@/components/ui/rating";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;

export default function ReviewLabel({
  review,
  isUD,
  productId,
}: {
  review: ReviewWithUser;
  isUD: boolean;
  productId: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review.description);
  const [prev, setPrev] = useState(review.description);
  const [empty, setEmpty] = useState(false);

  const onSubmit = async () => {
    if (!content) {
      setEmpty(true);

      return;
    }
    setIsEditing(false);
    setPrev(content);
    await fetch(`/api/product/${productId}/review/${review.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: content, rating: review.rating }),
    });
  };

  const onCancel = () => {
    setIsEditing(false);
    setContent(prev);
  };
  const onDeleteClicked = async () => {
    setIsVisible(false);
    await fetch(`/api/product/${productId}/review/${review.id}`, {
      method: "DELETE",
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    isVisible && (
      <Box>
        <Flex alignItems={"center"} gap={5}>
          <Avatar
            variant="subtle"
            name={review.user.firstName + " " + review.user.lastName}
          />
          <Box w={800}>
            <h2>{review.user.firstName + " " + review.user.lastName}</h2>
            <Rating
              readOnly={!isEditing}
              defaultValue={review.rating}
              size="md"
              onChange={(event) => {
                const value = (event.target as HTMLDivElement).getAttribute(
                  "value"
                );

                if (value) {
                  review.rating = parseInt(value);
                }
              }}
            />
            {isEditing ? (
              <Flex>
                <Field invalid={empty} errorText="This field is required">
                  <Textarea
                    resize="none"
                    height="200"
                    value={content}
                    onChange={onChange}
                    ref={textareaRef}
                  />
                </Field>

                <Button onClick={onCancel} variant="plain">
                  <LuX />
                </Button>
                <Button onClick={onSubmit} variant="plain">
                  <LuCheck />
                </Button>
              </Flex>
            ) : (
              <p>{content}</p>
            )}
            {isUD && !isEditing && (
              <Flex>
                <Button
                  variant={"plain"}
                  padding={1}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant={"plain"}
                  padding={1}
                  onClick={() => {
                    onDeleteClicked();
                  }}
                >
                  Delete
                </Button>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    )
  );
}
