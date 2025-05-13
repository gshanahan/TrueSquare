import React, { useState } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import CalculatorCard from './components/CalculatorCard';
import {
  Box,
  BrickWall,
  LayoutGrid,
  Waves,
  Ruler,
  Square,
  Zap,
  Toilet,
  Home,
  PocketKnife
} from 'lucide-react';

const ALL_TYPES = [
  'Favorites',
  'Concrete',
  'Masonry',
  'Tile',
  'Pools',
  'Framing',
  'Drywall',
  'Electrical',
  'Plumbing',
  'Roofing',
  'General Purpose',
];

const ICON_MAP = {
  Concrete: Box,
  Masonry: BrickWall,
  Tile: LayoutGrid,
  Pools: Waves,
  Framing: Ruler,
  Drywall: Square,
  Electrical: Zap,
  Plumbing: Toilet,
  Roofing: Home,
  'General Purpose': PocketKnife,
};

const dummyCalculators = [
  { id: 1, title: 'Concrete Volume', types: ['Concrete', 'Pools', 'General Purpose'] },
  { id: 2, title: 'Rebar Estimator', types: ['Concrete', 'Masonry'] },
  { id: 3, title: 'Slab Cost Estimator', types: ['Concrete', 'General Purpose'] },
  { id: 4, title: 'Block Wall Estimator', types: ['Masonry', 'Framing'] },
  { id: 5, title: 'Brick Count Calculator', types: ['Masonry'] },
  { id: 6, title: 'Mortar Mix Calculator', types: ['Masonry', 'Tile'] },
  { id: 7, title: 'Tile Quantity Calculator', types: ['Tile', 'Pools', 'General Purpose'] },
  { id: 8, title: 'Thinset Coverage Estimator', types: ['Tile'] },
  { id: 9, title: 'Underlayment Cost Estimator', types: ['Tile', 'General Purpose'] },
  { id: 10, title: 'Concrete Volume for Pools', types: ['Pools', 'Concrete'] },
  { id: 11, title: 'Pool Perimeter & Surface Area', types: ['Pools', 'General Purpose'] },
  { id: 12, title: 'Tile & Coping Calculator', types: ['Pools', 'Tile'] },
  { id: 13, title: 'Board Foot Calculator', types: ['Framing', 'Roofing'] },
  { id: 14, title: 'Stud Spacing Calculator', types: ['Framing', 'Drywall'] },
  { id: 15, title: 'Joist Span Calculator', types: ['Framing', 'Roofing'] },
  { id: 16, title: 'Drywall Sheet Estimator', types: ['Drywall', 'Framing'] },
  { id: 17, title: 'Joint Compound Estimator', types: ['Drywall'] },
  { id: 18, title: 'Screw Count Estimator', types: ['Drywall', 'Framing'] },
  { id: 19, title: 'Conduit Fill Calculator', types: ['Electrical'] },
  { id: 20, title: 'Voltage Drop Calculator', types: ['Electrical'] },
  { id: 21, title: 'Breaker Load Estimator', types: ['Electrical'] },
  { id: 22, title: 'Pipe Volume Calculator', types: ['Plumbing', 'Pools'] },
  { id: 23, title: 'Drain Slope Checker', types: ['Plumbing'] },
  { id: 24, title: 'Fixture Unit Calculator', types: ['Plumbing'] },
  { id: 25, title: 'Shingle Estimator', types: ['Roofing'] },
  { id: 26, title: 'Roof Pitch Calculator', types: ['Roofing'] },
  { id: 27, title: 'Ice & Water Shield Estimator', types: ['Roofing'] },
  { id: 28, title: 'Surface Area & Perimeter', types: ['General Purpose', 'Tile', 'Pools'] },
  { id: 29, title: 'Material Weight Calculator', types: ['General Purpose'] },
  { id: 30, title: 'Labor Time Estimator', types: ['General Purpose'] },
];

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('favorites');
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.length > 0 ? ['Favorites'] : ['Concrete'];
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleAddFilter = (type) => {
    if (!filters.includes(type)) setFilters([...filters, type]);
  };

  const handleRemoveFilter = (type) => {
    setFilters(filters.filter(f => f !== type));
  };

  const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const visibleCalculators = dummyCalculators.filter(calc => {
    const matchesFilter = filters.length === 0
      ? true
      : filters.includes('Favorites')
        ? favorites.includes(calc.id)
        : calc.types.some(t => filters.includes(t));
  
    const matchesSearch = calc.title.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="p-4 max-w-7xl mx-auto">
        <FilterPanel
          filters={filters}
          onAdd={handleAddFilter}
          onRemove={handleRemoveFilter}
          allTypes={ALL_TYPES}
          iconMap={ICON_MAP}
        />

        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {visibleCalculators.map(calc => (
            <CalculatorCard
              key={calc.id}
              title={calc.title}
              types={calc.types}
              iconMap={ICON_MAP}
              isFavorite={favorites.includes(calc.id)}
              onToggleFavorite={() => toggleFavorite(calc.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
