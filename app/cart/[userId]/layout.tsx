import { Flex } from "@chakra-ui/react";
import React from "react";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Flex>{children}</Flex>;
}
