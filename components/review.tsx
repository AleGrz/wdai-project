import { Rating } from '@/components/ui/rating';
import { Avatar } from '@/components/ui/avatar';
import { Box, Flex } from '@chakra-ui/react';

export default function ReviewLabel({ review }: { review: { rating: number, description: string, userFullName: string } }) {
  return (
    <Box>
      <Flex alignItems={"center"} gap={5}>
        <Avatar variant="subtle" name={review.userFullName} />
        <Box w={800}>
          <h2>{review.userFullName}</h2>
          <Rating readOnly defaultValue={review.rating} size="md" />
          <p>{review.description}</p>
        </Box>
      </Flex>
    </Box>
  );
}
