'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../CartContext';
import { useCurrency } from '../CurrencyContext';
import { QuantityInput } from '../ui/QuantityInput';
import { formatCurrency } from '../../utils/currency';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { currency } = useCurrency();

  // Debug logging
  console.log('CartItem - item:', item);
  console.log('CartItem - currency:', currency);
  console.log('CartItem - price_euro:', item.price_euro);

  // Determine which price to display based on selected currency
  const displayPrice = currency === 'CAD' ? (item.price_cad || 0) : 
                      currency === 'EUR' ? (item.price_euro || 0) : item.price_usd;
  const displayCurrency = currency;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900">
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {item.description || `${item.brand} • ${item.category}`}
            </p>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <QuantityInput
            value={item.quantity}
            onChange={handleQuantityChange}
            min={1}
            max={999}
            showTrashIcon={true}
          />
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(displayPrice * item.quantity, displayCurrency)}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            {item.description || `${item.brand} • ${item.category}`}
          </p>
        </div>

        <QuantityInput
          value={item.quantity}
          onChange={handleQuantityChange}
          min={1}
          max={999}
          showTrashIcon={true}
        />

        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {formatCurrency(displayPrice * item.quantity, displayCurrency)}
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
