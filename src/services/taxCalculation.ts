// Tax calculation service based on shipping location
// Office locations and their corresponding zip codes and tax rates

export interface OfficeLocation {
  name: string;
  zipCode: string;
  state: string;
  taxRate: number; // Tax rate as decimal (e.g., 0.0725 for 7.25%)
}

// Office locations with their zip codes and tax rates
export const OFFICE_LOCATIONS: OfficeLocation[] = [
  // US Locations
  {
    name: "Austin",
    zipCode: "78701",
    state: "TX",
    taxRate: 0.0825 // 8.25% (Texas state + local)
  },
  {
    name: "Kirkland", 
    zipCode: "98033",
    state: "WA",
    taxRate: 0.10375 // 10.375% (Washington state + local)
  },
  {
    name: "Los Angeles - Chatsworth",
    zipCode: "91311",
    state: "CA", 
    taxRate: 0.1025 // 10.25% (California state + local)
  },
  {
    name: "Los Angeles - Del Rey",
    zipCode: "90232",
    state: "CA",
    taxRate: 0.105 // 10.5% (California state + local)
  },
  {
    name: "Orlando",
    zipCode: "32801", 
    state: "FL",
    taxRate: 0.0650 // 6.50% (Florida state + local)
  },
  {
    name: "Redwood Shores",
    zipCode: "94065",
    state: "CA",
    taxRate: 0.09875 // 9.875% (California state + local)
  },
  // Canadian Locations
  {
    name: "Edmonton",
    zipCode: "T5J 0A1",
    state: "AB",
    taxRate: 0.05 // 5% (GST only - Alberta has no PST)
  },
  {
    name: "Montreal",
    zipCode: "H3A 0A1",
    state: "QC",
    taxRate: 0.14975 // 14.975% (GST 5% + QST 9.975%)
  },
  {
    name: "Vancouver",
    zipCode: "V6B 0A1",
    state: "BC",
    taxRate: 0.12 // 12% (GST 5% + PST 7%)
  },
  {
    name: "Vancouver - Great Northern Way",
    zipCode: "V5T 0A1",
    state: "BC",
    taxRate: 0.12 // 12% (GST 5% + PST 7%)
  },
  {
    name: "Victoria",
    zipCode: "V8W 0A1",
    state: "BC",
    taxRate: 0.12 // 12% (GST 5% + PST 7%)
  },
  // European Locations
  {
    name: "Helsinki",
    zipCode: "00100",
    state: "FI",
    taxRate: 0.24 // 24% (Finland VAT)
  },
  {
    name: "Lyon",
    zipCode: "69000",
    state: "FR",
    taxRate: 0.20 // 20% (France VAT)
  },
  {
    name: "Madrid",
    zipCode: "28001",
    state: "ES",
    taxRate: 0.21 // 21% (Spain VAT)
  },
  {
    name: "Cologne",
    zipCode: "50667",
    state: "DE",
    taxRate: 0.19 // 19% (Germany VAT)
  },
  {
    name: "Galway",
    zipCode: "H91",
    state: "IE",
    taxRate: 0.23 // 23% (Ireland VAT)
  }
];

// Default tax rate for residential addresses (fallback)
export const DEFAULT_TAX_RATE = 0.0725; // 7.25%

/**
 * Get tax rate based on shipping location
 * @param shippingType - 'residential' or 'office'
 * @param location - For office: office location name, For residential: zip code
 * @returns Tax rate as decimal
 */
export function getTaxRate(shippingType: 'residential' | 'office', location: string): number {
  if (shippingType === 'office') {
    // Find office location by name
    const office = OFFICE_LOCATIONS.find(office => 
      office.name.toLowerCase() === location.toLowerCase()
    );
    return office ? office.taxRate : DEFAULT_TAX_RATE;
  } else {
    // For residential, we would need to implement zip code lookup
    // For now, return default rate
    return DEFAULT_TAX_RATE;
  }
}

/**
 * Calculate tax amount based on subtotal and location
 * @param subtotal - Order subtotal
 * @param shippingType - 'residential' or 'office' 
 * @param location - Office location name or residential zip code
 * @returns Tax amount rounded to 2 decimal places
 */
export function calculateTax(
  subtotal: number, 
  shippingType: 'residential' | 'office', 
  location: string
): number {
  const taxRate = getTaxRate(shippingType, location);
  return Math.round((subtotal * taxRate) * 100) / 100;
}

/**
 * Get office location details by name
 * @param locationName - Office location name
 * @returns Office location details or null if not found
 */
export function getOfficeLocation(locationName: string): OfficeLocation | null {
  return OFFICE_LOCATIONS.find(office => 
    office.name.toLowerCase() === locationName.toLowerCase()
  ) || null;
}

/**
 * Get all available office locations
 * @returns Array of office locations
 */
export function getAllOfficeLocations(): OfficeLocation[] {
  return OFFICE_LOCATIONS;
}
