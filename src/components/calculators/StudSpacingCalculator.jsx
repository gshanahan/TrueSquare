import React, { useState } from 'react';

export default function StudSpacingCalculator() {
  const [wallLength, setWallLength] = useState('');
  const [spacing, setSpacing] = useState('16');
  const [extraStuds, setExtraStuds] = useState(2);
  const [openings, setOpenings] = useState(0);
  const [results, setResults] = useState(null);

  const calculate = () => {
    const length = parseFloat(wallLength);
    const spacingInches = parseFloat(spacing);
    const extras = parseInt(extraStuds, 10);
    const numOpenings = parseInt(openings, 10);

    if (isNaN(length) || isNaN(spacingInches) || length <= 0) {
      setResults(null);
      return;
    }

    const spacingFeet = spacingInches / 12;
    let studs = Math.floor(length / spacingFeet) + 1;
    studs += extras + (numOpenings * 2); // Add 2 studs per opening

    setResults({
      totalStuds: studs,
      spacingInches,
      spacingFeet: spacingFeet.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Wall Length (feet):</label>
          <input
            type="number"
            value={wallLength}
            onChange={(e) => setWallLength(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label>Stud Spacing (inches):</label>
          <select
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          >
            <option value="16">16 in (Standard)</option>
            <option value="24">24 in</option>
          </select>
        </div>

        <div>
          <label>Extra Studs (e.g. corners):</label>
          <input
            type="number"
            value={extraStuds}
            onChange={(e) => setExtraStuds(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label>Openings (doors/windows):</label>
          <input
            type="number"
            value={openings}
            onChange={(e) => setOpenings(e.target.value)}
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
          <div><strong>Total Studs Needed:</strong> {results.totalStuds}</div>
          <div><strong>Spacing:</strong> {results.spacingInches}" ({results.spacingFeet} ft)</div>
        </div>
      )}
    </div>
  );
}
