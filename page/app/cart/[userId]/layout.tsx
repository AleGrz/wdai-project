import { Flex } from "@chakra-ui/react";
import React from "react";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex justifyContent={"center"} direction="column" alignItems={"center"} padding={10} gap={5}>
      {children}
    </Flex>
  );
}
