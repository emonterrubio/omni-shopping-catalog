"use client";

import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { ProductCardProps } from "@/types/ProductCardProps";
import Link from "next/link";

const PLACEHOLDER_IMAGE = "https://placehold.co/128x128?text=No+Image";

function inferCategory(model: string, category: string): string {
  // First try to use the provided category
  if (category) return category;
  
  // Fallback to model-based inference
  const name = model.toLowerCase();
  if (name.includes("macbook") || name.includes("latitude") || name.includes("xps") || name.includes("surface")) return "Laptops";
  if (name.includes("tower") || name.includes("precision")) return "Desktops";
  if (name.includes("monitor") || name.includes("display")) return "Monitors";
  if (name.includes("headphone") || name.includes("earbud")) return "Audio";
  if (name.includes("mouse") || name.includes("keyboard")) return "Accessories";
  if (name.includes("webcam") || name.includes("camera")) return "Webcams";
  if (name.includes("dock") || name.includes("station")) return "Docking Stations";
  if (name.includes("backpack") || name.includes("bag")) return "Backpacks";
  return "Other";
}

export function ProductCard({ product, fromCatalog = false }: { product: ProductCardProps, fromCatalog?: boolean }) {
  const category = inferCategory(product.model, product.category);
  // For EA products, we'll consider them all eligible
  const isEligible = true;

  // Use manufacturer as brand for EA products
  const brand = product.manufacturer || product.brand || 'Unknown';
  const price = product.price_usd || product.price || 0;
  const priceCad = product.price_cad;
  const image = product.image || PLACEHOLDER_IMAGE;

  console.log("ProductCard brand:", brand);
  console.log("SERVER/CLIENT", typeof window === "undefined" ? "server" : "client", product.model);

  // Cart functionality removed

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace broken image with a placeholder
    e.currentTarget.src = '/images/placeholder-product.svg';
    e.currentTarget.alt = 'Product placeholder';
  };

  return (
    <div className="flex flex-col max-w-md w-full mx-auto h-full bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-full bg-gray-200 relative mb-3 rounded-t-lg">
                <img 
          src={product.image || '/images/placeholder-product.svg'} 
          alt={product.model} 
          className="w-full h-36 object-contain mt-8 -mb-3"
          onError={handleImageError}
        />
      </div>
      <div className="p-5 flex flex-col flex-1 w-full h-full">
        {/* Category */}
        <Link
          href={`/catalog/brand/${encodeURIComponent(brand)}`}
          className="block"
        >
          <span className="text-blue-600 text-base font-medium mb-1 hover:text-blue-800 transition-colors cursor-pointer">
            {brand}
          </span>
        </Link>
        {/* Model Name - Now Clickable */}
        <Link
          href={fromCatalog ? `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}?from=catalog` : `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}`}
          className="block"
        >
          <h3 className="text-2xl leading-tightfont-regular text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
            {product.model}
          </h3>
        </Link>
        {/* Description and Price */}
        <div className="space-y-2 pb-4 flex-1">
          {(product.card_description || product.description) && <div className="text-gray-700 text-base leading-tight">{product.card_description || product.description}</div>}
          <div>
            <div className="text-xl font-bold text-gray-900">
              ${price.toLocaleString()}<span className="text-sm font-normal text-gray-500"> USD</span>
            </div>
            {priceCad && (
              <div className="text-xl font-bold text-gray-900">
                ${priceCad.toLocaleString()}<span className="text-sm font-normal text-gray-500"> CAD</span>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center font-medium text-sm ${isEligible ? "text-green-600" : "text-gray-600"}`}>
            {isEligible ? (
              <CheckCircle className="w-5 h-5 mr-1" />
            ) : (
              // <AlertCircle className="w-5 h-5 mr-1" />
              ""
            )}
            {isEligible ? "Available" : ""}
          </div>
        </div> */}
        {/* Action buttons */}
        <Link
            href={fromCatalog ? `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}?from=catalog` : `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}`}
            className="w-full bg-blue-600 text-white px-2 py-2 hover:bg-blue-700 transition-colors rounded-md font-medium text-center block"
          >
            View Details
          </Link>
      </div>
    </div>
  );
} 