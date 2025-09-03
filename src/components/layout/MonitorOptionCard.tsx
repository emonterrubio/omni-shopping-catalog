import React from 'react';

interface MonitorOptionCardProps {
  name: string;
  details: string;
  eligible: boolean;
}

export function MonitorOptionCard({ name, details, eligible }: MonitorOptionCardProps) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:border-blue-400 transition">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-gray-500">{details}</div>
        {eligible && <div className="text-green-600 text-xs mt-1">Eligible</div>}
      </div>
      <div>{/* Radio button placeholder */}</div>
    </div>
  );
} 