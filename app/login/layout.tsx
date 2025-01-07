import { Flex } from "@chakra-ui/react";
import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h="80vh">
      {children}
    </Flex>
  );
}
