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
  notSuitableFor?: string;
  onQuantityChange?: (qty: number) => void;
  onAddToCart?: () => void;
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
  notSuitableFor,
  onQuantityChange,
  onAddToCart,
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
      <div className="text-2xl lg:text-3xl font-regular">${price ? price.toLocaleString() : '0'}<span className="text-base lg:text-lg font-normal text-gray-500"> USD</span></div>
      {/* Description */}
      <div className="text-base text-gray-800 leading-snug">{description}</div>
      <div>
        {/* Availability */}
        <div className={available ? "font-base text-green-600 font-medium " : "text-red-600 font-medium"}>
          {available ? 'Available Now' : 'Out of Stock'}
        </div>
        {/* Delivery time */}
        <div className="text-gray-600 text-base">Delivery time: <span className="font-semibold">{deliveryTime}</span></div>
      </div>
      {/* Quantity */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>Quantity:</span>
          <select
          className="border rounded px-2 py-1"
          value={quantity}
          onChange={e => onQuantityChange && onQuantityChange(Number(e.target.value))}
          disabled={category === "Laptops" || category === "Laptop" || category === "Desktops" || category === "Desktop"}
        >
          {category === "Laptops" || category === "Laptop" || category === "Desktops" || category === "Desktop"
            ? [1].map(q => <option key={q} value={q}>{q}</option>)
            : [1,2,3,4,5].map(q => <option key={q} value={q}>{q}</option>)
          }
        </select>
      </div>
      {(category === "Laptops" || category === "Laptop" || category === "Desktops" || category === "Desktop") && (
        <span className="text-sm text-gray-500 italic ml-0">Limited to 1 per order*</span>
      )}
      </div>
      {/* add to cart and compare buttons */}
      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors rounded-md font-medium" onClick={onAddToCart}>Add to Cart</button>
        <button className="flex-1 bg-blue-50 text-blue-600 rounded-md py-2 font-medium hover:bg-blue-100 transition text-center" onClick={onCompare}>Compare</button>
      </div>
      {/* disclaimer */}
      <div className="text-gray-600 text-xs mt-2">
        <p>*Laptops and Desktops are limited to 1 per order. Specifications, pricing, and availability are subject to change without notice. Product images are for illustrative purposes only and may differ from the actual item. All warranties, if offered, are provided solely by the manufacturer; please refer to the manufacturer’s documentation for full warranty terms. We make no guarantees regarding compatibility with third-party hardware or software. Taxes, shipping, handling, and other fees (if applicable) are calculated at checkout and are not included in the displayed price. By completing your purchase, you acknowledge that you have read and agree to these terms.</p>
      </div>
    </div>
  );
} 