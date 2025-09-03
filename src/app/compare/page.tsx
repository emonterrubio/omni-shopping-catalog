"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductComparisonList } from "@/components/product/ProductComparisonList";
import { hardwareData } from "@/data/eaProductData";
import { EAProductType } from "@/types";

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<EAProductType[]>([]);
  
  // Get all available products for selection
  const availableProducts = hardwareData;
  
  // Initialize with first 3 products if none selected
  React.useEffect(() => {
    if (selectedProducts.length === 0 && availableProducts.length >= 3) {
      setSelectedProducts(availableProducts.slice(0, 3) as EAProductType[]);
    }
  }, [availableProducts, selectedProducts.length]);

  const handleProductChange = (index: number, productModel: string) => {
    const product = availableProducts.find(p => p.model === productModel);
    if (product) {
      const newSelectedProducts = [...selectedProducts];
      newSelectedProducts[index] = product;
      setSelectedProducts(newSelectedProducts);
    }
  };

  const getProductSpecs = (product: any) => {
    const specs = [];
    
    // Add basic product information
    if (product.manufacturer) specs.push({ label: "Manufacturer", value: product.manufacturer });
    if (product.model) specs.push({ label: "Model", value: product.model });
    if (product.category) specs.push({ label: "Category", value: product.category });
    if (product.price_usd) specs.push({ label: "Price", value: `$${product.price_usd.toLocaleString()}` });
    if ((product as any).price_cad) specs.push({ label: "Price CAD", value: `$${(product as any).price_cad.toLocaleString()} CAD` });
    
    // Add category-specific specifications
    if (product.category === "Laptop" || product.category === "Laptops") {
      if ((product as any).os) specs.push({ label: "Operating System", value: (product as any).os });
      if ((product as any).cpu) specs.push({ label: "CPU", value: (product as any).cpu });
      if ((product as any).gpu) specs.push({ label: "GPU", value: (product as any).gpu });
      if ((product as any).memory) specs.push({ label: "Memory", value: (product as any).memory });
      if ((product as any).storage) specs.push({ label: "Storage", value: (product as any).storage });
      if ((product as any).screen_size) specs.push({ label: "Screen Size", value: (product as any).screen_size });
      if ((product as any).weight_lbs) specs.push({ label: "Weight", value: `${(product as any).weight_lbs} lbs` });
      if ((product as any).battery_life_hrs) specs.push({ label: "Battery Life", value: `${(product as any).battery_life_hrs} hours` });
    } else if (product.category === "Monitor") {
      if ((product as any).screen_size) specs.push({ label: "Screen Size", value: (product as any).screen_size });
      if ((product as any).resolution) specs.push({ label: "Resolution", value: (product as any).resolution });
      if ((product as any).refresh_rate) specs.push({ label: "Refresh Rate", value: (product as any).refresh_rate });
      if ((product as any).panel_type) specs.push({ label: "Panel Type", value: (product as any).panel_type });
    } else if (product.category === "Docking Station") {
      if ((product as any).ports) specs.push({ label: "Ports", value: (product as any).ports });
      if ((product as any).power_delivery) specs.push({ label: "Power Delivery", value: (product as any).power_delivery });
    } else if (product.category === "Headset") {
      if ((product as any).connection_type) specs.push({ label: "Connection", value: (product as any).connection_type });
      if ((product as any).microphone) specs.push({ label: "Microphone", value: (product as any).microphone ? "Yes" : "No" });
    }

    return specs;
  };

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Compare", isActive: true }
        ]}
        className="mb-8"
      />
    <div>
      <div className="text-left">
        <h1 className="text-5xl font-medium text-gray-900 mt-6 mb-4">Compare models</h1>
        <p className="text-base text-gray-600 mb-8">Compare processor speed, battery life, and portability to find your ideal laptop.</p>
      </div>
        
        {/* Product Selection Dropdowns */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col">
                <select
                  value={selectedProducts[index]?.model || ""}
                  onChange={(e) => handleProductChange(index, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a product...</option>
                  {availableProducts.map((product) => (
                    <option key={product.model} value={product.model}>
                      {product.manufacturer} {product.model}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

        </div>

        {/* Comparison Results */}
        {selectedProducts.length > 0 && (
          <div>
            <ProductComparisonList
              products={selectedProducts.map(p => ({
                ...p,
                brand: p.manufacturer,
                model: p.model,
                category: p.category,
                description: (p as any).description || `${p.manufacturer} ${p.model}`,
                card_description: (p as any).intended_for ? 
                  `${(p as any).description || `${p.manufacturer} ${p.model}`} Intended for ${(p as any).intended_for}.` : 
                  (p as any).description || `${p.manufacturer} ${p.model}`,
                price: p.price_usd,
                image: p.image || `/images/${p.manufacturer.toLowerCase()}_${p.model.toLowerCase().replace(/\s+/g, "_")}.png`,
                features: (p as any).description || `${p.manufacturer} ${p.model}`,
                recommended: true
              }))}
              getProductSpecs={getProductSpecs}
              noBackground={true}
            />
          </div>
        )}

        {/* Empty State */}
        {selectedProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-6">
              <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No products selected for comparison</h2>
            <p className="text-gray-600 mb-8">
              Use the dropdown selectors above to choose up to 3 products to compare side by side.
            </p>
          </div>
        )}
        
        {/* Need Help Section */}
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col items-center mt-8">
          <div className="text-2xl font-medium mb-1">Need help?</div>
          <div className="mb-3 text-gray-600 text-center text-base">Talk to one of our IT experts</div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">Start a Conversation</button>
        </div>
      </div>
    </PageLayout>
  );
} 