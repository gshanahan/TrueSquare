import React, { useState } from 'react';

export default function ConcreteVolumeForPoolsCalculator() {
  const [shape, setShape] = useState('rectangle');
  const [unit, setUnit] = useState('ft');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depthShallow, setDepthShallow] = useState('');
  const [depthDeep, setDepthDeep] = useState('');
  const [results, setResults] = useState(null);

  const toMeters = val => unit === 'm' ? val : val * 0.3048;
  const format = val => parseFloat(val).toFixed(2);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d1 = parseFloat(depthShallow);
    const d2 = parseFloat(depthDeep);

    if (isNaN(l) || isNaN(w) || isNaN(d1) || isNaN(d2)) {
      setResults(null);
      return;
    }

    const avgDepth = (d1 + d2) / 2;

    let volume = 0;
    if (shape === 'rectangle') {
      volume = l * w * avgDepth;
    } else if (shape === 'oval') {
      volume = Math.PI * (l / 2) * (w / 2) * avgDepth;
    } else if (shape === 'kidney') {
      // Rough estimate using average ellipse method
      volume = (3.14 / 4) * l * w * avgDepth * 0.9;
    }

    const volumeInCubicMeters = unit === 'm' ? volume : volume * 0.0283168;
    const cubicYards = volumeInCubicMeters / 0.764555; // m³ to yd³

    setResults({
      cubicMeters: `${format(volumeInCubicMeters)} m³`,
      cubicYards: `${format(cubicYards)} yd³`
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block font-medium">Shape:</label>
        <select
          value={shape}
          onChange={e => setShape(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="rectangle">Rectangle</option>
          <option value="oval">Oval</option>
          <option value="kidney">Kidney</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Units:</label>
        <select
          value={unit}
          onChange={e => setUnit(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="ft">Feet</option>
          <option value="m">Meters</option>
        </select>
      </div>

      <div>
        <label>Length ({unit}):</label>
        <input
          type="number"
          value={length}
          onChange={e => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Width ({unit}):</label>
        <input
          type="number"
          value={width}
          onChange={e => setWidth(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Shallow Depth ({unit}):</label>
        <input
          type="number"
          value={depthShallow}
          onChange={e => setDepthShallow(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Deep Depth ({unit}):</label>
        <input
          type="number"
          value={depthDeep}
          onChange={e => setDepthDeep(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Volume
      </button>

      {results && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <p><strong>Volume:</strong></p>
          <p>{results.cubicMeters} (cubic meters)</p>
          <p>{results.cubicYards} (cubic yards)</p>
        </div>
      )}
    </div>
  );
}
