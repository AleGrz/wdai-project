"use client";
import type { Product } from "@/types";

import {
  Button,
  DialogBody,
  DialogFooter,
  Fieldset,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

import { getUserData } from "@/app/(auth)/helper";
import { Field } from "@/components/ui/field";
import { Rating } from "@/components/ui/rating";
import { DialogBackdrop, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ReviewDialog: React.FC<{
  product: Product
}> = ({ product }) => {
  const router = useRouter();
  const [isRatingInvalid, setIsRatingInvalid] = useState(false);
  const [isResponseInvalid, setIsResponseInvalid] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [open, setOpen] = useState(false)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;

    event.preventDefault();
    if (target.description.value === "") {
      setEmpty(true);

      return;
    }
    if (target.rating.value === "-1") {
      setIsRatingInvalid(true);

      return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}/review`, {
      method: "POST",
      body: JSON.stringify({
        userId: (await getUserData())?.id,
        rating: parseInt(target.rating.value),
        description: target.description.value,
      }),
    });

    if (response.status === 403) {
      setIsResponseInvalid(true);

      return;
    }
    setOpen(false);
    router.refresh();
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmpty(event.target.value === "");
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogBackdrop />
      <DialogTrigger asChild>
        <Button>Write a review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>
            Write a review for {product.name}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogBody key={product.id}>
              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Field
                    label="Rating"
                    errorText="This field is required"
                    invalid={isRatingInvalid}
                    required
                  >
                    <Rating
                      name="rating"
                      onChange={() => setIsRatingInvalid(false)}
                    />
                  </Field>
                  <Field
                    label="Comment"
                    errorText="This field is required"
                    required
                    invalid={empty}
                  >
                    <Textarea
                      required={false}
                      name="description"
                      resize="none"
                      height={300}
                      maxLength={500}
                      onChange={handleDescriptionChange}
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
        </DialogHeader>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReviewDialog;
