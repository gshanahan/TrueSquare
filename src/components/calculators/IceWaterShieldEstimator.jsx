import React, { useState } from 'react';

export default function IceWaterShieldEstimator() {
  const [eaveLength, setEaveLength] = useState('');
  const [valleyCount, setValleyCount] = useState('');
  const [valleyLength, setValleyLength] = useState('');
  const [wastePercent, setWastePercent] = useState('10');
  const [rollCoverageSqFt, setRollCoverageSqFt] = useState('200'); // standard roll coverage

  const calculateTotalCoverage = () => {
    const eave = parseFloat(eaveLength) || 0;
    const vCount = parseInt(valleyCount) || 0;
    const vLength = parseFloat(valleyLength) || 0;
    const waste = parseFloat(wastePercent) / 100 || 0;
    const rollCoverage = parseFloat(rollCoverageSqFt) || 200;

    const eaveArea = eave * 3; // 3 ft width standard
    const valleyArea = vCount * vLength * 3;

    const totalSqFt = (eaveArea + valleyArea) * (1 + waste);
    const rolls = Math.ceil(totalSqFt / rollCoverage);

    return {
      totalSqFt: totalSqFt.toFixed(1),
      rolls,
    };
  };

  const results = calculateTotalCoverage();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Ice & Water Shield Estimator</h3>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Total Eave Length (ft)"
          value={eaveLength}
          onChange={(e) => setEaveLength(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Number of Valleys"
          value={valleyCount}
          onChange={(e) => setValleyCount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Length of Each Valley (ft)"
          value={valleyLength}
          onChange={(e) => setValleyLength(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Waste Percentage (%)"
          value={wastePercent}
          onChange={(e) => setWastePercent(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Roll Coverage (sq ft)"
          value={rollCoverageSqFt}
          onChange={(e) => setRollCoverageSqFt(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <p><strong>Total Area (with waste):</strong> {results.totalSqFt} sq ft</p>
        <p><strong>Rolls Needed:</strong> {results.rolls}</p>
      </div>
    </div>
  );
}
