"use client";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { Box, Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";

export function DesktopCategoryMenu(props : { categories: Category[] }) {
  const subCategories = props.categories.filter(x => x.parentCategoryId === null);
  return (
    <Flex wrap="wrap" justifyContent="center">
      {subCategories.map(cat => <DesktopCategoryMainItem key={cat.id} categories={props.categories} category={cat} />)}
    </Flex>
  )
}

const DesktopCategoryMainItem: React.FC<{ categories: Category[], category: Category }> = ({ categories, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  if (subCategories.length === 0) {
    return (
      <GetButton category={category} visibleOutline={true} />
    );
  }
  return (
    <GetButton
      category={category}
      visibleOutline={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered  && (
        <VStack
          background="bg.panel"
          outline={0}
          position="absolute"
          top="100%"
          left={0}
          boxShadow="lg"
          rounded="md"
          align="stretch"
          color="fg"
          zIndex={10}
          width="100%"
        >
          {subCategories.map(cat => <DesktopCategorySubItem key={cat.id} categories={categories} category={cat} />)}
        </VStack>
      )}
    </GetButton>
  );
}
const DesktopCategorySubItem: React.FC<{ categories: Category[], category: Category }> = ({ categories, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [left, setLeft] = useState<string | undefined>("100%");
  const [right, setRight] = useState<string | undefined>("auto");
  const [posSet, setPosSet] = useState(false);
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  if (subCategories.length === 0) {
    return (
      <GetButton category={category} hasArrow={false} />
    );
  }
  return (
    <GetButton
      category={category}
      hasArrow={true}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
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
            setLeft(window.innerWidth - rect.right < el.offsetWidth ? "auto" : "100%");
            setRight(window.innerWidth - rect.right < el.offsetWidth ? "100%" : "auto");
            setPosSet(true);
          }}
        >
          {subCategories.map(cat => <DesktopCategorySubItem key={cat.id} categories={categories} category={cat} />)}
        </VStack>
      )}
    </GetButton>
  );
}


function GetButton(props: {
  category: Category,
  children?: React.ReactNode,
  hasArrow?: boolean,
  visibleOutline?: boolean,
  onMouseEnter?: MouseEventHandler<HTMLDivElement>,
  onMouseLeave?: MouseEventHandler<HTMLDivElement> }) {
  const router = useRouter();
  return (
    <Box position="relative" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <Button key={props.category.id} width="100%" justifyContent="left"
        variant={props.visibleOutline ? "outline" : "ghost"} onClick={() => {router.push(`/search?categoryId=${props.category.id}`)}}>
        {props.category.name}
        {props.hasArrow && (<LuChevronRight />)}
      </Button>
      {<>{props.children}</>}
    </Box>
  );
}

export async function MobileCategoryMenu(props: { categories: Category[] }) {
  const subCategories = props.categories.filter(
    (x) => x.parentCategoryId === null
  );
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Categories
        </Button>
      </MenuTrigger>
      <MenuContent>
        {subCategories.map((cat) => CategoryItem(props.categories, cat))}
      </MenuContent>
    </MenuRoot>
  );
}

async function CategoryItem(categories: Category[], category: Category) {
  const subCategories = categories.filter(
    (x) => x.parentCategoryId === category.id
  );
  return (
    <>
      {subCategories.length > 0 ? (
        <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
          <MenuTriggerItem value={category.id.toString()}>
            {category.name}
          </MenuTriggerItem>
          <MenuContent>
            {subCategories.map((cat) => CategoryItem(categories, cat))}
          </MenuContent>
        </MenuRoot>
      ) : (
        <a href={`/search/?categoryId=${category.id}`}>
          <MenuItem value={category.id.toString()}>{category.name}</MenuItem>
        </a>
      )}
    </>
  );
}
