"use client"; // This file will be a client-side component

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryCard from "../../components/categoryCard";
import ProductCard from "../../components/productCard";
import { Category, Product } from "@prisma/client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const categoryId = parseInt(searchParams.get("categoryId") || "1");

  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const subCategoryResponse = await fetch(
        `http://localhost:3000/api/category/${categoryId}`
      );
      const subCategoryData = await subCategoryResponse.json();
      console.log(subCategoryData);
      setSubCategories(subCategoryData);

      const productResponse = await fetch(
        `http://localhost:3000/api/product?page=${page}&categoryId=${categoryId}`
      );
      const productData = await productResponse.json();
      setProducts(productData);
    }

    fetchData();
  }, [categoryId, page]);

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      {
        <div>
          {subCategories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      }

      {products.length > 0 ? (
        <div>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
