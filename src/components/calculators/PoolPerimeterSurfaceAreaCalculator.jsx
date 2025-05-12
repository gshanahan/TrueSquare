import React, { useState } from 'react';

export default function PoolPerimeterSurfaceAreaCalculator() {
  const [shape, setShape] = useState('rectangle');
  const [unit, setUnit] = useState('ft');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [customPerimeter, setCustomPerimeter] = useState('');
  const [customArea, setCustomArea] = useState('');
  const [results, setResults] = useState(null);

  const toMeters = (val) => unit === 'm' ? val : val * 0.3048;
  const format = (val) => parseFloat(val).toFixed(2);

  const calculate = () => {
    let perimeter = 0;
    let area = 0;

    if (shape === 'rectangle') {
      const l = toMeters(parseFloat(length));
      const w = toMeters(parseFloat(width));
      if (!isNaN(l) && !isNaN(w)) {
        perimeter = 2 * (l + w);
        area = l * w;
      }
    } else if (shape === 'circle') {
      const d = toMeters(parseFloat(diameter));
      const r = d / 2;
      if (!isNaN(d)) {
        perimeter = Math.PI * d;
        area = Math.PI * r * r;
      }
    } else if (shape === 'irregular') {
      const p = toMeters(parseFloat(customPerimeter));
      const a = parseFloat(customArea) * (unit === 'm' ? 1 : 0.092903); // ft² to m²
      if (!isNaN(p) && !isNaN(a)) {
        perimeter = p;
        area = a;
      }
    }

    setResults({
      perimeter: `${format(perimeter)} m`,
      area: `${format(area)} m²`,
    });
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
          <option value="irregular">Irregular (custom input)</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Unit:</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="ft">Feet</option>
          <option value="m">Meters</option>
        </select>
      </div>

      {shape === 'rectangle' && (
        <>
          <div>
            <label>Length ({unit}):</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="border w-full px-2 py-1 rounded"
            />
          </div>
          <div>
            <label>Width ({unit}):</label>
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
          <label>Diameter ({unit}):</label>
          <input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
      )}

      {shape === 'irregular' && (
        <>
          <div>
            <label>Estimated Perimeter ({unit}):</label>
            <input
              type="number"
              value={customPerimeter}
              onChange={(e) => setCustomPerimeter(e.target.value)}
              className="border w-full px-2 py-1 rounded"
            />
          </div>
          <div>
            <label>Estimated Surface Area ({unit}²):</label>
            <input
              type="number"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className="border w-full px-2 py-1 rounded"
            />
          </div>
        </>
      )}

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Perimeter:</strong> {results.perimeter}</p>
          <p><strong>Surface Area:</strong> {results.area}</p>
        </div>
      )}
    </div>
  );
}
