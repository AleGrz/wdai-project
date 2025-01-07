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

export default function ReviewForm({ productId }: { productId: string }) {
  const [isRatingInvalid, setIsRatingInvalid] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const ratingField = event.target.rating;

    // if (ratingField.value === "-1") {
    //   setIsRatingInvalid(true);
    //   ratingField.setCustomValidity("Please select a rating");
    //   ratingField.reportValidity();
    //   return;
    // }

    // setIsRatingInvalid(false);
    // ratingField.setCustomValidity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogBody key={productId}>
        <Fieldset.Root size="lg">
          <Fieldset.Content>
            <Field
              label="Rating"
              errorText="This field is required"
              required
              invalid={isRatingInvalid}
            >
              <Rating
                name="rating"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.value !== "-1") {
                    setIsRatingInvalid(false);
                    event.target.setCustomValidity("");
                  }
                }}
              />
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
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}
