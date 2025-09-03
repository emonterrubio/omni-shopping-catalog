import React from 'react';
import { BillingInfo, ShippingInfo, OrderItem } from './types';
import { OrderProductList } from './OrderProductList';

interface OrderSummaryCardProps {
  orderNumber: string;
  orderDate: string;
  billing: BillingInfo;
  shipping: ShippingInfo;
  shippingType: string;
  total: number;
  items: OrderItem[];
}

export function OrderSummaryCard({ 
  orderNumber, 
  orderDate, 
  billing, 
  shipping, 
  shippingType, 
  total,
  items
}: OrderSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 px-4 lg:px-0">
      {/* Order Details Header */}
      <div className="px-4 lg:px-8 pt-6 lg:pt-8">   
        {/* Order Number Header */}
        <div className="text-lg font-regular text-gray-900 mb-4">{'Order'.toUpperCase()} # {orderNumber}</div>
        <div className="border-b border-gray-200"></div>
        
        {/* Mobile: Two-column grid layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Order Number</span>
              <span className="text-base text-gray-900 font-bold">{orderNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Order Date</span>
              <span className="text-base text-gray-900 font-bold">{orderDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Ordered for</span>
              <span className="text-base text-gray-900 font-bold">{shipping.firstName} {shipping.lastName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Ordered by</span>
              <span className="text-base text-gray-900 font-bold">{billing.name} {billing.lastName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Order Total</span>
              <span className="text-base text-gray-900 font-bold">${total.toLocaleString()}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-regular text-sm text-gray-700">Shipping to</span>
              <span className="text-base text-gray-900 font-bold">
                {shippingType === 'residential' ? 'Residential' : 'Office'}
              </span>
              <span className="text-sm text-gray-600 mt-1">
                {shipping.address1}
                {shipping.city && `, ${shipping.city}`}
                {shipping.state && `, ${shipping.state}`}
                {shipping.zip && ` ${shipping.zip}`}
                {shipping.country && `, ${shipping.country}`}
              </span>
            </div>
          </div>
        </div>
        
        {/* Desktop: Original horizontal layout */}
        <div className="hidden lg:flex mt-4 gap-12">
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-gray-900">Ordered by</h2>
            <div className="text-base font-regular text-gray-900">
              {billing.name} {billing.lastName}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-gray-900">Ordered for</h2>
            <div className="text-base font-regular text-gray-900">
              {shipping.firstName} {shipping.lastName}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-gray-900">Order submitted</h2>
            <div className="text-base font-regular text-gray-900">{orderDate}</div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-gray-900">
              Shipping to {shippingType === 'residential' ? 'Residential Address' : 'Office Address'}: &nbsp;
            </h2>
            <div className="text-base font-regular text-gray-900">
              {shipping.address1}
              {shipping.city && `, ${shipping.city}`}
              {shipping.state && `, ${shipping.state}`}
              {shipping.zip && ` ${shipping.zip}`}
              {shipping.country && `, ${shipping.country}`}
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Section */}
      <OrderProductList items={items} />
    </div>
  );
}
