import { LucideIcon } from "lucide-react";

// Base product interface that all EA products extend
export interface EAProduct {
  manufacturer: string;
  model: string;
  category: string;
  price_usd: number;
  price_cad?: number;
  description?: string;
  intended_for?: string;
  not_suitable_for?: string;
  image?: string;
}

// Laptop specific interface
export interface EALaptop extends EAProduct {
  os: string;
  screen_size: string;
  weight_lbs: number;
  battery_life_hrs: number;
  battery_life_description: string;
  performance_rating: string;
  cpu: string;
  gpu: string;
  memory: string;
  storage: string;
  display: {
    panel: string;
    resolution: string;
    refresh_rate: string;
    brightness_nits: number;
    hdr: string;
    touch: string;
  };
  ports: string[];
  power_watt: string;
  dock: string;
}

// Monitor specific interface
export interface EAMonitor extends EAProduct {
  screen_size: string;
  cdw_price_cad?: number;
  cdw_price_usd?: number | null;
  cdw_mfg_number_canada?: string;
  cdw_mfg_number_us?: string | null;
  features: string;
  resolution: string;
  aspect_ratio: string;
  panel: string;
  refresh_rate: string;
  response_time: string;
  hdr: string;
  color_depth: string;
  ports: string[];
  suitable_for: string;
}

// Docking Station specific interface
export interface EADockingStation extends EAProduct {
  cdw_price_cad?: number;
  cdw_price_usd?: number | null;
  cdw_mfg_number_canada?: string;
  cdw_mfg_number_us?: string | null;
  compatibility: string;
  power_delivery_watt: number;
  max_monitors: string;
  ports: string[];
}

// Headset specific interface
export interface EAHeadset extends EAProduct {
  cdw_price_cad?: number;
  cdw_mfg_number_canada?: string;
  form_factor: string;
  connectivity: string;
  microphone: string;
  noise_cancellation: string;
  weight_g: number;
  battery_life: string;
}

// Union type for all EA products
export type EAProductType = EALaptop | EAMonitor | EADockingStation | EAHeadset;

// Updated interfaces to work with EA data
export interface Category {
  id: number;
  name: string;
  iconName: string;
  itemQuantity: number;
}


// New interface for consolidated EA data
export interface EAProductData {
  laptops: EALaptop[];
  monitors: EAMonitor[];
  dockingStations: EADockingStation[];
  headsets: EAHeadset[];
} 