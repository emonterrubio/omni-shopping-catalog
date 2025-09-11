'use client';

import React from 'react';
import { useCurrency } from '../CurrencyContext';

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-1">
      <button
        onClick={() => setCurrency('USD')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
          currency === 'USD'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
      >
        USD
      </button>
      <button
        onClick={() => setCurrency('CAD')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
          currency === 'CAD'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
      >
        CAD
      </button>
      <button
        onClick={() => setCurrency('EUR')}
        className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
          currency === 'EUR'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-white/80 hover:text-white'
        }`}
      >
        EUR
      </button>
    </div>
  );
}
