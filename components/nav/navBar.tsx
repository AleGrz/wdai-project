import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { Category } from "@prisma/client";
import { FaShoppingCart } from "react-icons/fa";

import NavButton from "@/components/nav/navButton";
import { DesktopCategoryMenu } from "@/components/categoryMenu";
import { getUserData } from "@/app/api/auth/helper";
import { Avatar } from "@/components/ui/avatar";
import SearchControl from "@/components/nav/searchControl";
import LogoutButton from "@/components/nav/logoutButton";

const NavBar: React.FC = async () => {
  const categories = (await fetch("http://localhost:3000/api/category", {
    next: { revalidate: 300 },
  }).then((data) => data.json())) as Category[];
  const user = await getUserData();

  return (
    <Box px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={200}
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
        <Flex grow={1} asChild>
          <SearchControl />
        </Flex>
        <Flex justifyContent="flex-end" gap={5} width={200}>
          {user ? (
            <>
              <Avatar size={"sm"} name={user.firstName + " " + user.lastName} />
              <LogoutButton>Log out</LogoutButton>
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
      <DesktopCategoryMenu categories={categories} />
    </Box>
  );
};

export default NavBar;
