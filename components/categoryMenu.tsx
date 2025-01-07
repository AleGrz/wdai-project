import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu";

export async function DesktopCategoryMenu(props : { categories: Category[] }) {
  const subCategories = props.categories.filter(x => x.parentCategoryId === null);
  return (
    <>
      {subCategories.map(cat => DesktopCategoryMainItem(props.categories, cat))}
    </>
  )
}

async function DesktopCategoryMainItem(
  categories: Category[],
  category: Category
) {
  const subCategories = categories.filter(
    (x) => x.parentCategoryId === category.id
  );
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
          {subCategories.map((cat) => CategoryItem(categories, cat))}
        </MenuContent>
      </MenuRoot>
    </>
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
        <MenuItem value={category.id.toString()}>{category.name}</MenuItem>
      )}
    </>
  );
}
