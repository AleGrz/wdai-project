"use client";

import {
  Button,
  DialogBody,
  DialogFooter,
  Fieldset,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

import { Field } from "./ui/field";
import { Rating } from "./ui/rating";
import { getUserData } from "@/app/api/auth/helper";
import { useRouter } from "next/navigation";
import React from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [isRatingInvalid, setIsRatingInvalid] = useState(false);
  const [isResponseInvalid, setIsResponseInvalid] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    if (target.rating.value === "-1") {
      setIsRatingInvalid(true);
      return;
    }
    const response = await fetch(`/api/product/${productId}/review`, {
      method: "POST",
      body: JSON.stringify({
        userId: (await getUserData())?.id,
        rating: parseInt(target.rating.value),
        description: target.description.value,
      }),
    });
    if (response.status === 403) {
      setIsResponseInvalid(true);
      return
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogBody key={productId}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <Field
              label="Rating"
              errorText="This field is required"
              invalid={isRatingInvalid}
              required
            >
              <Rating name="rating" />
            </Field>
            <Field label="Comment" errorText="This field is required" required>
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
        <Field
          invalid={isResponseInvalid}
          errorText="You have already reviewed this product!"
        >
          <Button type="submit">Submit</Button>
        </Field>
      </DialogFooter>
    </form>
  );
}
