/**
 * Utility functions for currency formatting
 */

export type Currency = 'USD' | 'CAD' | 'EUR';

/**
 * Get the currency symbol for a given currency
 */
export function getCurrencySymbol(currency: Currency): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'CAD':
      return '$';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
}

/**
 * Format a price with the appropriate currency symbol and formatting
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  
  // Round CAD and EUR to whole numbers, keep USD with decimals
  const formattedAmount = currency === 'CAD' || currency === 'EUR' 
    ? Math.round(amount).toLocaleString()
    : amount.toLocaleString();
  
  return `${symbol}${formattedAmount}`;
}

/**
 * Format a price with currency symbol and code (e.g., "€1,234 EUR")
 */
export function formatCurrencyWithCode(amount: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  
  // Round CAD and EUR to whole numbers, keep USD with decimals
  const formattedAmount = currency === 'CAD' || currency === 'EUR' 
    ? Math.round(amount).toLocaleString()
    : amount.toLocaleString();
  
  return `${symbol}${formattedAmount} ${currency}`;
}
