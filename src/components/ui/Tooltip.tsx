"use client";

import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  content: string;
  maxWidth?: string;
  children: ReactNode;
}

export function Tooltip({ content, maxWidth = "240px", children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Convert maxWidth to a more explicit style with better width control
  const tooltipStyle = {
    maxWidth: maxWidth,
    width: 'max-content',
    minWidth: '150px',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '4px',
    // Force the width to be respected
    boxSizing: 'border-box' as const
  };

  // Debug logging to help troubleshoot
  console.log('Tooltip maxWidth:', maxWidth, 'Style:', tooltipStyle);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg whitespace-normal break-words"
          style={{
            ...tooltipStyle,
            // Use CSS custom property for better control
            '--tooltip-max-width': maxWidth,
            maxWidth: `var(--tooltip-max-width, ${maxWidth})`
          } as React.CSSProperties}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}
