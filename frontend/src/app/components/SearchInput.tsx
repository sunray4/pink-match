"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to product page with search query as URL parameter
      router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <div className="absolute inset-[23.6%_51.64%_74.1%_9.3%]" data-node-id="1:3">
      <form onSubmit={handleSearch} className="relative w-full h-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Deodorants"
          className="absolute inset-0 w-full h-full bg-white border-2 border-[#b67999] rounded-[30px] px-4 font-[var(--font-instrument-sans)] text-[#b67999] text-[24px] tracking-[-0.96px] placeholder:text-[#b67999] outline-none focus:border-[#fca4c0] transition-colors"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#fca4c0] hover:bg-[#f794b4] text-white px-4 py-2 rounded-[20px] font-[var(--font-instrument-sans)] font-medium transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}