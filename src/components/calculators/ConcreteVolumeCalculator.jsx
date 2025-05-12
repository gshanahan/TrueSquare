import React, { useState } from 'react';

export default function ConcreteVolumeCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');

  const calculateVolume = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    return ((l * w * (d / 12)) / 27).toFixed(2); // Cubic yards
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Concrete Volume Calculator</h3>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Depth (in)"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <strong>Volume:</strong> {calculateVolume()} cubic yards
      </div>
    </div>
  );
}
