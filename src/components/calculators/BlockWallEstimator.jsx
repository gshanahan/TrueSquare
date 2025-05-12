import React, { useState } from 'react';

export default function BlockWallEstimator() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [blockWidth, setBlockWidth] = useState(16); // standard 16" block
  const [blockHeight, setBlockHeight] = useState(8); // standard 8" block
  const [wastePct, setWastePct] = useState(5);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length);
    const h = parseFloat(height);
    const bw = parseFloat(blockWidth);
    const bh = parseFloat(blockHeight);
    const waste = parseFloat(wastePct);

    if ([l, h, bw, bh, waste].some(v => isNaN(v) || v <= 0)) {
      setResult(null);
      return;
    }

    const wallArea = l * h;
    const blockArea = (bw / 12) * (bh / 12); // convert inches to ft
    const blocksNeeded = wallArea / blockArea;
    const totalBlocks = Math.ceil(blocksNeeded * (1 + waste / 100));
    const mortarBags = Math.ceil(totalBlocks / 18); // Rough: 1 bag/18 blocks

    setResult({
      wallArea: wallArea.toFixed(2),
      blocksRaw: blocksNeeded.toFixed(2),
      blocksTotal: totalBlocks,
      mortarBags,
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Wall Length (ft):</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Wall Height (ft):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Block Width (in):</label>
          <input
            type="number"
            value={blockWidth}
            onChange={(e) => setBlockWidth(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Block Height (in):</label>
          <input
            type="number"
            value={blockHeight}
            onChange={(e) => setBlockHeight(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          />
        </div>
      </div>

      <div>
        <label>Waste %:</label>
        <input
          type="number"
          value={wastePct}
          onChange={(e) => setWastePct(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Blocks
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Wall Area:</strong> {result.wallArea} sq ft</p>
          <p><strong>Raw Blocks Needed:</strong> ~{result.blocksRaw}</p>
          <p><strong>Total Blocks (with waste):</strong> {result.blocksTotal}</p>
          <p><strong>Mortar Bags Needed:</strong> {result.mortarBags}</p>
        </div>
      )}
    </div>
  );
}
