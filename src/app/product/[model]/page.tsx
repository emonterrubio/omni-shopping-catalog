"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { hardwareData } from "../../../data/eaProductData";
import { EAProductType } from "../../../types";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckCircle, AlertCircle, ArrowLeft, Box, Undo2 } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
// Cart functionality removed
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { ProductInfoPanel } from '@/components/product/ProductInfoPanel';
import { ProductSpecsTable } from '@/components/product/ProductSpecsTable';
import { RequestHardwareBanner } from '@/components/product/RequestHardwareBanner';
import { SupportBanner } from '@/components/product/SupportBanner';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
// ChevronDownIcon removed - no longer needed

function getCategoryPlural(category: string): string {
  // Convert category to plural form
  switch (category.toLowerCase()) {
    case 'laptop':
      return 'Laptops';
    case 'monitor':
      return 'Monitors';
    case 'docking station':
      return 'Docking Stations';
    case 'headset':
      return 'Headsets';
    case 'webcam':
      return 'Webcams';
    default:
      // For any other categories, just add 's' and capitalize first letter
      return category.charAt(0).toUpperCase() + category.slice(1) + 's';
  }
}

function findProductByModel(model: string): any {
  // First try to find the product by exact model match
  let product = hardwareData.find(p => p.model === model);
  
  // If not found, try to find by URL slug format (lowercase with hyphens)
  if (!product) {
    product = hardwareData.find(p => 
      p.model.toLowerCase().replace(/\s+/g, "-") === model.toLowerCase()
    );
  }
  
  return product || null;
}

