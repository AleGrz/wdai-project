import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

import { GetServerSideProps } from "next";

interface CategoryMenuProps {
  categories: Category[];
}

export default function CategoryMenu({ categories }: CategoryMenuProps) {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Categories
        </Button>
      </MenuTrigger>
      <MenuContent>
        {categories &&
          categories
            .filter((x) => x.parentCategoryId === undefined)
            .map((cat: Category) => CategoryItem(cat.id, cat.name))}
      </MenuContent>
    </MenuRoot>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("http://localhost:3000/api/category");
  const categories = await data.json();
  return {
    props: {
      categories,
    },
  };
};

async function CategoryItem(categoryId: number, categoryName: string) {
  //const data = await fetch(`http://localhost:3000/api/category/${categoryId}/childrenCategories`);
  //const content = await data.json();
  //if (!content || Array.isArray(content) && content.length === 0) {
  return <MenuItem value={categoryId.toString()}>{categoryName}</MenuItem>;
  // } else {
  //   return (
  //   <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
  //     <MenuTriggerItem value={categoryId}>{categoryName}</MenuTriggerItem>
  //     <MenuContent>
  //       {content && content.map((cat: { id: string; name: string; }) => CategoryItem(cat.id, cat.name))}
  //     </MenuContent>
  //   </MenuRoot>)
  // }
}
