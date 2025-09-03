import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface BrandMenuProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
  productsByBrand: { [brand: string]: any[] };
}

export function BrandMenu({ selectedBrand, onBrandSelect, productsByBrand }: BrandMenuProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAllBrands, setShowAllBrands] = useState(false);
  
  const brands = Object.keys(productsByBrand).sort();
  const displayedBrands = showAllBrands ? brands : brands.slice(0, 10);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Brands</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label={isExpanded ? "Collapse brands" : "Expand brands"}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="space-y-1">
        <button
          onClick={() => onBrandSelect("all")}
          className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
            selectedBrand === "all"
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <div className="flex flex-col items-start">
            <span>All</span>
            <span className="text-xs text-gray-500">
              {Object.values(productsByBrand).reduce((sum, products) => sum + products.length, 0)} items
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </button>
        
        {displayedBrands.map((brand) => {
          const count = productsByBrand[brand].length;
          return (
            <button
              key={brand}
              onClick={() => onBrandSelect(brand)}
              className={`w-full flex items-center justify-between px-3 py-1 text-left rounded-md transition-colors ${
                selectedBrand === brand
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <div className="flex flex-col items-start">
                <span>{brand}</span>
                <span className="text-xs text-gray-500">{count} items</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>
          );
        })}
        
        {brands.length > 10 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="w-full text-left px-3 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {showAllBrands ? "Show less" : "See more"}
          </button>
        )}
        </div>
      )}
    </div>
  );
}
