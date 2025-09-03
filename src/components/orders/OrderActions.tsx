import React from 'react';
import Link from 'next/link';

interface OrderActionsProps {
  onContinueShopping?: () => void;
}

export function OrderActions({ onContinueShopping }: OrderActionsProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-center">
        <Link
          href="/catalog"
          onClick={onContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
