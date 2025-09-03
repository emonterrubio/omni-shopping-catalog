import React from 'react';

interface OrderDetailsHeaderProps {
  orderNumber: string;
  orderDate: string;
}

export function OrderDetailsHeader({ orderNumber, orderDate }: OrderDetailsHeaderProps) {
  return (
    <div className="text-left mb-4 lg:mb-8 px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-4">Order Details</h1>
      <p className="text-base font-regular text-gray-800 mb-4">
        Your order has been submitted for manager approval. We'll send you confirmation of approval and when your item(s) will be on the way.
      </p>
    </div>
  );
}
