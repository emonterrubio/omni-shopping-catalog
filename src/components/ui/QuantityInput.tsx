'use client';
import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantityInputProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
  showTrashIcon?: boolean;
}

export function QuantityInput({ 
  value, 
  onChange, 
  min = 1, 
  max = 999, 
  className = "",
  disabled = false,
  showTrashIcon = false
}: QuantityInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleQuantityChange = (newQuantity: number) => {
    // If showing trash icon and trying to go below min, trigger removal
    if (showTrashIcon && newQuantity < min) {
      onChange(0); // Signal removal
      return;
    }
    
    const clampedQuantity = Math.max(min, Math.min(max, newQuantity));
    onChange(clampedQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const numericValue = parseInt(inputValue, 10);
    if (isNaN(numericValue) || numericValue < min) {
      setInputValue(value.toString());
    } else {
      const clampedQuantity = Math.max(min, Math.min(max, numericValue));
      onChange(clampedQuantity);
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => handleQuantityChange(value - 1)}
        disabled={disabled || (value <= min && !showTrashIcon)}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        aria-label={value <= min && showTrashIcon ? "Remove item" : "Decrease quantity"}
      >
        {value <= min && showTrashIcon ? (
          <Trash2 className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyPress={handleInputKeyPress}
        disabled={disabled}
        className="text-lg font-medium text-gray-900 w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      
      <button
        onClick={() => handleQuantityChange(value + 1)}
        disabled={disabled || value >= max}
        className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
