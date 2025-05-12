import React, { useState } from 'react';

export default function PoolPerimeterSurfaceAreaCalculator() {
  const [shape, setShape] = useState('rectangle');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [results, setResults] = useState(null);

  const calculate = () => {
    let perimeter = 0;
    let area = 0;

    if (shape === 'rectangle') {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (!isNaN(l) && !isNaN(w)) {
        perimeter = 2 * (l + w);
        area = l * w;
      }
    } else if (shape === 'circle') {
      const d = parseFloat(diameter);
      if (!isNaN(d)) {
        const r = d / 2;
        perimeter = Math.PI * d;
        area = Math.PI * r * r;
      }
    }

    setResults({ perimeter: perimeter.toFixed(2), area: area.toFixed(2) });
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block font-medium">Pool Shape:</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
      </div>

      {shape === 'rectangle' && (
        <>
          <div>
            <label>Length (ft):</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="border w-full px-2 py-1 rounded"
            />
          </div>
          <div>
            <label>Width (ft):</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border w-full px-2 py-1 rounded"
            />
          </div>
        </>
      )}

      {shape === 'circle' && (
        <div>
          <label>Diameter (ft):</label>
          <input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
      )}

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Perimeter:</strong> {results.perimeter} ft</p>
          <p><strong>Surface Area:</strong> {results.area} sq ft</p>
        </div>
      )}
    </div>
  );
}
