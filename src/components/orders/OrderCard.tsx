import React from 'react';
import { Order } from '@/types/orders';
import { OrderHeader } from './OrderHeader';
import { OrderItems } from './OrderItems';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <OrderHeader order={order} />
      <OrderItems items={order.items} />
    </div>
  );
} 