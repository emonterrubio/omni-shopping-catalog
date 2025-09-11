export interface ProductCardProps {
  manufacturer: string;
  model: string;
  category: string;
  description?: string;
  price_usd: number;
  price_cad?: number;
  price_euro?: number;
  // For backward compatibility, add these computed properties
  brand?: string;
  price?: number;
  image?: string;
  features?: string;
  recommended?: boolean;
  card_description?: string;
} 