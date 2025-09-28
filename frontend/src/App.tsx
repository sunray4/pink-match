import React, { useState } from 'react';
import MacBookAir2 from './components/MacBookAir2';
import MacBookAir3 from './components/MacBookAir3';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'search' | 'compare'>('search');

  const handleCompareClick = () => {
    setCurrentPage('compare');
  };

  const handleBackClick = () => {
    setCurrentPage('search');
  };

  return (
    <div className="size-full">
      {currentPage === 'search' ? (
        <MacBookAir2 onCompareClick={handleCompareClick} />
      ) : (
        <MacBookAir3 onBackClick={handleBackClick} />
      )}
    </div>
  );
}