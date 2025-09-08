'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'USD' | 'CAD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'CAD' : 'USD');
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    toggleCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
