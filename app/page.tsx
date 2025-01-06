import { Category } from "@prisma/client";
import CategoryCard from "../components/categoryCard";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/category");
  const categories = await response.json();

  return categories.map((category: Category) => (
    <CategoryCard category={category} />
  ));
}
