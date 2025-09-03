import React from 'react';

interface ProductImageGalleryProps {
  mainImage: string;
}

export function ProductImageGallery({ mainImage }: ProductImageGalleryProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Replace broken image with a placeholder
    e.currentTarget.src = '/images/placeholder-product.svg';
    e.currentTarget.alt = 'Product placeholder';
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main image */}
      <div className="mb-4 w-full aspect-video rounded-lg flex items-center justify-center">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt="Product" 
            className="object-contain max-h-80 mx-auto" 
            onError={handleImageError}
          />
        ) : (
          <img 
            src="/images/placeholder-product.svg" 
            alt="Product placeholder" 
            className="object-contain max-h-80 mx-auto" 
          />
        )}
      </div>
    </div>
  );
} 