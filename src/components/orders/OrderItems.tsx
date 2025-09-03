import React from 'react';
import { OrderItem } from '@/types/orders';
import { OrderItemRow } from './OrderItemRow';

interface OrderItemsProps {
  items: OrderItem[];
}

export function OrderItems({ items }: OrderItemsProps) {
  return (
    <div className="divide-y divide-gray-200 px-2 lg:px-4 py-2">
      {items.map((item, index) => (
        <OrderItemRow key={`${item.model}-${index}`} item={item} />
      ))}
    </div>
  );
} 