function getProductSpecs(product: any) {
  const specs = [];
  
  // Common specs for all products
  specs.push({ label: "Manufacturer", value: product.manufacturer });
  specs.push({ label: "Model", value: product.model });
  specs.push({ label: "Category", value: product.category });
  

  
  // Add category-specific specs
  switch (product.category.toLowerCase()) {
    case "laptop":
      if ((product as any).os) specs.push({ label: "Operating System", value: (product as any).os });
      if ((product as any).cpu) specs.push({ label: "CPU", value: (product as any).cpu });
      if ((product as any).gpu) specs.push({ label: "GPU", value: (product as any).gpu });
      if ((product as any).memory) specs.push({ label: "Memory", value: (product as any).memory });
      if ((product as any).storage) specs.push({ label: "Storage", value: (product as any).storage });
      if ((product as any).screen_size) specs.push({ label: "Screen Size", value: (product as any).screen_size });
      if ((product as any).weight_lbs) specs.push({ label: "Weight", value: `${(product as any).weight_lbs} lbs` });
      if ((product as any).battery_life_hrs) specs.push({ label: "Battery Life", value: `${(product as any).battery_life_hrs} hours` });
      if ((product as any).battery_life_description) specs.push({ label: "Battery Rating", value: (product as any).battery_life_description });
      if ((product as any).performance_rating) specs.push({ label: "Performance Tier", value: (product as any).performance_rating });
      if ((product as any).power_watt) specs.push({ label: "Power Adapter", value: `${(product as any).power_watt}W` });
      if ((product as any).dock) specs.push({ label: "Compatible Dock", value: (product as any).dock });
      
      // Display specifications
      if ((product as any).display) {
        const display = (product as any).display;
        if (display.panel) specs.push({ label: "Display Panel", value: display.panel });
        if (display.resolution) specs.push({ label: "Display Resolution", value: display.resolution });
        if (display.refresh_rate) specs.push({ label: "Display Refresh Rate", value: display.refresh_rate });
        if (display.brightness_nits) specs.push({ label: "Brightness", value: `${display.brightness_nits} nits` });
        if (display.hdr) specs.push({ label: "HDR Support", value: display.hdr });
        if (display.touch) specs.push({ label: "Touch Support", value: display.touch });
      }
      
      // Ports
      if ((product as any).ports && Array.isArray((product as any).ports)) {
        specs.push({ label: "Ports", value: (product as any).ports.join(", ") });
      }
      
      break;
      
    case "monitor":
      if ((product as any).screen_size) specs.push({ label: "Screen Size", value: (product as any).screen_size });
      if ((product as any).resolution) specs.push({ label: "Resolution", value: (product as any).resolution });
      if ((product as any).aspect_ratio) specs.push({ label: "Aspect Ratio", value: (product as any).aspect_ratio });
      if ((product as any).panel) specs.push({ label: "Panel Type", value: (product as any).panel });
      if ((product as any).refresh_rate) specs.push({ label: "Refresh Rate", value: (product as any).refresh_rate });
      if ((product as any).response_time) specs.push({ label: "Response Time", value: (product as any).response_time });
      if ((product as any).hdr) specs.push({ label: "HDR Support", value: (product as any).hdr });
      if ((product as any).color_depth) specs.push({ label: "Color Depth", value: (product as any).color_depth });
      if ((product as any).features) specs.push({ label: "Features", value: (product as any).features });
      
      // Ports
      if ((product as any).ports && Array.isArray((product as any).ports)) {
        specs.push({ label: "Ports", value: (product as any).ports.join(", ") });
      }
      
      // Use cases
      if ((product as any).suitable_for) specs.push({ label: "Suitable For", value: (product as any).suitable_for });
      if ((product as any).intended_for) specs.push({ label: "Intended For", value: (product as any).intended_for });
      break;
      
    case "docking station":
      if ((product as any).compatibility) specs.push({ label: "Compatibility", value: (product as any).compatibility });
      if ((product as any).power_delivery_watt) specs.push({ label: "Power Delivery", value: `${(product as any).power_delivery_watt}W` });
      if ((product as any).max_monitors) specs.push({ label: "Max Monitors", value: (product as any).max_monitors });
      
      // Ports
      if ((product as any).ports && Array.isArray((product as any).ports)) {
        specs.push({ label: "Ports", value: (product as any).ports.join(", ") });
      }
      
      if ((product as any).intended_for) specs.push({ label: "Intended For", value: (product as any).intended_for });
      break;
      
    case "headset":
      if ((product as any).form_factor) specs.push({ label: "Form Factor", value: (product as any).form_factor });
      if ((product as any).connectivity) specs.push({ label: "Connectivity", value: (product as any).connectivity });
      if ((product as any).microphone) specs.push({ label: "Microphone", value: (product as any).microphone });
      if ((product as any).noise_cancellation) specs.push({ label: "Noise Cancellation", value: (product as any).noise_cancellation });
      if ((product as any).weight_g) specs.push({ label: "Weight", value: `${(product as any).weight_g}g` });
      if ((product as any).battery_life) specs.push({ label: "Battery Life", value: (product as any).battery_life });
      if ((product as any).intended_for) specs.push({ label: "Intended For", value: (product as any).intended_for });
      break;
      
    case "webcam":
      if ((product as any).resolution) specs.push({ label: "Resolution", value: (product as any).resolution });
      if ((product as any).windows) specs.push({ label: "Windows", value: (product as any).windows });
      if ((product as any).microphone) specs.push({ label: "Microphone", value: (product as any).microphone });
      if ((product as any).connectivity) specs.push({ label: "Connectivity", value: (product as any).connectivity });
      break;
      
    case "mouse":
    case "keyboard":
    case "mouse & keyboard":
    case "trackpad":
      if ((product as any).connectivity) specs.push({ label: "Connectivity", value: (product as any).connectivity });
      if ((product as any).keyboard_size_layout) specs.push({ label: "Keyboard Layout", value: (product as any).keyboard_size_layout });
      if ((product as any).mouse_buttons) specs.push({ label: "Mouse Buttons", value: (product as any).mouse_buttons });
      if ((product as any).power) specs.push({ label: "Power", value: (product as any).power });
      if ((product as any).intended_for) specs.push({ label: "Intended For", value: (product as any).intended_for });
      if ((product as any).not_suitable_for) specs.push({ label: "Not Suitable For", value: (product as any).not_suitable_for });
      break;
  }
  
  return specs;
}

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const modelParam = params.model;
  const model = Array.isArray(modelParam)
    ? decodeURIComponent(modelParam[0])
    : decodeURIComponent(modelParam || "");

  const product = findProductByModel(model);
  const specs = product ? getProductSpecs(product) : [];

  // Comparison functionality removed

  const handleBackClick = () => {
    // Use browser back navigation if there's history, otherwise fallback to home
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  // Cart functionality removed
  const [quantity, setQuantity] = useState(1);

  // Ensure quantity is 1 for laptops and desktops
  React.useEffect(() => {
    if (product && (product.category === "Laptops" || product.category === "Desktops")) {
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <PageLayout>
        <div className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</div>
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Back to Home</Link>
      </PageLayout>
    );
  }

  // Unified eligibility logic: eligible if price exists
  const isEligible = Boolean((product as any).price_usd || (product as any).ea_estimated_price_usd);

  return (
    <PageLayout>
        {/* <button
          onClick={handleBackClick}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button> */}
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Catalog", href: "/catalog" },
            { label: getCategoryPlural(product.category || "Products"), href: `/category/${product.category?.toLowerCase()}` },
            { label: product.model, isActive: true }
          ]}
          className="mb-8"
        />
        <div className="flex flex-col md:flex-row space-x-0 gap-8">
          <div className="flex-1">
            <ProductImageGallery mainImage={product.image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`} />
          </div>
          <div className="flex-1">
            <ProductInfoPanel
              brand={product.manufacturer}
              title={product.model}
              sku={product.model}
              price={(product as any).price_usd || (product as any).ea_estimated_price_usd}
              price_cad={(product as any).price_cad}
              available={isEligible}
              deliveryTime={"Within 5 days"}
              description={product.description || `${product.manufacturer} ${product.model}`}
              quantity={quantity}
              category={product.category}
              image={product.image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`}
              intendedFor={(product as any).intended_for}
              suitableFor={(product as any).suitable_for}
              notSuitableFor={(product as any).not_suitable_for}
              onQuantityChange={setQuantity}
              // Cart functionality removed
              // Compare functionality removed
            />
          </div>
        </div>
        <div className="mt-6">
          <ProductSpecsTable specs={specs} />
        </div>
    </PageLayout>
  );
} 