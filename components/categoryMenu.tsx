import { MenuContent, MenuItem, MenuRoot, MenuTriggerItem } from "@chakra-ui/react";

export default async function CategoryMenu() {
  const data = await fetch("/api/category");
  const content = await data.json();
  return (
    <MenuRoot>
      <MenuTriggerItem>Categories</MenuTriggerItem>
      <MenuContent>
        {content && content.map((cat: { id: string; name: string; }) => CategoryItem(cat.id, cat.name))}
      </MenuContent>
    </MenuRoot>
  )

}

async function CategoryItem(categoryId: string, categoryName: string) {
  const data = await fetch(`/api/category/${categoryId}/childrenCategories`);
  const content = await data.json();
  if (!data) {
    return (<MenuItem value={categoryId}>{categoryName}</MenuItem>);
  } else {
    return (
    <MenuRoot>
      <MenuTriggerItem>{categoryName}</MenuTriggerItem>
      <MenuContent>
        {content && content.map((cat: { id: string; name: string; }) => CategoryItem(cat.id, cat.name))}
      </MenuContent>
    </MenuRoot>)
  }
}