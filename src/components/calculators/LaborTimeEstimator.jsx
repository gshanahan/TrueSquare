import React, { useState } from 'react';

export default function LaborTimeCostEstimator() {
  const [unitsOfWork, setUnitsOfWork] = useState('');
  const [crewSize, setCrewSize] = useState('');
  const [productivityRate, setProductivityRate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [hourlyWage, setHourlyWage] = useState('');

  const calculateEstimates = () => {
    const units = parseFloat(unitsOfWork) || 0;
    const crew = parseFloat(crewSize) || 0;
    const rate = parseFloat(productivityRate) || 0;
    const hoursDay = parseFloat(hoursPerDay) || 8;
    const wage = parseFloat(hourlyWage) || 0;

    const totalLaborHours = rate > 0 && crew > 0 ? units / (rate * crew) : 0;
    const totalDays = totalLaborHours / hoursDay;
    const totalCost = totalLaborHours * wage * crew;

    return {
      hours: totalLaborHours.toFixed(2),
      days: totalDays.toFixed(2),
      cost: totalCost.toFixed(2),
    };
  };

  const results = calculateEstimates();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Labor Time & Cost Estimator</h3>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Units of Work (e.g. sq ft, fixtures)"
          value={unitsOfWork}
          onChange={(e) => setUnitsOfWork(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Crew Size"
          value={crewSize}
          onChange={(e) => setCrewSize(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Productivity (units/hour/worker)"
          value={productivityRate}
          onChange={(e) => setProductivityRate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Hours per Day"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Hourly Wage ($)"
          value={hourlyWage}
          onChange={(e) => setHourlyWage(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <p><strong>Total Labor Hours:</strong> {results.hours} hrs</p>
        <p><strong>Estimated Duration:</strong> {results.days} days</p>
        <p><strong>Total Labor Cost:</strong> ${results.cost}</p>
      </div>
    </div>
  );
}
