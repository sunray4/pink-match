"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !isLoading) {
      setIsLoading(true);
      
      try {
        // Send fetch request to backend search endpoint
        const requestUrl = `http://localhost:8000/search?query=${encodeURIComponent(searchQuery.trim())}`;
        console.log('Making request to:', requestUrl);
        
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        // const response = { ok: true, status: 200, statusText: "OK", json: async () => ([
        //   {
        //     "asin": "B000123456",
        //     "title": "Sample Deodorant",
        //     "description": "This is a sample deodorant description.",
        //     "rating": 4.5,
        //     "price": "$9.99",
        //     "image_url": "http://example.com/image.jpg",
        //     "ingredients": ["Ingredient1", "Ingredient2"],
        //     "fragrances": ["Floral", "Citrus"],
        //     "volume_ml": 150,
        //     "unitPrice": 0.0666,
        //     "similarity_score": 0.95
        //   }
        // ]) };
        if (response.ok) {
          console.log('***Search request succeeded');
          const data = await response.json()
          const query = data.query
          const original_product = data.original_product
          const results = data.results

          console.log('Search results:', results);

          // Store the search results in localStorage to pass to product page
          localStorage.setItem('searchResults', JSON.stringify(results));
          localStorage.setItem('originalProduct', JSON.stringify(original_product));

          console.log('About to redirect to product page...');
          
          // Redirect to product page with search query as URL parameter
          await router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
          
          console.log('Redirect completed');
        } else {
          console.error('Search request failed:', response.status, response.statusText);
          // Still redirect even if API fails, but with empty results
          localStorage.setItem('searchResults', JSON.stringify([]));
          await router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        // Still redirect even if there's an error, but with empty results
        localStorage.setItem('searchResults', JSON.stringify([]));
        await router.push(`/product?q=${encodeURIComponent(searchQuery.trim())}`);
      } finally {
        // Reset loading state after redirect attempt
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <div className="absolute top-[550px] sm:top-[580px] md:top-[600px] lg:top-[616px] left-[40px] right-[40px] sm:left-[180px] sm:right-[150px] md:left-[150px] lg:left-[180px] md:right-auto md:w-[500px] h-[50px] sm:h-[55px] md:h-[60px]" data-node-id="1:3">
        <form onSubmit={handleSearch} className="relative w-full h-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search Products"
            disabled={isLoading}
            className={`absolute inset-0 w-full h-full bg-white border-2 border-[#b67999] rounded-[30px] px-4 pr-25 sm:pr-30 md:pr-25 font-[var(--font-instrument-sans)] text-[#b67999] text-lg sm:text-xl md:text-[24px] tracking-[-0.5px] sm:tracking-[-0.8px] md:tracking-[-0.96px] placeholder:text-[#b67999] outline-none focus:border-[#fca4c0] transition-colors ${isLoading ? 'opacity-50' : ''}`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#fca4c0] hover:bg-[#f794b4] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-[20px] font-[var(--font-instrument-sans)] font-medium transition-colors text-sm sm:text-base ${isLoading ? 'cursor-not-allowed' : ''} flex items-center justify-center min-w-[80px] hover:cursor-pointer`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Search'
            )}
          </button>
        </form>
      
    </div>
  );
}