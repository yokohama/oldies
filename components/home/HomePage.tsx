'use client';

import { useState } from 'react';
import Header from '../ui/Header';
import EraSelector from './EraSelector';
import EraDescription from './EraDescription';
import ProductCarousel from './ProductCarousel';
import { products } from '@/lib/sample-data';

const HomePage = () => {
  const [selectedEra, setSelectedEra] = useState('70s');
  const [rangeValue, setRangeValue] = useState([5, 9]);
  
  // Filter products based on selected era
  const filteredProducts = products.filter(
    product => product.era === selectedEra
  );

  const handleEraChange = (era: string) => {
    setSelectedEra(era);
    
    // Set default range values based on era
    switch(era) {
      case '50s': setRangeValue([0, 4]); break;
      case '60s': setRangeValue([2, 6]); break;
      case '70s': setRangeValue([5, 9]); break;
      case '80s': setRangeValue([3, 7]); break;
      case '90s': setRangeValue([4, 8]); break;
      default: setRangeValue([5, 9]);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:px-6">
      <Header />
      <EraSelector 
        selectedEra={selectedEra} 
        onEraChange={handleEraChange}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
      />
      <EraDescription era={selectedEra} rangeValue={rangeValue} />
      <ProductCarousel products={filteredProducts} />
    </div>
  );
};

export default HomePage;