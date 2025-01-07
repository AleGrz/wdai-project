import { Button } from "@/components/ui/button"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@/components/ui/menu"

export default async function CategoryMenu() {
  const data = await fetch("http://localhost:3000/api/category");
  const content = await data.json();
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button variant="outline" size="sm">
          Categories
        </Button>
      </MenuTrigger>
      <MenuContent>
        {content && content.map((cat: { id: string; name: string; }) => CategoryItem(cat.id, cat.name))}
      </MenuContent>
    </MenuRoot>
  )

}

async function CategoryItem(categoryId: string, categoryName: string) {
  const data = await fetch(`http://localhost:3000/api/category/${categoryId}/childrenCategories`);
  const content = await data.json();
  if (!content) {
    return (<MenuItem value={categoryId}>{categoryName}</MenuItem>);
  } else {
    return (
    <MenuRoot positioning={{ placement: "right-start", gutter: 2 }}>
      <MenuTriggerItem value="">{categoryName}</MenuTriggerItem>
      <MenuContent>
        {content && content.map((cat: { id: string; name: string; }) => CategoryItem(cat.id, cat.name))}
      </MenuContent>
    </MenuRoot>)
  }
}