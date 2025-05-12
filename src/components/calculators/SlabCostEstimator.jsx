import React, { useState } from 'react';

export default function SlabCostEstimator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [concreteCost, setConcreteCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const t = parseFloat(thickness);
    const costPerYard = parseFloat(concreteCost);
    const laborPerSqft = parseFloat(laborCost) || 0;

    if (isNaN(l) || isNaN(w) || isNaN(t) || isNaN(costPerYard) || l <= 0 || w <= 0 || t <= 0 || costPerYard <= 0) {
      setResult(null);
      return;
    }

    // Convert thickness to feet and calculate cubic feet
    const volumeFt3 = l * w * (t / 12);
    const volumeYd3 = volumeFt3 / 27;
    const materialCost = volumeYd3 * costPerYard;

    const areaSqft = l * w;
    const laborTotal = areaSqft * laborPerSqft;

    const totalCost = materialCost + laborTotal;

    setResult({
      volumeYd3: volumeYd3.toFixed(2),
      materialCost: materialCost.toFixed(2),
      laborCost: laborTotal.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Length (ft):</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Width (ft):</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Thickness (inches):</label>
        <input
          type="number"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Concrete Cost ($/yd³):</label>
        <input
          type="number"
          value={concreteCost}
          onChange={(e) => setConcreteCost(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Labor Cost ($/ft²):</label>
        <input
          type="number"
          value={laborCost}
          onChange={(e) => setLaborCost(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Cost
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Volume:</strong> {result.volumeYd3} yd³</p>
          <p><strong>Material Cost:</strong> ${result.materialCost}</p>
          <p><strong>Labor Cost:</strong> ${result.laborCost}</p>
          <p><strong>Total Estimated Cost:</strong> ${result.totalCost}</p>
        </div>
      )}
    </div>
  );
}
