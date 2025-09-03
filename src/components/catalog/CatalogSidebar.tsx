import React from "react";
import { CategoryMenu } from "./CategoryMenu";
import { BrandMenu } from "./BrandMenu";

interface CatalogSidebarProps {
  selectedCategory: string;
  selectedBrand: string;
  onCategorySelect: (category: string) => void;
  onBrandSelect: (brand: string) => void;
  productsByBrand: { [brand: string]: any[] };
}

export function CatalogSidebar({
  selectedCategory,
  selectedBrand,
  onCategorySelect,
  onBrandSelect,
  productsByBrand,
}: CatalogSidebarProps) {
  return (
    <div className="h-full flex-shrink-0">
      <CategoryMenu
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />
    </div>
  );
}
