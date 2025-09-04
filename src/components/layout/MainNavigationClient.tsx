"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export const MainNavigationClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200">
      <div className="max-w-7xl mx-auto flex-1 overflow-y-auto px-6 md:px-10">
        <div className="flex justify-between h-auto">
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/catalog" className={`font-medium text-gray-900 border-b-4 py-3 border-transparent hover:border-b-4 hover:border-heritageBlue ${pathname === "/catalog" ? "border-b-4 border-heritageBlue !border-heritageBlue" : ""}`}>
              Hardware Catalog
            </Link>
          </div>
          <div className="md:hidden flex items-center justify-end">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none py-3"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/catalog"
              className={`block px-4 py-2 text-3xl font-regular text-gray-900 ${pathname === "/catalog" ? "!text-heritageBlue" : ""}`}
            >
              Hardware Catalog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}; 