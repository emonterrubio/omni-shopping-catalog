'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  model: string;
  name: string;
  brand: string;
  category: string;
  description?: string;
  price_usd: number;
  price_cad?: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalCostUSD: () => number;
  getTotalCostCAD: () => number;
  isInCart: (id: string) => boolean;
  getCartItemQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity by 1
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCostUSD = () => {
    return items.reduce((total, item) => total + (item.price_usd * item.quantity), 0);
  };

  const getTotalCostCAD = () => {
    return items.reduce((total, item) => {
      const cadPrice = item.price_cad || 0;
      return total + (cadPrice * item.quantity);
    }, 0);
  };

  const isInCart = (id: string) => {
    return items.some(item => item.id === id);
  };

  const getCartItemQuantity = (id: string) => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalCostUSD,
    getTotalCostCAD,
    isInCart,
    getCartItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
