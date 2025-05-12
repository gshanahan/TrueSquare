import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CalculatorCard from './components/CalculatorCard';

const ALL_TYPES = ['Concrete', 'Masonry', 'Tile', 'Pools', 'Framing'];

const dummyCalculators = [
  { id: 1, title: 'Concrete Volume', type: 'Concrete' },
  { id: 2, title: 'Tile Surface Area', type: 'Tile' },
  { id: 3, title: 'Masonry Wall Estimator', type: 'Masonry' },
];

export default function App() {
  const [filters, setFilters] = useState(['Concrete']);

  const handleAddFilter = (type) => {
    if (!filters.includes(type)) setFilters([...filters, type]);
  };

  const handleRemoveFilter = (type) => {
    setFilters(filters.filter(f => f !== type));
  };

  const visibleCalculators = dummyCalculators.filter(calc =>
    filters.includes(calc.type)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="p-4">
        <FilterBar
          filters={filters}
          onAdd={handleAddFilter}
          onRemove={handleRemoveFilter}
          allTypes={ALL_TYPES}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {visibleCalculators.map(calc => (
            <CalculatorCard key={calc.id} title={calc.title} type={calc.type} />
          ))}
        </div>
      </div>
    </div>
  );
}
