import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../CartContext';
import { useCurrency } from '../CurrencyContext';

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
  const { addToCart, isInCart } = useCart();
  const { currency } = useCurrency();

  // Determine which price to display based on selected currency
  const displayPrice = currency === 'CAD' ? (price_cad || 0) : price;
  const displayCurrency = currency;

  const handleAddToCart = () => {
    addToCart({
      id: sku,
      model: title,
      name: title,
      brand: brand,
      category: category || 'Other',
      description: description,
      price_usd: price,
      price_cad: price_cad,
      image: '/images/placeholder-product.svg', // You might want to pass the actual image
    });
  };
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
        <div className="text-2xl lg:text-3xl font-regular">${displayPrice ? displayPrice.toLocaleString() : '0'}<span className="text-sm lg:text-base font-normal text-gray-500"> {displayCurrency}</span></div>
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

      {/* Add to Calculator Button */}
      <div className="pt-4">
        <button
          onClick={handleAddToCart}
          className={`w-full px-6 py-3 rounded-md font-medium text-center transition-colors flex items-center justify-center space-x-2 ${
            isInCart(sku)
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-heritageBlue text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>{isInCart(sku) ? 'Added to Calculator' : 'Add to Calculator'}</span>
        </button>
      </div>
    </div>
  );
} 