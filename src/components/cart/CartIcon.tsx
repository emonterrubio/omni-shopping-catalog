'use client';

import React from 'react';
import { Calculator } from 'lucide-react';
import { useCart } from '../CartContext';
import Link from 'next/link';

export function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/cart" className="relative p-2 text-white hover:text-gray-200 transition-colors">
      <Calculator className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
