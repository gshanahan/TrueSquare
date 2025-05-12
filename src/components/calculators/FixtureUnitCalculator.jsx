import React, { useState } from 'react';

const FIXTURE_OPTIONS = [
  { label: 'Lavatory (bathroom sink)', units: 1 },
  { label: 'Toilet (flush tank)', units: 2.5 },
  { label: 'Shower', units: 2 },
  { label: 'Kitchen Sink', units: 2 },
  { label: 'Dishwasher', units: 1.5 },
  { label: 'Clothes Washer', units: 2.5 },
  { label: 'Bathtub', units: 2 },
  { label: 'Water Heater', units: 1.5 },
  { label: 'Hose Bibb (exterior faucet)', units: 2.5 },
];

export default function FixtureUnitCalculator() {
  const [fixtures, setFixtures] = useState([]);

  const addFixture = () => {
    setFixtures([...fixtures, { type: '', count: 1 }]);
  };

  const updateFixture = (index, field, value) => {
    const updated = [...fixtures];
    updated[index][field] = value;
    setFixtures(updated);
  };

  const calculateTotalUnits = () => {
    return fixtures.reduce((total, f) => {
      const fixture = FIXTURE_OPTIONS.find(opt => opt.label === f.type);
      const units = fixture ? fixture.units : 0;
      const count = parseInt(f.count) || 0;
      return total + units * count;
    }, 0);
  };

  const suggestPipeSize = () => {
    const total = calculateTotalUnits();
    if (total <= 4) return '1/2"';
    if (total <= 8) return '3/4"';
    if (total <= 16) return '1"';
    if (total <= 31) return '1 1/4"';
    if (total <= 47) return '1 1/2"';
    return '2" or larger (engineering required)';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Plumbing Fixture Unit Calculator</h3>
      <div className="space-y-2">
        {fixtures.map((f, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={f.type}
              onChange={(e) => updateFixture(index, 'type', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Fixture</option>
              {FIXTURE_OPTIONS.map(opt => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} ({opt.units} FU)
                </option>
              ))}
            </select>
            <input
              type="number"
              value={f.count}
              onChange={(e) => updateFixture(index, 'count', e.target.value)}
              placeholder="Qty"
              className="w-20 p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={addFixture}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          + Add Fixture
        </button>
      </div>
      <div>
        <p><strong>Total Fixture Units:</strong> {calculateTotalUnits()}</p>
        <p><strong>Suggested Pipe Size:</strong> {suggestPipeSize()}</p>
      </div>
    </div>
  );
}
