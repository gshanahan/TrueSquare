import React from 'react';

export default function CalculatorCard({ title, types, iconMap }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 text-sm text-gray-700">
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
