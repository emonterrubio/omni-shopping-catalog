"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar";

export function SearchBarClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearchSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!res.ok) throw new Error("Failed to parse intent");
      const intent = await res.json();
      // Build query string from intent object
      const params = new URLSearchParams();
      Object.entries(intent).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
      });
      // Always include the original query
      params.append("q", searchQuery);
      router.push(`/search?${params.toString()}`);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      {loading && <div className="text-sm text-gray-500 mt-2">Searching...</div>}
      {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
    </div>
  );
} 