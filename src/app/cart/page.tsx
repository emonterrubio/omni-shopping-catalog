'use client';

import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useCart } from '@/components/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { ArrowLeft, Calculator } from 'lucide-react';
import Link from 'next/link';
import { getAllOfficeLocations, calculateTax } from '@/services/taxCalculation';
import { Dropdown } from '@/components/ui/Dropdown';

export default function CartPage() {
  const { items } = useCart();
  const [selectedLocation, setSelectedLocation] = useState('');

  // Get office locations from tax calculation service
  const allOfficeLocations = getAllOfficeLocations();
  
  // Group locations by region for better organization
  const usLocations = allOfficeLocations.filter(loc => 
    loc.state === 'TX' || loc.state === 'WA' || loc.state === 'CA' || loc.state === 'FL'
  );
  const canadianLocations = allOfficeLocations.filter(loc => 
    loc.state === 'AB' || loc.state === 'QC' || loc.state === 'BC'
  );
  const europeanLocations = allOfficeLocations.filter(loc => 
    loc.state === 'FI' || loc.state === 'FR' || loc.state === 'ES' || loc.state === 'DE' || loc.state === 'IE'
  );
  
  // Transform locations into dropdown options format with region grouping
  const officeLocationOptions = [
    ...usLocations.map(location => ({
      value: location.name,
      label: `${location.name} (US)`,
      key: location.name
    })),
    ...canadianLocations.map(location => ({
      value: location.name,
      label: `${location.name} (CA)`,
      key: location.name
    })),
    ...europeanLocations.map(location => ({
      value: location.name,
      label: `${location.name} (EU)`,
      key: location.name
    }))
  ];

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              href="/catalog" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-blue-600 mr-2" />
              Back to Catalog
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-3">
              <Calculator className="h-8 w-8 text-heritageBlue mt-1.5" />
              <div>
                <h1 className="text-4xl font-regular text-gray-900">
                  Cost Calculator
                </h1>
                <p className="text-gray-600 mt-1">
                  Calculate the total cost for outfitting your team's return to office setup
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your calculator is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add items from the catalog to calculate your total cost
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-heritageBlue hover:bg-blue-700 transition-colors"
            >
              Browse Hardware Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Disclaimer - only show when there are items */}
              {items.length > 0 && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 text-left">
                    Pricing is actual for all North American sites. If using the RTO calculator outside of North America, pricing is indicative only. Please work with your local site IT teams for actual pricing.
                  </p>
                </div>
              )}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Selected Items ({items.length})
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              {/* Office Location Selection */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select office location for tax calculation:
                    </label>
                    <Dropdown
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                      options={officeLocationOptions}
                      placeholder="Select a location"
                    />
                  </div>
                </div>
              </div>
              
              <CartSummary selectedLocation={selectedLocation} />
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
