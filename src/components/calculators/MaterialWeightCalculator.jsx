import React, { useState } from 'react';

export default function MaterialWeightCalculator() {
  const [shape, setShape] = useState('Rectangular');
  const [unitSystem, setUnitSystem] = useState('Imperial'); // or 'Metric'

  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [thickness, setThickness] = useState('');
  const [diameter, setDiameter] = useState('');
  const [density, setDensity] = useState('');
  const [material, setMaterial] = useState('');

  const materialDensities = {
    Concrete: { Imperial: 150, Metric: 2400 },   // lb/ft³ | kg/m³
    Steel: { Imperial: 490, Metric: 7850 },
    Wood: { Imperial: 35, Metric: 560 },
    Brick: { Imperial: 120, Metric: 1920 },
    Gravel: { Imperial: 100, Metric: 1600 },
  };

  const unitLabels = {
    length: unitSystem === 'Imperial' ? 'ft' : 'm',
    thickness: unitSystem === 'Imperial' ? 'ft' : 'm',
    diameter: unitSystem === 'Imperial' ? 'ft' : 'm',
    density: unitSystem === 'Imperial' ? 'lb/ft³' : 'kg/m³',
    volume: unitSystem === 'Imperial' ? 'ft³' : 'm³',
    weight: unitSystem === 'Imperial' ? 'lbs' : 'kg',
  };

  const handleMaterialChange = (mat) => {
    setMaterial(mat);
    setDensity(materialDensities[mat][unitSystem] || '');
  };

  const calculateResults = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    const d = parseFloat(diameter) || 0;
    const dens = parseFloat(density) || 0;

    let volume = 0;

    if (shape === 'Rectangular') {
      volume = l * w * t;
    } else if (shape === 'Cylindrical') {
      const radius = d / 2;
      volume = Math.PI * Math.pow(radius, 2) * l;
    }

    const weight = volume * dens;

    return {
      volume: volume.toFixed(3),
      weight: weight.toFixed(2),
    };
  };

  const { volume, weight } = calculateResults();

  return (
    <div className="space-y-4">
      <h3 className="text-md font-semibold">Material Weight Calculator</h3>

      {/* Toggles */}
      <div className="flex gap-4">
        <select
          value={unitSystem}
          onChange={(e) => {
            setUnitSystem(e.target.value);
            if (material) handleMaterialChange(material); // update density units
          }}
          className="p-2 border rounded"
        >
          <option value="Imperial">Imperial (ft, lb)</option>
          <option value="Metric">Metric (m, kg)</option>
        </select>

        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Rectangular">Rectangular</option>
          <option value="Cylindrical">Cylindrical</option>
        </select>
      </div>

      {/* Inputs */}
      <div className="space-y-2">
        <select
          value={material}
          onChange={(e) => handleMaterialChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Material</option>
          {Object.keys(materialDensities).map((mat) => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder={`Length (${unitLabels.length})`}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {shape === 'Rectangular' ? (
          <>
            <input
              type="number"
              placeholder={`Width (${unitLabels.length})`}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder={`Thickness (${unitLabels.thickness})`}
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </>
        ) : (
          <input
            type="number"
            placeholder={`Diameter (${unitLabels.diameter})`}
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )}

        <input
          type="number"
          placeholder={`Density (${unitLabels.density})`}
          value={density}
          onChange={(e) => setDensity(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Results */}
      <div>
        <p><strong>Volume:</strong> {volume} {unitLabels.volume}</p>
        <p><strong>Weight:</strong> {weight} {unitLabels.weight}</p>
      </div>
    </div>
  );
}
