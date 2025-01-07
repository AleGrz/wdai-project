"use client";

import { Box, Flex, HStack, Input } from "@chakra-ui/react";
import { Avatar } from "./avatar";
import { InputGroup } from "./input-group";
//import { Search2Icon } from "@chakra-ui/icons";

export default function WithAction() {
  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"}>
          <Box>Logo</Box>
        </HStack>
        <InputGroup flex="1" startElement={<div />}>
          <Input placeholder="Search" />
        </InputGroup>
        <Flex alignItems={"center"}>
          <Avatar
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
}
