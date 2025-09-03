import React from 'react';
import { CheckCircle, Clock, Truck } from 'lucide-react';

interface OrderStatusProps {
  status: 'pending' | 'delivered' | 'in-transit';
  deliveryDate?: string;
}

export function OrderStatus({ status, deliveryDate }: OrderStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'delivered':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          text: 'Delivered',
          date: deliveryDate ? `on ${deliveryDate}` : ''
        };
      case 'in-transit':
        return {
          icon: Truck,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          text: 'In Transit',
          date: ''
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          text: 'Pending',
          date: ''
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bgColor}`}>
      <IconComponent className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text} {config.date}
      </span>
    </div>
  );
} 