import React from 'react';
import Link from 'next/link';

interface ProductInfoPanelProps {
  brand: string;
  title: string;
  sku: string;
  price: number;
  price_cad?: number;
  available: boolean;
  deliveryTime: string;
  description: string;
  quantity: number;
  category?: string;
  intendedFor?: string;
  suitableFor?: string;
  notSuitableFor?: string;
  onQuantityChange?: (qty: number) => void;
  // Cart functionality removed
  onCompare?: () => void;
}

export function ProductInfoPanel({
  brand,
  title,
  sku,
  price,
  price_cad,
  available,
  deliveryTime,
  description,
  quantity,
  category,
  intendedFor,
  suitableFor,
  notSuitableFor,
  onQuantityChange,
  // Cart functionality removed
  onCompare,
}: ProductInfoPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        {/* brand */}
        <Link href={`/catalog/brand/${encodeURIComponent(brand)}`} className="text-lg font-regular text-blue-600 hover:underline block">
          {brand}
        </Link>
        {/* title */}
        <h1 className="text-4xl lg:text-5xl font-regular tracking-normal">{title}</h1>
      </div>
      {/* price */}
      <div className="space-y-1">
        <div className="text-2xl lg:text-3xl font-regular">${price ? price.toLocaleString() : '0'}<span className="text-sm lg:text-base font-normal text-gray-500"> USD</span></div>
        {price_cad && price_cad > 0 && (
          <div className="text-2xl lg:text-3xl font-regular">${price_cad.toLocaleString()}<span className="text-sm lg:text-base font-normal text-gray-500"> CAD</span></div>
        )}
      </div>
      {/* Description */}
      <div className="text-base text-gray-800 leading-snug">
        {description}
        {suitableFor && (
          <span> <strong>Suitable for:</strong> {suitableFor}</span>
        )}
        {intendedFor && (
          <span> <strong>Intended for:</strong> {intendedFor}</span>
        )}
        {notSuitableFor && (
          <span> <strong>Not suitable for:</strong> {notSuitableFor}</span>
        )}
      </div>
    </div>
  );
} 