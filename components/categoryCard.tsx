import { Category } from "@prisma/client";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <a href={`/search/?categoryId=${category.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{category.name}</h3>
        </div>
      </div>
    </a>
  );
}
