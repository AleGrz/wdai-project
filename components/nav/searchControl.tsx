import { Flex, Group, Input } from "@chakra-ui/react";
import { RiSearch2Fill } from "react-icons/ri";
import Form from 'next/form'

import { Button } from "@/components/ui/button";

const SearchControl: React.FC = () => {
  return (
    <Form action="/search">
      <Flex gap={0} grow={1} asChild>
        <Group attached>
          <Input
            placeholder="Search" 
            aria-label="Search"
            name="query"
          />
          <Button type="submit" variant="outline">
            <RiSearch2Fill />
          </Button>
        </Group>
      </Flex>
    </Form>
  );
}

export default SearchControl;
