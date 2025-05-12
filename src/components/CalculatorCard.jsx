import React from 'react';
import { calculatorComponents } from './calculators';
import { Star, StarOff } from 'lucide-react';

export default function CalculatorCard({ 
  id, 
  title, 
  types, 
  iconMap, 
  isFavorite, 
  onToggleFavorite 
}) {
  const CalculatorComponent = calculatorComponents[title];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-3 relative">

      {/* Favorite toggle */}
      <button
        onClick={() => onToggleFavorite(id)}
        className="absolute top-3 right-3 text-yellow-500 hover:scale-110 transition-transform"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <Star fill="currentColor" /> : <StarOff />}
      </button>

      {/* Title */}
      <h3 className="text-lg font-semibold pr-8">{title}</h3>

      {/* Calculator content (if exists) */}
      {CalculatorComponent ? (
        <div className="pt-2 border-t border-gray-200">
          <CalculatorComponent />
        </div>
      ) : (
        <p className="text-sm text-gray-500">Calculator coming soon...</p>
      )}

      {/* Type tags with icons */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-700 pt-2 border-t border-gray-100">
        {types.map(type => {
          const Icon = iconMap[type];
          return (
            <span
              key={type}
              className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
            >
              {Icon && <Icon size={14} />}
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
}
