import React, { useState } from 'react';

export default function JointCompoundEstimator() {
  const [area, setArea] = useState('');
  const [sheets, setSheets] = useState('');
  const [sheetWidth, setSheetWidth] = useState('4');
  const [sheetHeight, setSheetHeight] = useState('8');
  const [finishLevel, setFinishLevel] = useState('standard');
  const [wastePercent, setWastePercent] = useState('10'); // default 10%

  const getCoverageRate = () => {
    switch (finishLevel) {
      case 'basic':
        return 0.05;
      case 'high':
        return 0.08;
      default:
        return 0.07;
    }
  };

  const calculateGallons = () => {
    const a = parseFloat(area) || 0;
    const s = parseFloat(sheets) || 0;
    const w = parseFloat(sheetWidth) || 4;
    const h = parseFloat(sheetHeight) || 8;
    const waste = parseFloat(wastePercent) || 0;

    const sheetArea = w * h;
    const totalArea = a + s * sheetArea;
    const totalWithWaste = totalArea * (1 + waste / 100);
    const gallonsNeeded = totalWithWaste * getCoverageRate();

    return gallonsNeeded.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Joint Compound Estimator</h3>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Manual Area (sq ft)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="# of Drywall Sheets"
          value={sheets}
          onChange={(e) => setSheets(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Sheet Width (ft)"
            value={sheetWidth}
            onChange={(e) => setSheetWidth(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Sheet Height (ft)"
            value={sheetHeight}
            onChange={(e) => setSheetHeight(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <select
          value={finishLevel}
          onChange={(e) => setFinishLevel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="basic">Basic Finish</option>
          <option value="standard">Standard Finish</option>
          <option value="high">High-Level Finish</option>
        </select>
        <input
          type="number"
          placeholder="Waste Percentage (%)"
          value={wastePercent}
          onChange={(e) => setWastePercent(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <strong>Total Joint Compound Needed:</strong> {calculateGallons()} gallons
      </div>
    </div>
  );
}
