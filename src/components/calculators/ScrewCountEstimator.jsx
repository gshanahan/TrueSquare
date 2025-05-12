import React, { useState } from 'react';

export default function ScrewCountEstimator() {
  const [sheetCount, setSheetCount] = useState('');
  const [spacing, setSpacing] = useState('12');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const sheets = parseInt(sheetCount, 10);
    const spacingInches = parseFloat(spacing);

    if (isNaN(sheets) || sheets <= 0 || isNaN(spacingInches) || spacingInches <= 0) {
      setResult('Please enter valid numbers.');
      return;
    }

    // Approximate screws per 4x8 sheet based on spacing
    // Perimeter: 4 sides = ~16 ft total; interior studs assumed every 16" = 7 studs per sheet
    const screwsPerFoot = 12 / spacingInches;
    const screwsPerSheet = Math.ceil((16 * screwsPerFoot) + (7 * screwsPerFoot));

    const totalScrews = sheets * screwsPerSheet;

    setResult(`${totalScrews} drywall screws needed.`);
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Number of Drywall Sheets:</label>
          <input
            type="number"
            value={sheetCount}
            onChange={(e) => setSheetCount(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div>
          <label>Screw Spacing (inches):</label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}
