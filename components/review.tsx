import { Review } from "@prisma/client";

export default function ReviewLabel({ review }: { review: Review }) {
  return (
    <>
      <h1>{review.rating}</h1>
      <p>{review.description}</p>
    </>
  );
}
