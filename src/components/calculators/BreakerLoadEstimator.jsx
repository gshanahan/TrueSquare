import React, { useState } from 'react';

export default function BreakerLoadEstimator() {
  const [devices, setDevices] = useState([{ watts: '', volts: '' }]);
  const [safetyFactor, setSafetyFactor] = useState('125');

  const handleDeviceChange = (index, field, value) => {
    const updated = [...devices];
    updated[index][field] = value;
    setDevices(updated);
  };

  const addDevice = () => {
    setDevices([...devices, { watts: '', volts: '' }]);
  };

  const calculateTotalAmps = () => {
    return devices.reduce((total, device) => {
      const watts = parseFloat(device.watts) || 0;
      const volts = parseFloat(device.volts) || 120;
      return total + (watts / volts);
    }, 0);
  };

  const suggestBreakerSize = () => {
    const rawAmps = calculateTotalAmps();
    const factor = parseFloat(safetyFactor) / 100 || 1.25;
    const adjustedAmps = rawAmps * factor;

    // Find the next standard breaker size
    const standardSizes = [15, 20, 30, 40, 50, 60, 70, 100, 125, 150, 200];
    return standardSizes.find(size => size >= adjustedAmps) || 'Exceeds 200A';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Breaker Load Estimator</h3>
      <div className="space-y-2">
        {devices.map((device, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="number"
              placeholder="Watts"
              value={device.watts}
              onChange={(e) => handleDeviceChange(index, 'watts', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Volts"
              value={device.volts}
              onChange={(e) => handleDeviceChange(index, 'volts', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          onClick={addDevice}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          + Add Device
        </button>
        <input
          type="number"
          placeholder="Safety Factor (%)"
          value={safetyFactor}
          onChange={(e) => setSafetyFactor(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <p><strong>Total Load:</strong> {calculateTotalAmps().toFixed(2)} amps</p>
        <p><strong>Suggested Breaker Size:</strong> {suggestBreakerSize()} A</p>
      </div>
    </div>
  );
}
