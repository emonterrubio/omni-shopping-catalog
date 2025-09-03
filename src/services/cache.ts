import { SearchResult } from './search';
import { SearchIntent } from './ai';

interface CacheEntry {
  result: SearchResult;
  timestamp: number;
}

class SearchCache {
  private cache: Map<string, CacheEntry>;
  private readonly TTL: number = 1000 * 60 * 60; // 1 hour in milliseconds
  private readonly MAX_SIZE: number = 100; // Maximum number of cached entries

  constructor() {
    this.cache = new Map();
  }

  private generateKey(query: string): string {
    return query.toLowerCase().trim();
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.TTL;
  }

  private cleanup(): void {
    // Remove expired entries
    Array.from(this.cache.entries()).forEach(([key, entry]) => {
      if (this.isExpired(entry.timestamp)) {
        this.cache.delete(key);
      }
    });

    // If still over max size, remove oldest entries
    if (this.cache.size > this.MAX_SIZE) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const entriesToRemove = entries.slice(0, entries.length - this.MAX_SIZE);
      entriesToRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  get(query: string): SearchResult | null {
    const key = this.generateKey(query);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (this.isExpired(entry.timestamp)) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  set(query: string, result: SearchResult): void {
    const key = this.generateKey(query);
    this.cache.set(key, {
      result,
      timestamp: Date.now()
    });
    this.cleanup();
  }

  clear(): void {
    this.cache.clear();
  }
}

// Create a singleton instance
export const searchCache = new SearchCache();

// Cache decorator for search functions
export function withCache<T extends (...args: any[]) => Promise<SearchResult>>(
  fn: T
): T {
  return (async (...args: Parameters<T>): Promise<SearchResult> => {
    const query = args[0] as string;
    const cachedResult = searchCache.get(query);

    if (cachedResult) {
      return cachedResult;
    }

    const result = await fn(...args);
    searchCache.set(query, result);
    return result;
  }) as T;
} 