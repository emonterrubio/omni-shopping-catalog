import { eaProductData } from "../data/eaProductData";
import { ProductCardProps } from "../types/ProductCardProps";
import { analyzeSearchQuery, scoreProductByIntent, generateSuggestions, SearchIntent } from "./ai";

export interface SearchResult {
  results: ProductCardProps[];
  suggestions: string[];
  intent?: SearchIntent;
}

function getAllProducts(): any[] {
  const laptops = eaProductData.laptops.map((item: any) => ({ 
    ...item, 
    category: "Laptop",
    brand: item.manufacturer,
    price: item.price_usd,
    features: `${item.cpu}, ${item.memory}, ${item.storage}, ${item.display.resolution}`,
  }));
  
  const monitors = eaProductData.monitors.map((item: any) => ({
    ...item,
    category: "Monitor",
    brand: item.manufacturer,
    price: item.price_usd,
    features: `${item.resolution}, ${item.aspect_ratio}, ${item.panel}`,
  }));
  
  const dockingStations = eaProductData.dockingStations.map((item: any) => ({
    ...item,
    category: "Docking Station",
    brand: item.manufacturer,
    price: item.price_usd,
    features: `${item.max_monitors}, ${item.power_delivery_watt}W`,
  }));
  
  const headsets = eaProductData.headsets.map((item: any) => ({
    ...item,
    category: "Headset",
    brand: item.manufacturer,
    price: item.price_usd,
    features: `${item.form_factor}, ${item.connectivity}, ${item.noise_cancellation}`,
  }));
  
  return [...laptops, ...monitors, ...dockingStations, ...headsets];
}

function normalizeProduct(product: any): any {
  return {
    ...product,
    searchableText: Object.values(product)
      .filter(value => typeof value === "string")
      .join(" ")
      .toLowerCase(),
    specs: {
      processor: product.cpu?.toLowerCase() || "",
      memory: product.memory?.toLowerCase() || "",
      storage: product.storage?.toLowerCase() || "",
      display: product.display?.resolution?.toLowerCase() || product.resolution?.toLowerCase() || "",
      graphics: product.gpu?.toLowerCase() || "",
      brand: product.manufacturer?.toLowerCase() || "",
      category: product.category?.toLowerCase() || "",
    }
  };
}

function getInitialMatches(products: any[], query: string): any[] {
  const normalizedQuery = query.toLowerCase().trim();
  return products
    .map(normalizeProduct)
    .filter(product => product.searchableText.includes(normalizedQuery));
}

export async function searchProducts(query: string): Promise<SearchResult> {
  console.log('Starting search for query:', query);
  
  try {
    // 1. Analyze search intent
    console.log('Analyzing search intent...');
    const intent = await analyzeSearchQuery(query);
    console.log('Search intent:', intent);
    
    // 2. Get initial matches based on text search
    console.log('Getting initial matches...');
    const allProducts = getAllProducts();
    const initialMatches = getInitialMatches(allProducts, query);
    console.log('Initial matches:', initialMatches.length);
    
    // 3. Score and rank products based on intent
    console.log('Scoring products...');
    const scoredProducts = await Promise.all(
      initialMatches.map(async (product) => {
        const score = await scoreProductByIntent(product, intent);
        return { ...product, score };
      })
    );
    console.log('Scored products:', scoredProducts.length);
    
    // 4. Sort by score and convert to ProductCardProps
    const results = scoredProducts
      .sort((a, b) => b.score - a.score)
      .map(product => ({
        manufacturer: product.manufacturer,
        model: product.model,
        category: product.category,
        description: product.description,
        price_usd: product.price_usd,
        brand: product.manufacturer,
        price: product.price_usd,
        features: product.features,
        image: product.image || `/images/${product.manufacturer.toLowerCase()}-${product.model.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        recommended: true,
      }));

    // 5. Generate suggestions if no results or for refinement
    console.log('Generating suggestions...');
    const suggestions = await generateSuggestions(intent, allProducts);
    console.log('Generated suggestions:', suggestions);

    return {
      results: results.map(product => ({
        ...product,
        recommended: true,
      })),
      suggestions,
      intent
    };
  } catch (error) {
    console.error('Search error:', error);
    // Fallback to basic search if AI analysis fails
    console.log('Falling back to basic search...');
    const normalizedQuery = query.toLowerCase().trim();
    const allProducts = getAllProducts();
    const results = allProducts.filter(product => {
      const searchableText = Object.values(product)
        .filter(value => typeof value === "string")
        .join(" ")
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });

    const availableBrands = Array.from(new Set(allProducts.map(p => p.manufacturer)));
    const availableCategories = Array.from(new Set(allProducts.map(p => p.category)));
    const suggestions = [...availableBrands, ...availableCategories];

    return { results, suggestions };
  }
}