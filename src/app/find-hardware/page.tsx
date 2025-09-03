import React from "react";
import { Search, Filter, Laptop, Monitor, Headphones, Zap } from "lucide-react";
import { hardwareData, categories } from "../../data/eaProductData";
import { EAProductType } from "../../types";
import { ProductCard } from "../../components/ui/ProductCard";

export default function FindHardwarePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Hardware</h1>
          <p className="text-gray-600">
            Discover the perfect IT equipment for your work requirements and preferences
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for hardware by name, brand, or features..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl mb-3">
                    {category.name === 'Laptops' && <Laptop className="h-12 w-12 mx-auto text-blue-600" />}
                    {category.name === 'Monitors' && <Monitor className="h-12 w-12 mx-auto text-blue-600" />}
                    {category.name === 'Headsets' && <Headphones className="h-12 w-12 mx-auto text-blue-600" />}
                    {category.name === 'Docking Stations' && <Zap className="h-12 w-12 mx-auto text-blue-600" />}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.itemQuantity} options</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hardwareData.slice(0, 8).map((product: EAProductType, index: number) => (
              <ProductCard
                key={`${product.manufacturer}-${product.model}-${index}`}
                product={{
                  ...product,
                  brand: product.manufacturer,
                  price: product.price_usd,
                  image: product.image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, '_')}.png`,
                  features: product.description || '',
                  recommended: false
                }}
              />
            ))}
          </div>
        </div>

        {/* Hardware Guide */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hardware Selection Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">For Developers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High-performance laptops with dedicated GPUs</li>
                <li>• Large monitors for multi-window development</li>
                <li>• Quality headsets for team communication</li>
                <li>• Docking stations for flexible workspace setup</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">For Designers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Color-accurate displays with high resolution</li>
                <li>• Powerful laptops for creative software</li>
                <li>• Comfortable headsets for long work sessions</li>
                <li>• Ergonomic accessories for productivity</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">For Business Users</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Reliable laptops with long battery life</li>
                <li>• Standard monitors for office applications</li>
                <li>• Professional headsets for meetings</li>
                <li>• Essential docking solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">For Remote Workers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Portable laptops with good connectivity</li>
                <li>• Compact monitors for home offices</li>
                <li>• Wireless headsets for flexibility</li>
                <li>• USB-C hubs for device connectivity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
