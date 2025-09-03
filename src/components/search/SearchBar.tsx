import React from "react";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export function SearchBar({ searchQuery, onSearchChange, onSearchSubmit }: SearchBarProps) {
  return (
    <div className="pb-8">
      <form action="/search" method="get" className="relative" onSubmit={e => { e.preventDefault(); onSearchSubmit(); }}>
        <input
          type="text"
          name="q"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search for IT equipment..."
          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-700"
        >
        </button>
      </form>
    </div>
  );
} 