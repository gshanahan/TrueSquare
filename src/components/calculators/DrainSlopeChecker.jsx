import React, { useState } from 'react';

export default function DrainSlopeChecker() {
  const [lengthFeet, setLengthFeet] = useState('');
  const [lengthInches, setLengthInches] = useState('');
  const [dropInches, setDropInches] = useState('');

  const calculateSlope = () => {
    const feet = parseFloat(lengthFeet) || 0;
    const inches = parseFloat(lengthInches) || 0;
    const totalRunFeet = feet + inches / 12;
    const drop = parseFloat(dropInches) || 0;

    if (totalRunFeet === 0) return 0;
    return (drop / totalRunFeet).toFixed(2); // inches per foot
  };

  const isSlopeSufficient = () => {
    const slope = parseFloat(calculateSlope());
    return slope >= 0.25; // minimum 1/4" per foot
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Drain Slope Checker</h3>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Run Length (ft)"
            value={lengthFeet}
            onChange={(e) => setLengthFeet(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Run Length (in)"
            value={lengthInches}
            onChange={(e) => setLengthInches(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <input
          type="number"
          placeholder="Elevation Drop (in)"
          value={dropInches}
          onChange={(e) => setDropInches(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <p><strong>Slope:</strong> {calculateSlope()} in/ft</p>
        <p className={isSlopeSufficient() ? 'text-green-600' : 'text-red-600'}>
          <strong>{isSlopeSufficient() ? 'PASS' : 'FAIL'}</strong> – {isSlopeSufficient() ? 'Slope meets code' : 'Slope too shallow'}
        </p>
      </div>
    </div>
  );
}
