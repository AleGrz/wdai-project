import { Box, Button, Flex, HStack, Input, Image } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import { RiSearch2Fill } from "react-icons/ri";
import Link from "next/link";

export default function WithAction() {
  return (
    <Box px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={16}
      >
        <HStack alignItems={"center"}>
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" height={"7"} />
          </Link>
        </HStack>
        <HStack>
          <Input placeholder="Search" />
          <Button>
            <RiSearch2Fill />
          </Button>
        </HStack>
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
