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
import { useForm } from "react-hook-form";

import { Field } from "@/components/ui/field";
import { Rating } from "@/components/ui/rating";
import { DialogBackdrop, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { addReview } from "@/components/review/serverActions";

interface FormValues {
  rating: number;
  description: string;
}

const ReviewDialog: React.FC<{
  product: Product
}> = ({ product }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState:
    { errors }, reset }
    = useForm<FormValues>();
  const [open, setOpen] = useState(false);
  const onSubmit = handleSubmit(async (data: FormValues) => {
    const { statusCode, message } = await addReview(product.id, data.rating, data.description);

    if (statusCode === 403) {
      setError("root", { type: "manual", message: "You have already reviewed this product!" });

      return;
    } else if (statusCode !== 201) {
      console.error(message);

      return;
    }
    setOpen(false);
    reset();
    router.refresh();
  });

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => { setOpen(e.open); reset() }}>
      <DialogBackdrop />
      <DialogTrigger>
        <Button w={200}>Write a review</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>
            Write a review for {product.name}
          </DialogTitle>
          <form noValidate onSubmit={onSubmit}>
            <DialogBody key={product.id}>
              <Fieldset.Root size="lg">
                <Fieldset.Content>
                  <Field
                    label="Rating"
                    invalid={!!errors.rating}
                    errorText={errors.rating?.message}
                    required
                  >
                    <Rating
                      defaultValue={0}
                      {...register("rating", {
                        required: true,
                        min: {
                          value: 1,
                          message: "Rating is required!"
                        },
                        valueAsNumber: true
                      })}
                    />
                  </Field>
                  <Field
                    label="Comment"
                    invalid={!!errors.description}
                    errorText={errors.description?.message}
                    required
                  >
                    <Textarea
                      resize="none"
                      height={300}
                      {...register("description", {
                        required: {
                          value: true,
                          message: "Comment is required!"
                        },
                        maxLength: 500
                      })}
                    />
                  </Field>
                </Fieldset.Content>
              </Fieldset.Root>
            </DialogBody>
            <DialogFooter>
              <Field
                invalid={!!errors.root}
                errorText={errors.root?.message}
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
