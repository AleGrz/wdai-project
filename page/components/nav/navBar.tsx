"use server";
import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

import { Category } from "@/types";
import NavButton from "@/components/nav/navButton";
import { DesktopCategoryMenu, MobileCategoryMenu } from "@/components/categoryMenu";
import { getUserData } from "@/app/(auth)/helper";
import SearchControl from "@/components/nav/searchControl";
import AvatarButton from "@/components/nav/avatarButton";

const NavBar: React.FC = async () => {
  const categories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    next: { revalidate: 300 },
  }).then((res) => !res.ok ? [] : res.json()) as Category[];
  const user = await getUserData(false);

  return (
    <Box px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap="10%"
      >
        <Box
          height={7}
          width={200}
          justifyContent="center"
          position="relative"
          asChild
        >
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Logo"
              loading="eager"
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          </Link>
        </Box>
        <Flex grow={1} asChild display={{ base: "none", md: "flex" }}>
          <SearchControl />
        </Flex>
        <Flex justifyContent="flex-end" gap={5}>
          {user ? (
            <>
              <AvatarButton name={user.firstName + " " + user.lastName} />
              <NavButton route={`/cart/${user.id}`}>
                <FaShoppingCart />
              </NavButton>
            </>
          ) : (
            <>
              <NavButton route="/login">Log in</NavButton>
              <NavButton route="/signup">Sign up</NavButton>
            </>
          )}
        </Flex>
      </Flex>
      <Flex grow={1} asChild display={{ base: "flex", md: "none" }}>
        <SearchControl />
      </Flex>
      <DesktopCategoryMenu categories={categories}/>
      <MobileCategoryMenu categories={categories}/>
    </Box>
  );
};

export default NavBar;
