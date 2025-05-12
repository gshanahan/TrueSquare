import React, { useState } from 'react';

export default function BoardFootCalculator() {
  const [thickness, setThickness] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerBF, setPricePerBF] = useState('');
  const [results, setResults] = useState(null);

  const calculate = () => {
    const t = parseFloat(thickness);
    const w = parseFloat(width);
    const l = parseFloat(length);
    const q = parseInt(quantity, 10);
    const price = parseFloat(pricePerBF);

    if (
      isNaN(t) || isNaN(w) || isNaN(l) || isNaN(q) || q <= 0 ||
      t <= 0 || w <= 0 || l <= 0
    ) {
      setResults(null);
      return;
    }

    const boardFeet = (t * w * l * q) / 144;
    const cost = !isNaN(price) ? boardFeet * price : null;
    const volumeCubicFt = (t * w * l * q) / 1728;

    setResults({
      boardFeet: boardFeet.toFixed(2),
      cost: cost !== null ? cost.toFixed(2) : null,
      volumeCubicFt: volumeCubicFt.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Thickness (inches):</label>
          <input
            type="number"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Width (inches):</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Length (inches):</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label>Cost per Board Foot (optional):</label>
          <input
            type="number"
            value={pricePerBF}
            onChange={(e) => setPricePerBF(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {results && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-2">
          <div><strong>Total Board Feet:</strong> {results.boardFeet}</div>
          <div><strong>Estimated Volume:</strong> {results.volumeCubicFt} cubic feet</div>
          {results.cost && (
            <div><strong>Total Estimated Cost:</strong> ${results.cost}</div>
          )}
        </div>
      )}
    </div>
  );
}
