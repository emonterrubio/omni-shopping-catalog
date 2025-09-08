'use client';

import React from 'react';
import { useCurrency } from '../CurrencyContext';

export function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <div className="flex items-center space-x-3">
      <span className="text-base font-regular text-gray-700 whitespace-nowrap">Currency:</span>
      <div className="flex items-center bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => currency !== 'USD' && toggleCurrency()}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currency === 'USD'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          USD
        </button>
        <button
          onClick={() => currency !== 'CAD' && toggleCurrency()}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currency === 'CAD'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          CAD
        </button>
      </div>
    </div>
  );
}
