"use client";

import React, { useState } from "react";
import { CheckCircle, AlertCircle, ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/types/ProductCardProps";
import { useCart } from "@/components/CartContext";
import { useCurrency } from "@/components/CurrencyContext";
import { QuantityInput } from "./QuantityInput";
import { formatCurrency } from "../../utils/currency";
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
  const { addToCart, isInCart } = useCart();
  const { currency } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const category = inferCategory(product.model, product.category);
  // For EA products, we'll consider them all eligible
  const isEligible = true;

  // Use manufacturer as brand for EA products
  const brand = product.manufacturer || product.brand || 'Unknown';
  const price = product.price_usd || product.price || 0;
  const priceCad = product.price_cad;
  const priceEuro = product.price_euro;
  const image = product.image || PLACEHOLDER_IMAGE;

  // Determine which price to display based on selected currency
  const displayPrice = currency === 'CAD' ? (priceCad || 0) : 
                      currency === 'EUR' ? (priceEuro || 0) : price;
  const displayCurrency = currency;

  console.log("ProductCard brand:", brand);
  console.log("SERVER/CLIENT", typeof window === "undefined" ? "server" : "client", product.model);

  const handleQuantityChange = (newQuantity: number) => {
    // Ensure quantity doesn't go below 1 in ProductCard
    setQuantity(Math.max(1, newQuantity));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.model,
      model: product.model,
      name: product.model,
      brand: brand,
      category: category,
      description: product.card_description || product.description,
      price_usd: price,
      price_cad: priceCad,
      price_euro: priceEuro,
      image: image,
    }, quantity);
  };

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
        {/* Description, Quantity, and Price */}
        <div className="space-y-2 pb-4 flex-1">
          {(product.card_description || product.description) && <div className="text-gray-700 text-base leading-tight">{product.card_description || product.description}</div>}
        </div>

        {/* Price, Quantity, Add to Calculator and View Details Buttons */}
        <div className="space-y-2">
          {/* Quantity and Price */}
          <div className="flex items-center justify-between py-2">
            {/* Price */}
            <div className="text-xl font-bold text-gray-900">
              {formatCurrency(displayPrice, displayCurrency)}
            </div>
            
            {/* Quantity Input */}
            <div className="flex justify-center">
             <QuantityInput
               value={quantity}
               onChange={handleQuantityChange}
               min={1}
               max={999}
               showTrashIcon={false}
             />
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-full px-2 py-2 rounded-md font-medium text-center transition-colors flex items-center justify-center space-x-2 ${
              isInCart(product.model)
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-heritageBlue text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{isInCart(product.model) ? 'Added to Calculator' : 'Add to Calculator'}</span>
          </button>
          
          <Link
            href={fromCatalog ? `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}?from=catalog` : `/product/${product.model.toLowerCase().replace(/\s+/g, "-")}`}
            className="w-full bg-gray-100 text-gray-700 px-2 py-2 hover:bg-gray-200 transition-colors rounded-md font-medium text-center block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 