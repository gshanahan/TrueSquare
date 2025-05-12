import React from 'react';
import { X } from 'lucide-react';

export default function FilterPanel({ filters, onAdd, onRemove, allTypes, iconMap }) {
  const availableTypes = allTypes.filter(type => !filters.includes(type));

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {filters.map(type => {
          const Icon = iconMap[type];
          return (
            <span
              key={type}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {Icon && <Icon size={16} />}
              {type}
              <button onClick={() => onRemove(type)}>
                <X size={12} />
              </button>
            </span>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {availableTypes.map(type => {
          const Icon = iconMap[type];
          return (
            <button
              key={type}
              onClick={() => onAdd(type)}
              className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {Icon && <Icon size={16} />}
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
