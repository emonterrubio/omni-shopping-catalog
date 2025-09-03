import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string; // undefined for current page
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={`flex items-center space-x-2 text-base ${className}`}
      aria-label="Breadcrumb navigation"
    >
      {/* Home Icon - Always first */}
      <Link
        href="/"
        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-100"
        aria-label="Go to home page"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = item.isActive || isLast;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            
            {isActive ? (
              <span
                className="text-base text-blue-600 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href || "#"}
                className="text-base text-gray-400 hover:text-gray-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
