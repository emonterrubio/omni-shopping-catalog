import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backHref?: string;
  onBackClick?: () => void;
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backHref, 
  onBackClick,
  className = "" 
}: PageHeaderProps) {
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backHref) {
      // Handle navigation
    }
  };

  return (
    <div className={`text-left ${className}`}>
      {showBackButton && (
        <div className="mb-4">
          {backHref ? (
            <Link
              href={backHref}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          ) : (
            <button
              onClick={handleBack}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
        </div>
      )}
      <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-2">{title}</h1>
      {subtitle && (
        <h4 className="font-base text-gray-800 mb-8">{subtitle}</h4>
      )}
    </div>
  );
} 