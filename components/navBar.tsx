import { Avatar } from "./ui/avatar";
import { RiSearch2Fill } from "react-icons/ri";
import Link from "next/link";
import { Button } from "./ui/button";
import { Box, Flex, Input } from "@chakra-ui/react";
import Image from "next/image";
import { DesktopCategoryMenu } from "@/components/categoryMenu";
import { Category } from "@prisma/client";

const NavBar: React.FC = async () => {
  const categories = await fetch("http://localhost:3000/api/category", { next: { revalidate: 300 } }).then(
    (data) => data.json()
  ) as Category[];
  return (
    <Box px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={200}
      >
        <Box height={7} width={200} justifyContent="center" position="relative">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" layout="fill" objectFit="contain" loading="eager" />
          </Link>
        </Box>
        <Flex grow={1}>
          <Input placeholder="Search" />
          <Button variant="outline">
            <RiSearch2Fill />
          </Button>
        </Flex>
        <Flex justifyContent="flex-end" width={200}>
          <Avatar
            size={"sm"}
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </Flex>
      </Flex>
      <DesktopCategoryMenu categories={categories} />
    </Box>
  );
}
export default NavBar;
