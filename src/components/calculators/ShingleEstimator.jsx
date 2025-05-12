import React, { useState } from 'react';

export default function ShingleEstimator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [area, setArea] = useState('');
  const [wastePercent, setWastePercent] = useState('10');
  const [bundleCoverage, setBundleCoverage] = useState('33.3'); // sq ft per bundle

  const calculateArea = () => {
    const a = parseFloat(area);
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (!isNaN(a) && a > 0) return a;
    if (!isNaN(l) && !isNaN(w)) return l * w;
    return 0;
  };

  const calculateResults = () => {
    const baseArea = calculateArea();
    const waste = parseFloat(wastePercent) / 100 || 0;
    const coverage = parseFloat(bundleCoverage) || 33.3;

    const adjustedArea = baseArea * (1 + waste);
    const squares = adjustedArea / 100;
    const bundles = adjustedArea / coverage;

    return {
      totalArea: adjustedArea.toFixed(1),
      squares: squares.toFixed(2),
      bundles: Math.ceil(bundles),
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Shingle Estimator</h3>
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
          placeholder="OR Enter Roof Area (sq ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Waste (%)"
          value={wastePercent}
          onChange={(e) => setWastePercent(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Shingle Coverage per Bundle (sq ft)"
          value={bundleCoverage}
          onChange={(e) => setBundleCoverage(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <p><strong>Total Roof Area (with waste):</strong> {results.totalArea} sq ft</p>
        <p><strong>Total Squares:</strong> {results.squares} squares</p>
        <p><strong>Bundles Needed:</strong> {results.bundles} bundles</p>
      </div>
    </div>
  );
}
