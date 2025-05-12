import React, { useState } from 'react';

export default function ThinsetCoverageEstimator() {
  const [bagSize, setBagSize] = useState('50'); // pounds
  const [trowelSize, setTrowelSize] = useState('1/4 x 1/4');
  const [areaToCover, setAreaToCover] = useState('');
  const [bagsNeeded, setBagsNeeded] = useState(null);

  const coverageMap = {
    '1/4 x 1/4': 50,
    '1/4 x 3/8': 40,
    '1/2 x 1/2': 30,
  };

  const calculate = () => {
    const area = parseFloat(areaToCover);
    const coveragePerBag = coverageMap[trowelSize];

    if (isNaN(area) || area <= 0 || !coveragePerBag) {
      setBagsNeeded(null);
      return;
    }

    const needed = area / coveragePerBag;
    setBagsNeeded(Math.ceil(needed));
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Thinset Bag Size (lbs):</label>
        <input
          type="number"
          value={bagSize}
          onChange={(e) => setBagSize(e.target.value)}
          className="border w-full px-2 py-1 rounded"
          disabled
        />
      </div>

      <div>
        <label>Trowel Size:</label>
        <select
          value={trowelSize}
          onChange={(e) => setTrowelSize(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        >
          <option value="1/4 x 1/4">1/4" x 1/4"</option>
          <option value="1/4 x 3/8">1/4" x 3/8"</option>
          <option value="1/2 x 1/2">1/2" x 1/2"</option>
        </select>
      </div>

      <div>
        <label>Area to Cover (sq ft):</label>
        <input
          type="number"
          value={areaToCover}
          onChange={(e) => setAreaToCover(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Bags Needed
      </button>

      {bagsNeeded !== null && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Bags Needed:</strong> {bagsNeeded}</p>
        </div>
      )}
    </div>
  );
}
