import type { Prisma } from '@prisma/client';

import { Box, Flex } from '@chakra-ui/react';

import { Rating } from '@/components/ui/rating';
import { Avatar } from '@/components/ui/avatar';

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true };
}>;
const ReviewLabel: React.FC<{
  review: ReviewWithUser
}> = async ({ review }) =>{
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

export default ReviewLabel;
