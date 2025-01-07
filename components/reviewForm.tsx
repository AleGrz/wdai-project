"use client";

import {
  Button,
  DialogBody,
  DialogFooter,
  Fieldset,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "./ui/field";
import { Rating } from "./ui/rating";
import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [isRatingInvalid, setIsRatingInvalid] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const ratingField = event.target.rating;

    if (ratingField.value === "-1") {
      setIsRatingInvalid(true);
      ratingField.setCustomValidity("Please select a rating");
      ratingField.reportValidity();
      return;
    }

    setIsRatingInvalid(false);
    ratingField.setCustomValidity("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogBody>
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
                onChange={(event: any) => {
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
