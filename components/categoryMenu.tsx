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
import { Box, Stack, VStack } from "@chakra-ui/react";

export function DesktopCategoryMenu(props : { categories: Category[] }) {
  const subCategories = props.categories.filter(x => x.parentCategoryId === null);
  return (
    <Stack direction={"row"}>
      {subCategories.map(cat => <DesktopCategoryMainItem key={cat.id} categories={props.categories} category={cat} />)}
    </Stack>
  )
}

const DesktopCategoryMainItem: React.FC<{ categories: Category[], category: Category }> = ({ categories, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  if (subCategories.length === 0) {
    return (
      <GetButton category={category} />
    );
  }
  return (
    <GetButton
      category={category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered  && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          boxShadow="md"
          rounded="md"
          align="stretch"
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
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  if (subCategories.length === 0) {
    return (
      <GetButton category={category} />
    );
  }
  return (
    <GetButton
      category={category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered  && (
        <VStack
          position="absolute"
          top={0}
          left="100%"
          boxShadow="md"
          rounded="md"
          align="stretch"
          zIndex={10}
          width="100%"
        >
          {subCategories.map(cat => <DesktopCategorySubItem key={cat.id} categories={categories} category={cat} />)}
        </VStack>
      )}
    </GetButton>
  );
}

function GetButton(props: { category: Category, children?: React.ReactNode, onMouseEnter?: MouseEventHandler<HTMLDivElement>, onMouseLeave?: MouseEventHandler<HTMLDivElement> }) {
  const router = useRouter();
  return (
    <Box position="relative" onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <Button variant="outline" key={props.category.id} onClick={() => {router.push(`/search?categoryId=${props.category.id}`)}}>
        {props.category.name}
      </Button>
      {props.children && <>{props.children}</>}
    </Box>
  );
}

export async function MobileCategoryMenu(props : { categories: Category[] }) {
  const subCategories = props.categories.filter(x => x.parentCategoryId === null);
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Categories
        </Button>
      </MenuTrigger>
      <MenuContent>
        {subCategories.map(cat => CategoryItem(props.categories, cat))}
      </MenuContent>
    </MenuRoot>
  );
}

async function CategoryItem(categories: Category[], category: Category) {
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  return (
    <>
      {subCategories.length > 0 ? (
        <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
          <MenuTriggerItem value={category.id.toString()}>
            {category.name}
          </MenuTriggerItem>
          <MenuContent>
            {subCategories.map(cat => CategoryItem(categories, cat))}
          </MenuContent>
        </MenuRoot>
      ) : (
        <MenuItem value={category.id.toString()}>{category.name}</MenuItem>
      )}
    </>
  );
}
