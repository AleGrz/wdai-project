import { Rating } from '@/components/ui/rating';
import { Avatar } from '@/components/ui/avatar';
import { Box, Flex } from '@chakra-ui/react';
import type { Prisma } from '@prisma/client';

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;
export default function ReviewLabel({ review }: { review: ReviewWithUser }) {
  return (
    <Box>
      <Flex alignItems={"center"} gap={5}>
        <Avatar variant="subtle" name={review.user.firstName + " " + review.user.lastName} />
        <Box w={800}>
          <h2>{review.user.firstName + " " + review.user.lastName}</h2>
          <Rating readOnly defaultValue={review.rating} size="md" />
          <p>{review.description}</p>
        </Box>
      </Flex>
    </Box>
  );
}
