import React, { useState } from 'react';

export default function BrickCountCalculator() {
  const [wallWidth, setWallWidth] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [brickWidth, setBrickWidth] = useState('');
  const [brickHeight, setBrickHeight] = useState('');
  const [mortarGap, setMortarGap] = useState('0.375'); // Default 3/8" mortar joint
  const [result, setResult] = useState(null);

  const calculate = () => {
    const wWidth = parseFloat(wallWidth);
    const wHeight = parseFloat(wallHeight);
    const bWidth = parseFloat(brickWidth);
    const bHeight = parseFloat(brickHeight);
    const gap = parseFloat(mortarGap);

    if ([wWidth, wHeight, bWidth, bHeight, gap].some(isNaN) || bWidth <= 0 || bHeight <= 0) {
      setResult(null);
      return;
    }

    const wallArea = wWidth * wHeight;
    const brickArea = (bWidth + gap) * (bHeight + gap);
    const count = wallArea / brickArea;

    setResult(Math.ceil(count));
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Wall Width (ft):</label>
        <input
          type="number"
          value={wallWidth}
          onChange={(e) => setWallWidth(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Wall Height (ft):</label>
        <input
          type="number"
          value={wallHeight}
          onChange={(e) => setWallHeight(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Brick Width (in):</label>
          <input
            type="number"
            value={brickWidth}
            onChange={(e) => setBrickWidth(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label>Brick Height (in):</label>
          <input
            type="number"
            value={brickHeight}
            onChange={(e) => setBrickHeight(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
      </div>

      <div>
        <label>Mortar Gap (in):</label>
        <input
          type="number"
          value={mortarGap}
          onChange={(e) => setMortarGap(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Bricks
      </button>

      {result !== null && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Estimated Bricks Needed:</strong> {result}</p>
        </div>
      )}
    </div>
  );
}
