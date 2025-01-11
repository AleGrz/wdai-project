"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";

import { Button } from "@/components/ui/button";

export const DesktopCategoryMenu: React.FC<{ categories: Category[] }> = ({ categories }) => {
  const subCategories = categories.filter(x => x.parentCategoryId === null);

  return (
    <Flex wrap="wrap" justifyContent="center">
      {subCategories.map(cat => <DesktopCategoryMainItem key={cat.id} categories={categories} category={cat} />)}
    </Flex>
  )
}

const DesktopCategoryMainItem: React.FC<{ categories: Category[], category: Category }> = ({ categories, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);

  if (subCategories.length === 0) {
    return (
      <CategoryMenuButton category={category} visibleOutline={true} />
    );
  }

  return (
    <CategoryMenuButton
      category={category}
      visibleOutline={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered  && (
        <VStack
          background="bg.panel"
          position="absolute"
          top="100%"
          boxShadow="md"
          rounded="md"
          align="stretch"
          width="100%"
          zIndex={10}
        >
          {subCategories.map(cat => <DesktopCategorySubItem key={cat.id} categories={categories} category={cat} onClick={() => setIsHovered(false)} />)}
        </VStack>
      )}
    </CategoryMenuButton>
  );
}
const DesktopCategorySubItem: React.FC<{ categories: Category[], category: Category, onClick?: MouseEventHandler<HTMLButtonElement> }> = ({ categories, category, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [left, setLeft] = useState<string | undefined>("100%");
  const [right, setRight] = useState<string | undefined>("auto");
  const [posSet, setPosSet] = useState(false);
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  const handle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
    setIsHovered(false);
  };

  if (subCategories.length === 0) {
    return (
      <CategoryMenuButton category={category} hasArrow={false} onClick={handle} />
    );
  }

  return (
    <CategoryMenuButton
      category={category}
      hasArrow={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}>
      {isHovered && (
        <VStack
          background="bg.panel"
          position="absolute"
          top={0}
          boxShadow="md"
          rounded="md"
          align="stretch"
          zIndex={10}
          left={left}
          right={right}
          ref={el => {
            if (!el || posSet) return;
            const rect = el.getBoundingClientRect();

            setLeft(window.innerWidth - rect.right < 0 ? "auto" : "100%");
            setRight(window.innerWidth - rect.right < 0 ? "100%" : "auto");
            setPosSet(true);
          }}
        >
          {subCategories.map(cat => <DesktopCategorySubItem key={cat.id} categories={categories} category={cat} onClick={handle} />)}
        </VStack>
      )}
    </CategoryMenuButton>
  );
}

export const CategoryMenuButton : React.FC<{
  category: Category,
  children?: React.ReactNode,
  hasArrow?: boolean,
  visibleOutline?: boolean,
  onMouseEnter?: MouseEventHandler<HTMLDivElement>,
  onMouseLeave?: MouseEventHandler<HTMLDivElement>,
  onClick?: MouseEventHandler<HTMLButtonElement>}> =
  ({category, children, hasArrow, visibleOutline, onMouseEnter, onMouseLeave, onClick}) => {
  const router = useRouter();

  return (
    <Box position="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Button key={category.id} width="100%" justifyContent="left"
        variant={visibleOutline ? "outline" : "ghost"} onClick={(event) => {
            if (onClick) onClick(event);
            router.push(`/search?categoryId=${category.id}`);
          }}>
        {category.name}
        {hasArrow && (<LuChevronRight />)}
      </Button>
      {<>{children}</>}
    </Box>
  );
}
