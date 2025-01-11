"use client";
import type { Prisma } from "@prisma/client";
import { Box, Button, Flex, Textarea } from "@chakra-ui/react";
import { Rating } from "@/components/ui/rating";
import { Avatar } from "@/components/ui/avatar";
import { LuCheck, LuX } from "react-icons/lu";
import { useState, useRef } from "react";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;

export default function ReviewLabel({
  review,
  isUD,
}: {
  review: ReviewWithUser;
  isUD: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review.description);
  const [prev, setPrev] = useState(review.description);

  const onSubmit = () => {
    setIsEditing(false);
    setPrev(content);
    setContent(textareaRef.current?.value || "");
  };

  const onCancel = () => {
    setIsEditing(false);
    setContent(prev);
  };

  const onDeleteClicked = () => {
    setIsVisible(false);
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
            />
            {isEditing ? (
              <Flex>
                <Textarea
                  resize="none"
                  height="200"
                  defaultValue={content}
                  ref={textareaRef}
                />
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
