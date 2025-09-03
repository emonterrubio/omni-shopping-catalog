import React from 'react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-0 w-full mx-auto">
      {steps.map((step, idx) => (
        <div
          key={step}
          className="relative flex flex-row sm:flex-col flex-1 items-center sm:items-center justify-start sm:justify-center"
        >
          <div
            className={
              `flex items-center justify-center rounded-full font-semibold w-7 h-7 text-base mb-0 sm:mb-2 ` +
              (currentStep === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600')
            }
          >
            {idx + 1}
          </div>
          <span className="ml-3 sm:ml-0 sm:mt-0 text-base font-semibold text-gray-900 text-left sm:text-center">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
} 