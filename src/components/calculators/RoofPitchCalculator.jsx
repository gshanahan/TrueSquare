import React, { useState } from 'react';

export default function RoofPitchCalculator() {
  const [rise, setRise] = useState('');
  const [runInches, setRunInches] = useState('');
  const [runFeet, setRunFeet] = useState('');

  const calculateResults = () => {
    const r = parseFloat(rise) || 0;
    const f = parseFloat(runFeet) || 0;
    const i = parseFloat(runInches) || 0;
    const run = f * 12 + i;

    if (run === 0) return { pitch: 0, angle: 0, multiplier: 1 };

    const pitch = (r / run) * 12;
    const angle = Math.atan(r / run) * (180 / Math.PI);
    const multiplier = Math.sqrt(1 + Math.pow(r / run, 2));

    return {
      pitch: pitch.toFixed(2),
      angle: angle.toFixed(2),
      multiplier: multiplier.toFixed(3),
    };
  };

  const { pitch, angle, multiplier } = calculateResults();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Roof Pitch Calculator</h3>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Rise (inches)"
          value={rise}
          onChange={(e) => setRise(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Run (ft)"
            value={runFeet}
            onChange={(e) => setRunFeet(e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Run (in)"
            value={runInches}
            onChange={(e) => setRunInches(e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>
      <div>
        <p><strong>Pitch:</strong> {pitch} in/ft</p>
        <p><strong>Angle:</strong> {angle}°</p>
        <p><strong>Multiplier:</strong> {multiplier}</p>
      </div>
    </div>
  );
}
