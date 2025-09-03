import React, { useState } from 'react';

interface CostCenterProps {
  value?: string;
  onChange?: (costCenter: string) => void;
  className?: string;
}

export function CostCenter({ value, onChange, className = "" }: CostCenterProps) {
  const [costCenterInput, setCostCenterInput] = useState(value || '');

  const handleApplyCostCenter = () => {
    const trimmedValue = costCenterInput.trim();
    if (onChange) {
      onChange(trimmedValue);
    }
  };

  return (
    <div className={`bg-white rounded-md border border-gray-200 p-6 h-fit ${className}`}>
      <h3 className="text-2xl font-medium tracking-normal mb-1">Cost Center</h3>
      <p className="text-gray-500 mb-2">Expedite your check out</p>
      <div className="flex gap-2">
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-base"
          placeholder="Enter cost center"
          value={costCenterInput}
          onChange={e => setCostCenterInput(e.target.value)}
        />
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-regular text-base hover:bg-blue-700 transition" 
          type="button" 
          onClick={handleApplyCostCenter}
        >
          Apply
        </button>
      </div>
    </div>
  );
} 