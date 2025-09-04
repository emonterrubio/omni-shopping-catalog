import React from 'react';
import { ComparisonProductCard } from './ProductComparisonCard';

interface Product {
  image?: string;
  brand: string;
  model: string;
  description?: string;
  card_description?: string;
  features?: string;
  price: number;
  price_cad?: number;
  processor?: string;
  category?: string;
  [key: string]: any;
}

interface ProductComparisonListProps {
  products: Product[];
  getProductSpecs: (product: Product) => { label: string; value: any }[];
  noBackground?: boolean; // New prop to control card background and shadow
}

export function ProductComparisonList({ products, getProductSpecs, noBackground = false }: ProductComparisonListProps) {
  if (!products || products.length === 0) return null;
  return (
    <div className={noBackground ? "" : "mt-8"}>
      {!noBackground && <h2 className="text-2xl font-medium mb-4">Compare with similar items</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {products.map((p: Product, idx: number) => (
          <ComparisonProductCard
            key={p.model + idx}
            image={p.image || 'https://placehold.co/400x300?text=Product'}
            brand={p.brand}
            model={p.model}
            description={p.description || ''}
            card_description={p.card_description}
            features={p.features || ''}
            subFeatures={p.features ? p.features.split(',').map((f: string) => f.trim()) : []}
            price={p.price}
            price_cad={p.price_cad}
            chip={p.processor || p.category || ''}
            specs={getProductSpecs ? getProductSpecs(p) : []}
            noBackground={noBackground}
          />
        ))}
      </div>
    </div>
  );
} 