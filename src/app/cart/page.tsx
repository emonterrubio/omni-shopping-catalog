'use client';

import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useCart } from '@/components/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { CurrencyToggle } from '@/components/ui/CurrencyToggle';
import { ArrowLeft, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items } = useCart();

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/catalog" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-blue-600 mr-2" />
              Back to Catalog
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <Calculator className="h-8 w-8 text-heritageBlue mt-1.5" />
              <div>
                <h1 className="text-4xl font-regular text-gray-900">
                  Cost Calculator
                </h1>
                <p className="text-gray-600 mt-1">
                  Calculate the total cost for outfitting your team's return to office setup
                </p>
              </div>
            </div>
            <CurrencyToggle />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your calculator is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add items from the catalog to calculate your total cost
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-heritageBlue hover:bg-blue-700 transition-colors"
            >
              Browse Hardware Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Selected Items ({items.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
