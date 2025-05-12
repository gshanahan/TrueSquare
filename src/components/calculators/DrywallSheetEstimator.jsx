import React, { useState } from 'react';

export default function DrywallSheetEstimator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [bothSides, setBothSides] = useState(false);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length);
    const h = parseFloat(height);
    if (isNaN(l) || isNaN(h) || l <= 0 || h <= 0) {
      setResult('Please enter valid dimensions.');
      return;
    }

    const surfaceArea = l * h * (bothSides ? 2 : 1);
    const sheetArea = 4 * 8; // standard 4'x8' sheet
    const sheets = Math.ceil(surfaceArea / sheetArea);

    setResult(`${sheets} sheet(s) of drywall needed.`);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label>Wall Length (ft):</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label>Wall Height (ft):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div className="flex items-center mt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={bothSides}
              onChange={(e) => setBothSides(e.target.checked)}
            />
            Cover both sides?
          </label>
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}
