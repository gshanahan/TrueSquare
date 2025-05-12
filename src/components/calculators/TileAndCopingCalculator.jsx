import React, { useState } from 'react';

export default function TileAndCopingCalculator() {
  const [poolPerimeter, setPoolPerimeter] = useState('');
  const [tileHeight, setTileHeight] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [copingLength, setCopingLength] = useState('');
  const [tileCount, setTileCount] = useState(null);
  const [copingCount, setCopingCount] = useState(null);

  const calculate = () => {
    const perimeter = parseFloat(poolPerimeter);
    const height = parseFloat(tileHeight);
    const width = parseFloat(tileWidth);
    const coping = parseFloat(copingLength);

    if (
      isNaN(perimeter) ||
      isNaN(height) ||
      isNaN(width) ||
      isNaN(coping) ||
      perimeter <= 0 ||
      height <= 0 ||
      width <= 0 ||
      coping <= 0
    ) {
      setTileCount(null);
      setCopingCount(null);
      return;
    }

    const tileArea = (width / 12) * (height / 12); // in square feet
    const totalTileArea = perimeter * height / 12; // linear ft × ft height = sq ft
    const tilesNeeded = Math.ceil(totalTileArea / tileArea);

    const copingUnits = Math.ceil(perimeter / coping);

    setTileCount(tilesNeeded);
    setCopingCount(copingUnits);
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Pool Perimeter (linear feet):</label>
        <input
          type="number"
          value={poolPerimeter}
          onChange={(e) => setPoolPerimeter(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Tile Height (inches):</label>
        <input
          type="number"
          value={tileHeight}
          onChange={(e) => setTileHeight(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Tile Width (inches):</label>
        <input
          type="number"
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Coping Length (inches per piece):</label>
        <input
          type="number"
          value={copingLength}
          onChange={(e) => setCopingLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Materials
      </button>

      {(tileCount !== null || copingCount !== null) && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          {tileCount !== null && <p><strong>Tiles Needed:</strong> {tileCount}</p>}
          {copingCount !== null && <p><strong>Coping Units Needed:</strong> {copingCount}</p>}
        </div>
      )}
    </div>
  );
}
