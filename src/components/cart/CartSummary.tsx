'use client';

import React from 'react';
import { useCart } from '../CartContext';
import { useCurrency } from '../CurrencyContext';

export function CartSummary() {
  const { items, getTotalItems, getTotalCostUSD, getTotalCostCAD, getTotalCostEUR, clearCart } = useCart();
  const { currency } = useCurrency();
  
  const totalItems = getTotalItems();
  const totalUSD = getTotalCostUSD();
  const totalCAD = getTotalCostCAD();
  const totalEUR = getTotalCostEUR();
  
  // Debug logging
  console.log('CartSummary - currency:', currency);
  console.log('CartSummary - totalUSD:', totalUSD);
  console.log('CartSummary - totalCAD:', totalCAD);
  console.log('CartSummary - totalEUR:', totalEUR);
  console.log('CartSummary - items:', items);

  // Determine which total to display based on selected currency
  const displayTotal = currency === 'CAD' ? totalCAD : 
                      currency === 'EUR' ? totalEUR : totalUSD;
  const displayCurrency = currency;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Calculator</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-2">
            Add items from the catalog to calculate your total cost
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Cost Calculator</h2>
        <button
          onClick={clearCart}
          className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Items ({totalItems}):</span>
          <span>${displayCurrency === 'CAD' || displayCurrency === 'EUR' ? Math.round(displayTotal).toLocaleString() : displayTotal.toLocaleString()} {displayCurrency}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total Cost:</span>
            <div className="text-right">
              <div>${displayCurrency === 'CAD' || displayCurrency === 'EUR' ? Math.round(displayTotal).toLocaleString() : displayTotal.toLocaleString()} {displayCurrency}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Cost Breakdown</h3>
          <div className="text-sm text-gray-800 space-y-1">
            {items.map((item) => {
              const itemPrice = currency === 'CAD' ? (item.price_cad || 0) : 
                               currency === 'EUR' ? (item.price_euro || 0) : item.price_usd;
              return (
                <div key={item.id} className="flex justify-between">
                  <span className="truncate" title={item.name}>
                    {item.name.length > 20 ? `${item.name.substring(0, 22)}...` : item.name} × {item.quantity}
                  </span>
                  <span className="font-bold">${currency === 'CAD' || currency === 'EUR' ? Math.round(itemPrice * item.quantity).toLocaleString() : (itemPrice * item.quantity).toLocaleString()} {currency}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
