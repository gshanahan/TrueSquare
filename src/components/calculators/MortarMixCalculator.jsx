import React, { useState } from 'react';

export default function MortarMixCalculator() {
  const [unitType, setUnitType] = useState('brick'); // 'brick' or 'block'
  const [unitCount, setUnitCount] = useState('');
  const [coveragePerBag, setCoveragePerBag] = useState('');
  const [result, setResult] = useState(null);

  const defaultCoverage = unitType === 'brick' ? 40 : 18; // approx units per 60 lb bag

  const calculate = () => {
    const count = parseFloat(unitCount);
    const coverage = parseFloat(coveragePerBag) || defaultCoverage;

    if (isNaN(count) || isNaN(coverage) || count <= 0 || coverage <= 0) {
      setResult(null);
      return;
    }

    const bagsNeeded = count / coverage;
    setResult({
      bagsNeeded: Math.ceil(bagsNeeded),
      rawBags: bagsNeeded.toFixed(2),
      coverageUsed: coverage,
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Unit Type:</label>
        <select
          value={unitType}
          onChange={(e) => setUnitType(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        >
          <option value="brick">Brick</option>
          <option value="block">Block</option>
        </select>
      </div>

      <div>
        <label>Number of {unitType}s:</label>
        <input
          type="number"
          value={unitCount}
          onChange={(e) => setUnitCount(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Coverage per Bag (units/bag):</label>
        <input
          type="number"
          value={coveragePerBag}
          onChange={(e) => setCoveragePerBag(e.target.value)}
          placeholder={`Default: ${defaultCoverage}`}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Bags
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Coverage Used:</strong> {result.coverageUsed} {unitType}s/bag</p>
          <p><strong>Bags Needed:</strong> ~{result.rawBags} ({result.bagsNeeded} bags rounded up)</p>
        </div>
      )}
    </div>
  );
}
