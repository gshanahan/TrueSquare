import React, { useState } from 'react';

export default function PipeVolumeCalculator() {
  const [unit, setUnit] = useState('in'); // 'in' for inches, 'mm' for millimeters
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [volume, setVolume] = useState(null);

  const calculate = () => {
    const d = parseFloat(diameter);
    const l = parseFloat(length);
    if (isNaN(d) || isNaN(l)) {
      setVolume(null);
      return;
    }

    let volumeCubicInches;

    if (unit === 'in') {
      volumeCubicInches = Math.PI * Math.pow(d / 2, 2) * l;
    } else if (unit === 'mm') {
      const dIn = d * 0.0393701;
      const lIn = l * 0.0393701;
      volumeCubicInches = Math.PI * Math.pow(dIn / 2, 2) * lIn;
    }

    const gallons = volumeCubicInches * 0.004329;
    const liters = gallons * 3.78541;

    setVolume({
      gallons: gallons.toFixed(2),
      liters: liters.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block font-medium">Units:</label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="in">Inches</option>
          <option value="mm">Millimeters</option>
        </select>
      </div>

      <div>
        <label>Inner Diameter ({unit}):</label>
        <input
          type="number"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Length of Pipe ({unit}):</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <button
        onClick={calculate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Calculate Volume
      </button>

      {volume && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Volume:</strong></p>
          <p>{volume.gallons} gallons</p>
          <p>{volume.liters} liters</p>
        </div>
      )}
    </div>
  );
}
