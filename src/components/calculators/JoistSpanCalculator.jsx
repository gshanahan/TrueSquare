import React, { useState } from 'react';

const spanTable = {
  '2x6': { '16': 9.5, '24': 8 },
  '2x8': { '16': 12, '24': 10 },
  '2x10': { '16': 15, '24': 13 },
  '2x12': { '16': 18, '24': 16 },
};

export default function JoistSpanCalculator() {
  const [joistSize, setJoistSize] = useState('2x8');
  const [spacing, setSpacing] = useState('16');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const span = spanTable[joistSize]?.[spacing];
    if (span) {
      setResult(`${span} feet`);
    } else {
      setResult('No data available for that combination.');
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Joist Size:</label>
          <select
            value={joistSize}
            onChange={(e) => setJoistSize(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          >
            <option value="2x6">2x6</option>
            <option value="2x8">2x8</option>
            <option value="2x10">2x10</option>
            <option value="2x12">2x12</option>
          </select>
        </div>

        <div>
          <label>Joist Spacing (inches):</label>
          <select
            value={spacing}
            onChange={(e) => setSpacing(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          >
            <option value="16">16" O.C.</option>
            <option value="24">24" O.C.</option>
          </select>
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
          <strong>Estimated Max Span:</strong> {result}
        </div>
      )}
    </div>
  );
}
