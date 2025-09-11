"use client";
import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { MainNavigationClient } from "./MainNavigationClient";
import { CartIcon } from "../cart/CartIcon";
import { CurrencyToggle } from "../ui/CurrencyToggle";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="sticky top-0 z-50">
      <header className="bg-deepBlue relative">
        <div className="absolute left-0 w-full h-full pointer-events-none z-0">
          <svg
            viewBox="0 0 200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <polygon
              points="0,0 50,0 60,100 0,100"
              fill="#255AF6"
            />
          </svg>
        </div>
        <div className="absolute right-0 w-full h-full pointer-events-none z-0">
          <svg 
            viewBox="0 0 150 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <circle
              cx="270"
              cy="60"
              r="150"
              fill="#255AF6"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between ml-1 px-4 sm:px-6 md:px-8 py-6">
            <div className="flex items-center">
              <Link href="/catalog">
                <img src="/logo/ea_logo_white.svg" alt="Hardware Catalog" className="h-10 object-contain" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <CurrencyToggle />
              <CartIcon />
            </div>
          </div>
        </div>
      </header>
      <MainNavigationClient />
    </div>
  );
} 