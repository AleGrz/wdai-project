import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";

export async function DesktopCategoryMenu(categories: Category[]) {
  const subCategories = categories.filter(x => x.parentCategoryId === null);
  return (
    <>
      {subCategories.map(cat => DesktopCategoryMainItem(categories, cat))}
    </>
  )
}

async function DesktopCategoryMainItem(categories: Category[], category: Category) {
  const subCategories = categories.filter(x => x.parentCategoryId === category.id);
  if (subCategories.length === 0) {
    return (
      <Button key={category.id} variant="outline" size="sm">
          {category.name}
      </Button>
    );
  }
  return (
    <>
      <MenuRoot positioning={{ sameWidth: true }}>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            {category.name}
          </Button>
        </MenuTrigger>
        <MenuContent>
          {subCategories.map(cat => CategoryItem(categories, cat))}
        </MenuContent>
      </MenuRoot>
    </>
  )
}

export async function MobileCategoryMenu(categories: Category[]) {
  const subCategories = categories.filter(x => x.parentCategoryId === null);
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Categories
        </Button>
      </MenuTrigger>
      <MenuContent>
<<<<<<< HEAD
        {categories &&
          categories
            .filter((x) => x.parentCategoryId === undefined)
            .map((cat: Category) => CategoryItem(cat.id, cat.name))}
=======
        {subCategories.map(cat => CategoryItem(categories, cat))}
>>>>>>> f6abdea5c5355c63695a3bade2d329b7297656be
      </MenuContent>
    </MenuRoot>
  );
}

<<<<<<< HEAD
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
=======
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
>>>>>>> f6abdea5c5355c63695a3bade2d329b7297656be
