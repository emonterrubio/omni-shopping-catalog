import React from 'react';

export function StepProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const percent = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full mb-2">
      <div className="h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-500 rounded" style={{ width: `${percent}%` }} />
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
} 