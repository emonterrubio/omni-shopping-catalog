"use client";

import { hardwareData, miceSubsection, keyboardsSubsection, combosSubsection } from "../../../data/eaProductData";
import { ProductCard } from "../../../components/ui/ProductCard";
import { PlatformInfoBanner } from "../../../components/ui/PlatformInfoBanner";
import { PageLayout } from "../../../components/layout/PageLayout";
import { Pagination } from "../../../components/ui/Pagination";
import { CatalogSidebar } from "../../../components/catalog/CatalogSidebar";
import { SortAsc, Filter, PackageSearch, ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { useParams } from "next/navigation";

export default function CategoryCatalogPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  
  // Convert URL slug to singular category name for filtering
  const getSingularCategory = (slug: string): string => {
    switch (slug.toLowerCase()) {
      case 'laptops':
        return 'laptop';
      case 'monitors':
        return 'monitor';
      case 'docking-stations':
        return 'docking station';
      case 'headsets':
        return 'headset';
      case 'mice':
        return 'mouse';
      case 'keyboards':
        return 'keyboard';
      case 'mouse-keyboard':
        return 'mice and keyboards';
      case 'webcams':
        return 'webcam';
      default:
        return slug.toLowerCase();
    }
  };
  
  const singularCategory = getSingularCategory(categorySlug);
  
  // Use the EA product data directly
  const allProducts = hardwareData.map((product) => ({
    brand: product.manufacturer,
    model: product.model,
    category: product.category,
    description: (product as any).description || `${product.manufacturer} ${product.model}`,
    card_description: (product as any).description || `${product.manufacturer} ${product.model}`,
    features: (product as any).description || `${product.manufacturer} ${product.model}`,
    image: (product as any).image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`,
    price: (product as any).price_usd || (product as any).ea_estimated_price_usd,
    recommended: true,
    manufacturer: product.manufacturer,
    price_usd: (product as any).price_usd || (product as any).ea_estimated_price_usd,
    price_cad: (product as any).price_cad,
    price_euro: (product as any).price_euro,
  }));

  // Group products by brand
  const productsByBrand: { [brand: string]: typeof allProducts } = {};
  allProducts.forEach((product) => {
    if (!productsByBrand[product.brand]) {
      productsByBrand[product.brand] = [];
    }
    productsByBrand[product.brand].push(product);
  });

  const [sortOption, setSortOption] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(singularCategory);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node) &&
        showSortMenu
      ) {
        setShowSortMenu(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node) &&
        showFilterMenu
      ) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortMenu, showFilterMenu]);

  // Flatten all products for sorting
  const flatProducts = [...allProducts];

  // Eligibility logic: eligible if price exists
  const isEligible = (product: any) => Boolean(product.price);

  // Filter logic
  let filteredProducts = flatProducts;
  
  // Filter by category first
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.category) return false;
      
      const productCategory = product.category.toLowerCase();
      const targetCategory = selectedCategory.toLowerCase();
      
      // Handle specific category mappings
      if (targetCategory === 'mouse') {
        return productCategory === 'mouse' || 
               productCategory === 'trackpad';
      } else if (targetCategory === 'keyboard') {
        return productCategory === 'keyboard';
      } else if (targetCategory === 'mice and keyboards') {
        // Include all mouse, keyboard, and combo products
        return productCategory === 'mouse' || 
               productCategory === 'trackpad' ||
               productCategory === 'keyboard' ||
               productCategory === 'mouse & keyboard';
      } else if (targetCategory === 'webcam') {
        return productCategory === 'webcam';
      } else {
        return productCategory === targetCategory;
      }
    });
  }
  
  // Then filter by brand (refines the category filter)
  if (selectedBrand !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase()
    );
  }

  // Sorting logic
  let sortedProducts = filteredProducts;
  if (sortOption === "price-low") {
    sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceA - priceB;
    });
  } else if (sortOption === "price-high") {
    sortedProducts = [...filteredProducts].sort((a, b) => {
      const priceA = typeof a.price === 'string' ? parseFloat(String(a.price).replace(/,/g, '')) : Number(a.price);
      const priceB = typeof b.price === 'string' ? parseFloat(String(b.price).replace(/,/g, '')) : Number(b.price);
      return priceB - priceA;
    });
  } else if (sortOption === "az") {
    sortedProducts = [...filteredProducts].sort((a, b) => a.model.localeCompare(b.model));
  } else if (sortOption === "za") {
    sortedProducts = [...filteredProducts].sort((a, b) => b.model.localeCompare(a.model));
  } // 'all' just shows the original order

  // Pagination logic
  const itemsPerPage = 9;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, sortOption]);

  // Function to get brand counts based on selected category
  const getBrandCountsForCategory = () => {
    if (selectedCategory === "all") {
      // If no category is selected, show total counts
      return Object.keys(productsByBrand).reduce((acc, brand) => {
        acc[brand] = productsByBrand[brand].length;
        return acc;
      }, {} as { [brand: string]: number });
    } else if (selectedCategory === "mice and keyboards") {
      // Special case for Mice and Keyboards - count from all subsections
      return Object.keys(productsByBrand).reduce((acc, brand) => {
        const count = productsByBrand[brand].filter(product => {
          if (!product.category) return false;
          const productCategory = product.category.toLowerCase();
          return productCategory === 'mouse' || 
                 productCategory === 'trackpad' ||
                 productCategory === 'keyboard' ||
                 productCategory === 'mouse & keyboard';
        }).length;
        acc[brand] = count;
        return acc;
      }, {} as { [brand: string]: number });
    } else {
      // If category is selected, count only products in that category
      return Object.keys(productsByBrand).reduce((acc, brand) => {
        const count = productsByBrand[brand].filter(product => 
          product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
        ).length;
        acc[brand] = count;
        return acc;
      }, {} as { [brand: string]: number });
    }
  };

  const brandCounts = getBrandCountsForCategory();

  // Get plural category name for display
  const getPluralCategoryName = (singular: string): string => {
    switch (singular.toLowerCase()) {
      case 'laptop':
        return 'Laptops';
      case 'monitor':
        return 'Monitors';
      case 'docking station':
        return 'Docking Stations';
      case 'headset':
        return 'Headsets';
      case 'mice and keyboards':
        return 'Mice and Keyboards';
      default:
        return singular.charAt(0).toUpperCase() + singular.slice(1) + 's';
    }
  };

  const pluralCategoryName = getPluralCategoryName(singularCategory);

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Catalog", href: "/catalog" },
          { label: `All ${pluralCategoryName}`, isActive: true }
        ]}
        className="mb-4 sm:px-4 lg:px-0"
      />

      <div className="text-left mb-8 sm:px-4 lg:px-0">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mt-4 lg:mt-6 mb-2">
          {selectedBrand === "all" 
            ? `All ${pluralCategoryName}` 
            : `All ${selectedBrand.charAt(0).toUpperCase() + selectedBrand.slice(1)} ${pluralCategoryName}`
          }
        </h1>
        <h4 className="text-base font-base text-gray-800 mb-2">Browse our catalog of {pluralCategoryName.toLowerCase()} and find the perfect item for your needs.</h4>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        {/* Mobile: Filter Panel */}
        <div className="lg:hidden my-0 sm:my-4 sm:px-4">
          <div>
            <label className="block text-2xl font-regular text-gray-700 mb-2">Categories</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="all">All</option>
              {Array.from(new Set(allProducts.map((p: any) => p.category))).sort().map(category => (
                <option key={category} value={category}>
                  {category === 'Laptop' ? 'Laptops' : 
                   category === 'Monitor' ? 'Monitors' : 
                   category === 'Docking Station' ? 'Docking Stations' : 
                   category === 'Headset' ? 'Headsets' : 
                   category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Desktop: Sidebar */}
        <div className="hidden lg:block">
          <CatalogSidebar
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onCategorySelect={setSelectedCategory}
            onBrandSelect={setSelectedBrand}
            productsByBrand={productsByBrand}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 mt-4 sm:mt-0 lg:pl-3 sm:px-4 lg:px-0">
          <div className="flex items-center justify-between mb-2 sm:mb-4 gap-4 flex-wrap w-full">
            <div className="text-base font-regular text-gray-900 min-w-max">
              {selectedCategory === 'mice and keyboards' ? (
                (() => {
                  const filteredMice = miceSubsection.filter(product => 
                    selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                  );
                  const filteredKeyboards = keyboardsSubsection.filter(product => 
                    selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                  );
                  const filteredCombos = combosSubsection.filter(product => 
                    selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                  );
                  const totalFiltered = filteredMice.length + filteredKeyboards.length + filteredCombos.length;
                  return `Showing all ${totalFiltered} items`;
                })()
              ) : (
                `Showing ${startIndex + 1}-${Math.min(endIndex, sortedProducts.length)} of ${sortedProducts.length} item${sortedProducts.length === 1 ? "" : "s"}`
              )}
            </div>
            {/* Desktop filter and sort dropdowns */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-2">
                <label htmlFor="brand-filter" className="text-base font-regular text-gray-700 whitespace-nowrap">Filter by:</label>
                <div className="relative">
                  <select
                    id="brand-filter"
                    value={selectedBrand}
                    onChange={e => setSelectedBrand(e.target.value)}
                    className="appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 min-w-[140px]"
                  >
                    <option value="all">All Brands</option>
                    {Object.keys(productsByBrand).sort().map((brand) => (
                      <option key={brand} value={brand}>
                        {brand} ({brandCounts[brand]})
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-base font-regular text-gray-700 whitespace-nowrap">Sort by:</label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                    className="appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 min-w-[140px]"
                  >
                    <option value="all">All</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            {/* Mobile filter and sort icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto relative">
              <button
                aria-label="Filter"
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowFilterMenu((v) => !v)}
              >
                <Filter className="w-6 h-6" />
              </button>
              <button
                aria-label="Sort"
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowSortMenu((v) => !v)}
              >
                <SortAsc className="w-6 h-6" />
              </button>
              {/* Filter menu */}
              {showFilterMenu && (
                <div ref={filterMenuRef} className="absolute right-12 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">Brands</div>
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedBrand === "all" ? "bg-gray-100 font-semibold" : ""}`}
                    onClick={() => { setSelectedBrand("all"); setShowFilterMenu(false); }}
                  >
                    All Brands
                  </button>
                  {Object.keys(productsByBrand).sort().map((brand) => (
                    <button
                      key={brand}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedBrand === brand ? "bg-gray-100 font-semibold" : ""}`}
                      onClick={() => { setSelectedBrand(brand); setShowFilterMenu(false); }}
                    >
                      {brand} ({brandCounts[brand]})
                    </button>
                  ))}
                </div>
              )}
              {/* Sort menu */}
              {showSortMenu && (
                <div ref={sortMenuRef} className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded shadow-md w-40">
                  {[
                    { value: "all", label: "All" },
                    { value: "price-low", label: "Price: Low to High" },
                    { value: "price-high", label: "Price: High to Low" },
                    { value: "az", label: "A-Z" },
                    { value: "za", label: "Z-A" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortOption === opt.value ? "bg-gray-100 font-semibold" : ""}`}
                      onClick={() => { setSortOption(opt.value); setShowSortMenu(false); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-gray-400 mb-4">
                  <PackageSearch className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedCategory !== "all" && selectedBrand !== "all" 
                    ? `No ${selectedCategory} available from ${selectedBrand}`
                    : selectedCategory !== "all"
                    ? `No ${selectedCategory} available`
                    : selectedBrand !== "all"
                    ? `No products available from ${selectedBrand}`
                    : "No products found"
                  }
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory !== "all" && selectedBrand !== "all"
                    ? `We don't currently have any ${selectedCategory.toLowerCase()} from ${selectedBrand} in our catalog. Try selecting a different brand or category.`
                    : selectedCategory !== "all"
                    ? `We don't currently have any ${selectedCategory.toLowerCase()} in our catalog. Try selecting a different category.`
                    : selectedBrand !== "all"
                    ? `We don't currently have any products from ${selectedBrand} in our catalog. Try selecting a different brand.`
                    : "We don't currently have any products matching your criteria. Try adjusting your filters."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {selectedCategory !== "all" && (
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      View All Categories
                    </button>
                  )}
                  {selectedBrand !== "all" && (
                    <button
                      onClick={() => setSelectedBrand("all")}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
                    >
                      View All Brands
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : selectedCategory === 'mice and keyboards' ? (
            // Special display for Mice & Keyboard category with subsections
            <div className="space-y-8">
              {/* Mice Section */}
              {(() => {
                const filteredMice = miceSubsection.filter(product => 
                  selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                );
                
                // Apply sorting to mice subsection
                let sortedMice = filteredMice;
                if (sortOption === "price-low") {
                  sortedMice = [...filteredMice].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceA - priceB;
                  });
                } else if (sortOption === "price-high") {
                  sortedMice = [...filteredMice].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceB - priceA;
                  });
                } else if (sortOption === "az") {
                  sortedMice = [...filteredMice].sort((a, b) => a.model.localeCompare(b.model));
                } else if (sortOption === "za") {
                  sortedMice = [...filteredMice].sort((a, b) => b.model.localeCompare(a.model));
                }
                
                return sortedMice.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 pb-2">
                      Mice
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
                      {sortedMice.map((product, idx) => {
                      const mappedProduct = {
                        brand: product.manufacturer,
                        model: product.model,
                        category: product.category,
                        description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        card_description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        features: (product as any).description || `${product.manufacturer} ${product.model}`,
                        image: (product as any).image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`,
                        price: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        recommended: true,
                        manufacturer: product.manufacturer,
                        price_usd: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        price_cad: (product as any).price_cad,
                        price_euro: (product as any).price_euro,
                      };
                        return (
                          <ProductCard key={`mice-${product.model}-${idx}`} product={mappedProduct} fromCatalog={true} />
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Keyboards Section */}
              {(() => {
                const filteredKeyboards = keyboardsSubsection.filter(product => 
                  selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                );
                
                // Apply sorting to keyboards subsection
                let sortedKeyboards = filteredKeyboards;
                if (sortOption === "price-low") {
                  sortedKeyboards = [...filteredKeyboards].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceA - priceB;
                  });
                } else if (sortOption === "price-high") {
                  sortedKeyboards = [...filteredKeyboards].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceB - priceA;
                  });
                } else if (sortOption === "az") {
                  sortedKeyboards = [...filteredKeyboards].sort((a, b) => a.model.localeCompare(b.model));
                } else if (sortOption === "za") {
                  sortedKeyboards = [...filteredKeyboards].sort((a, b) => b.model.localeCompare(a.model));
                }
                
                return sortedKeyboards.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 pb-2">
                      Keyboards
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
                      {sortedKeyboards.map((product, idx) => {
                      const mappedProduct = {
                        brand: product.manufacturer,
                        model: product.model,
                        category: product.category,
                        description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        card_description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        features: (product as any).description || `${product.manufacturer} ${product.model}`,
                        image: (product as any).image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`,
                        price: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        recommended: true,
                        manufacturer: product.manufacturer,
                        price_usd: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        price_cad: (product as any).price_cad,
                        price_euro: (product as any).price_euro,
                      };
                        return (
                          <ProductCard key={`keyboard-${product.model}-${idx}`} product={mappedProduct} fromCatalog={true} />
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Combos Section */}
              {(() => {
                const filteredCombos = combosSubsection.filter(product => 
                  selectedBrand === "all" || product.manufacturer.toLowerCase() === selectedBrand.toLowerCase()
                );
                
                // Apply sorting to combos subsection
                let sortedCombos = filteredCombos;
                if (sortOption === "price-low") {
                  sortedCombos = [...filteredCombos].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceA - priceB;
                  });
                } else if (sortOption === "price-high") {
                  sortedCombos = [...filteredCombos].sort((a, b) => {
                    const priceA = (a as any).price_usd || (a as any).ea_estimated_price_usd || 0;
                    const priceB = (b as any).price_usd || (b as any).ea_estimated_price_usd || 0;
                    return priceB - priceA;
                  });
                } else if (sortOption === "az") {
                  sortedCombos = [...filteredCombos].sort((a, b) => a.model.localeCompare(b.model));
                } else if (sortOption === "za") {
                  sortedCombos = [...filteredCombos].sort((a, b) => b.model.localeCompare(a.model));
                }
                
                return sortedCombos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2 pb-2">
                      Mouse & Keyboard Combos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
                      {sortedCombos.map((product, idx) => {
                      const mappedProduct = {
                        brand: product.manufacturer,
                        model: product.model,
                        category: product.category,
                        description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        card_description: (product as any).description || `${product.manufacturer} ${product.model}`,
                        features: (product as any).description || `${product.manufacturer} ${product.model}`,
                        image: (product as any).image || `/images/${product.manufacturer.toLowerCase()}_${product.model.toLowerCase().replace(/\s+/g, "_")}.png`,
                        price: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        recommended: true,
                        manufacturer: product.manufacturer,
                        price_usd: (product as any).price_usd || (product as any).ea_estimated_price_usd,
                        price_cad: (product as any).price_cad,
                        price_euro: (product as any).price_euro,
                      };
                        return (
                          <ProductCard key={`combo-${product.model}-${idx}`} product={mappedProduct} fromCatalog={true} />
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3">
              {paginatedProducts.map((product, idx) => (
                <ProductCard key={`${product.model}-${idx}`} product={product} fromCatalog={true} />
              ))}
            </div>
          )}
          
          {filteredProducts.length > 0 && selectedCategory !== 'mice and keyboards' && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
