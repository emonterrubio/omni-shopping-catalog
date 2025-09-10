'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../CartContext';
import { useCurrency } from '../CurrencyContext';
import { QuantityInput } from '../ui/QuantityInput';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { currency } = useCurrency();

  // Determine which price to display based on selected currency
  const displayPrice = currency === 'CAD' ? (item.price_cad || 0) : item.price_usd;
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
    <div className="flex items-center space-x-4 p-6">
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
        <h3 className="text-lg font-medium text-gray-900 truncate">
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
          ${(displayPrice * item.quantity).toLocaleString()}
          <span className="text-sm font-normal text-gray-500"> {displayCurrency}</span>
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
