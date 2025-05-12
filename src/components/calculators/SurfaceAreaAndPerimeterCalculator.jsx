import React, { useState } from 'react';

export default function SurfaceAreaPerimeterCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const calculateResults = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    const perimeter = 2 * (l + w);
    const area = l * w;

    let volume = null;
    let surfaceArea = null;

    if (h > 0) {
      volume = l * w * h;
      surfaceArea = 2 * (l * w + l * h + w * h);
    }

    return {
      perimeter: perimeter.toFixed(2),
      area: area.toFixed(2),
      volume: volume !== null ? volume.toFixed(2) : null,
      surfaceArea: surfaceArea !== null ? surfaceArea.toFixed(2) : null,
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Surface Area & Perimeter Calculator</h3>
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
          placeholder="Height (ft, optional)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <p><strong>Perimeter:</strong> {results.perimeter} ft</p>
        <p><strong>Area:</strong> {results.area} sq ft</p>
        {results.volume && <p><strong>Volume:</strong> {results.volume} cu ft</p>}
        {results.surfaceArea && <p><strong>Surface Area:</strong> {results.surfaceArea} sq ft</p>}
      </div>
    </div>
  );
}
