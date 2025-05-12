import React, { useState } from 'react';

export default function UnderlaymentCostEstimator() {
  const [area, setArea] = useState('');
  const [coveragePerUnit, setCoveragePerUnit] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [totalCost, setTotalCost] = useState(null);
  const [unitsNeeded, setUnitsNeeded] = useState(null);

  const calculate = () => {
    const a = parseFloat(area);
    const c = parseFloat(coveragePerUnit);
    const p = parseFloat(pricePerUnit);

    if (isNaN(a) || isNaN(c) || isNaN(p) || a <= 0 || c <= 0 || p <= 0) {
      setTotalCost(null);
      setUnitsNeeded(null);
      return;
    }

    const units = Math.ceil(a / c);
    const cost = units * p;

    setUnitsNeeded(units);
    setTotalCost(cost.toFixed(2));
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Area to Cover (sq ft):</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Coverage per Unit (sq ft per roll/sheet):</label>
        <input
          type="number"
          value={coveragePerUnit}
          onChange={(e) => setCoveragePerUnit(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Price per Unit ($):</label>
        <input
          type="number"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Cost
      </button>

      {totalCost !== null && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Units Needed:</strong> {unitsNeeded}</p>
          <p><strong>Total Cost:</strong> ${totalCost}</p>
        </div>
      )}
    </div>
  );
}
