import React, { useState } from 'react';

// Sample wire and conduit sizes (cross-sectional area in mm²)
const wireSizes = {
  '14 AWG': 2.08,
  '12 AWG': 3.31,
  '10 AWG': 5.26,
  '8 AWG': 8.37,
  '6 AWG': 13.3,
  '4 AWG': 21.1,
  '2 AWG': 33.6,
};

const conduitSizes = {
  '1/2" EMT': 138,   // mm², 40% fill
  '3/4" EMT': 239,
  '1" EMT': 387,
  '1-1/4" EMT': 684,
  '1-1/2" EMT': 958,
  '2" EMT': 1380,
};

export default function ConduitFillCalculator() {
  const [wireType, setWireType] = useState('12 AWG');
  const [wireCount, setWireCount] = useState('');
  const [conduitType, setConduitType] = useState('3/4" EMT');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const wireArea = wireSizes[wireType];
    const conduitArea = conduitSizes[conduitType];
    const count = parseInt(wireCount);

    if (!wireArea || !conduitArea || isNaN(count) || count <= 0) {
      setResult(null);
      return;
    }

    const totalFill = wireArea * count;
    const percentFill = (totalFill / conduitArea) * 100;

    setResult({
      totalFill: totalFill.toFixed(1),
      percentFill: percentFill.toFixed(1),
      isOverLimit: percentFill > 40,
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Wire Size:</label>
        <select
          value={wireType}
          onChange={(e) => setWireType(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        >
          {Object.keys(wireSizes).map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Number of Conductors:</label>
        <input
          type="number"
          value={wireCount}
          onChange={(e) => setWireCount(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Conduit Size:</label>
        <select
          value={conduitType}
          onChange={(e) => setConduitType(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        >
          {Object.keys(conduitSizes).map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Fill
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Total Fill:</strong> {result.totalFill} mm²</p>
          <p><strong>Fill Percentage:</strong> {result.percentFill}%</p>
          <p className={result.isOverLimit ? 'text-red-600' : 'text-green-700'}>
            {result.isOverLimit
              ? 'Over 40% – Exceeds typical fill capacity'
              : 'Within 40% – Acceptable'}
          </p>
        </div>
      )}
    </div>
  );
}
