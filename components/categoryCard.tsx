import type { Category } from "@prisma/client";

import Link from "next/link";

const CategoryCard: React.FC<{
  category: Category
}> = async ({ category }) => {
  return (
    <Link prefetch={true} href={`/search/?categoryId=${category.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h3 className="font-semibold text-lg">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
