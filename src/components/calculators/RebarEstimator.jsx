import React, { useState } from 'react';

export default function RebarEstimator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [spacing, setSpacing] = useState('');
  const [rodLength, setRodLength] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const s = parseFloat(spacing);
    const rod = parseFloat(rodLength);

    if (isNaN(l) || isNaN(w) || isNaN(s) || isNaN(rod) || s <= 0 || rod <= 0) {
      setResult(null);
      return;
    }

    const horizontalCount = Math.ceil(w / s) + 1;
    const verticalCount = Math.ceil(l / s) + 1;

    const totalHorizontalLength = horizontalCount * l;
    const totalVerticalLength = verticalCount * w;
    const totalLength = totalHorizontalLength + totalVerticalLength;

    const rodsNeeded = Math.ceil(totalLength / rod);

    setResult({
      horizontalBars: horizontalCount,
      verticalBars: verticalCount,
      totalLength: totalLength.toFixed(2),
      rodsNeeded,
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Slab Length (ft):</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Slab Width (ft):</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Spacing Between Bars (inches):</label>
        <input
          type="number"
          value={spacing}
          onChange={(e) => setSpacing(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Rod Length (ft):</label>
        <input
          type="number"
          value={rodLength}
          onChange={(e) => setRodLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Rebar
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Horizontal Bars Needed:</strong> {result.horizontalBars}</p>
          <p><strong>Vertical Bars Needed:</strong> {result.verticalBars}</p>
          <p><strong>Total Length of Rebar:</strong> {result.totalLength} ft</p>
          <p><strong>Estimated Rods Needed:</strong> {result.rodsNeeded}</p>
        </div>
      )}
    </div>
  );
}
