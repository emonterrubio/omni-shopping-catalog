import React from "react";
import { categories } from "../../data/eaProductData";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { eaProductData } from "../../data/eaProductData";

interface Category {
  name: string;
  iconName: string;
}

function CategoryCard({ category, count }: { category: Category; count: number }) {
  const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Package;
  return (
    <button
      className="flex items-center bg-white border border-gray-200 rounded-md px-4 py-3 w-full hover:shadow-md transition-all"
      type="button"
    >
      <Icon className="w-6 h-6 text-blue-600 mr-3" />
      <div className="flex flex-col items-start">
        <span className="text-base font-bold text-gray-800">{category.name}</span>
        <span className="text-sm font-regular text-gray-600">{count} items</span>
      </div>
    </button>
  );
}

export function Categories() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
        {categories.map((category: Category, idx: number) => {
          let count;
          if (category.name.toLowerCase() === "laptops") {
            count = eaProductData.laptops.length;
          } else if (category.name.toLowerCase() === "monitors") {
            count = eaProductData.monitors.length;
          } else if (category.name.toLowerCase() === "docking stations") {
            count = eaProductData.dockingStations.length;
          } else if (category.name.toLowerCase() === "headsets") {
            count = eaProductData.headsets.length;
          } else {
            count = 0;
          }
          
          // Convert category names to URL slugs
          const getCategorySlug = (categoryName: string): string => {
            switch (categoryName.toLowerCase()) {
              case 'laptops':
                return 'laptops';
              case 'monitors':
                return 'monitors';
              case 'docking stations':
                return 'docking-stations';
              case 'headsets':
                return 'headsets';
              default:
                return categoryName.toLowerCase().replace(/\s+/g, '-');
            }
          };
          
          return (
            <Link
              key={category.name + idx}
              href={`/catalog/${getCategorySlug(category.name)}`}
              className="block"
            >
              <CategoryCard category={category} count={count} />
            </Link>
          );
        })}
      </div>
    </section>
  );
} 