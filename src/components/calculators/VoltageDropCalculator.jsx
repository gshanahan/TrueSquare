import React, { useState } from 'react';

const copperResistivity = 10.4; // Ohms per mil-ft for copper
const aluminumResistivity = 17; // Ohms per mil-ft for aluminum

// Wire gauge in mils (diameter)
const wireGaugeTable = {
  '14': 4110,
  '12': 6530,
  '10': 10380,
  '8': 16510,
  '6': 26240,
  '4': 41740,
  '2': 66360,
  '1/0': 105600,
  '2/0': 133100,
};

export default function VoltageDropCalculator() {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [length, setLength] = useState('');
  const [wireGauge, setWireGauge] = useState('10');
  const [material, setMaterial] = useState('copper');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const L = parseFloat(length);
    const d = wireGaugeTable[wireGauge];
    const rho = material === 'copper' ? copperResistivity : aluminumResistivity;

    if ([V, I, L, d].some(v => isNaN(v) || v <= 0)) {
      setResult(null);
      return;
    }

    const resistance = (rho * (2 * L)) / d / 1000; // Ohms
    const drop = I * resistance;
    const finalVoltage = V - drop;
    const percentDrop = (drop / V) * 100;

    setResult({
      drop: drop.toFixed(2),
      finalVoltage: finalVoltage.toFixed(2),
      percentDrop: percentDrop.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label>Source Voltage (V):</label>
        <input
          type="number"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>Current (Amps):</label>
        <input
          type="number"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div>
        <label>One-Way Distance (ft):</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border w-full px-2 py-1 rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Wire Gauge:</label>
          <select
            value={wireGauge}
            onChange={(e) => setWireGauge(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          >
            {Object.keys(wireGaugeTable).map(g => (
              <option key={g} value={g}>{g} AWG</option>
            ))}
          </select>
        </div>

        <div>
          <label>Wire Material:</label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="border w-full px-2 py-1 rounded"
          >
            <option value="copper">Copper</option>
            <option value="aluminum">Aluminum</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate Voltage Drop
      </button>

      {result && (
        <div className="mt-4 bg-gray-100 p-3 rounded space-y-1">
          <p><strong>Voltage Drop:</strong> {result.drop} V</p>
          <p><strong>Final Voltage:</strong> {result.finalVoltage} V</p>
          <p><strong>% Drop:</strong> {result.percentDrop}%</p>
        </div>
      )}
    </div>
  );
}
