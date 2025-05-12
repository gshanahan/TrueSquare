import React, { useState } from 'react';

export default function TileQuantityCalculator() {
  const [area, setArea] = useState('');
  const [tileLength, setTileLength] = useState('');
  const [tileWidth, setTileWidth] = useState('');
  const [wastage, setWastage] = useState(10); // default 10% waste

  const areaNum = parseFloat(area) || 0;
  const lengthNum = parseFloat(tileLength) || 0;
  const widthNum = parseFloat(tileWidth) || 0;
  const wastageFactor = 1 + (parseFloat(wastage) || 0) / 100;

  const tileArea = (lengthNum * widthNum) / 144; // in square feet (from inches)
  const rawTilesNeeded = tileArea ? areaNum / tileArea : 0;
  const totalTiles = Math.ceil(rawTilesNeeded * wastageFactor);

  return (
    <div className="space-y-3 text-sm">
      <div>
        <label className="block font-medium">Total area to cover (sq ft):</label>
        <input
          type="number"
          value={area}
          onChange={e => setArea(e.target.value)}
          className="w-full mt-1 p-1 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Tile length (inches):</label>
          <input
            type="number"
            value={tileLength}
            onChange={e => setTileLength(e.target.value)}
            className="w-full mt-1 p-1 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Tile width (inches):</label>
          <input
            type="number"
            value={tileWidth}
            onChange={e => setTileWidth(e.target.value)}
            className="w-full mt-1 p-1 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Wastage (%)</label>
        <input
          type="number"
          value={wastage}
          onChange={e => setWastage(e.target.value)}
          className="w-full mt-1 p-1 border rounded"
        />
      </div>

      <div className="pt-2 border-t mt-3 text-gray-800 font-semibold">
        Total tiles needed: {totalTiles || 0}
      </div>
    </div>
  );
}
