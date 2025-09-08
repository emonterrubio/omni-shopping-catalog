'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '../CartContext';
import { useCurrency } from '../CurrencyContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { currency } = useCurrency();
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  // Determine which price to display based on selected currency
  const displayPrice = currency === 'CAD' ? (item.price_cad || 0) : item.price_usd;
  const displayCurrency = currency;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
    setInputValue(newQuantity.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      updateQuantity(item.id, numericValue);
    } else {
      // Reset to current quantity if invalid input
      setInputValue(item.quantity.toString());
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  // Sync input value when item quantity changes externally
  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  return (
    <div className="flex items-center space-x-4 p-6 border-b border-gray-200 last:border-b-0">
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

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
          className="text-lg font-medium text-gray-900 w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

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
