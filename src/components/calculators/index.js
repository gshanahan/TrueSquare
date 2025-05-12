import ConcreteVolumeCalculator from './ConcreteVolumeCalculator';
import TileQuantityCalculator from './TileQuantityCalculator';
import PoolPerimeterSurfaceAreaCalculator from './PoolPerimeterSurfaceAreaCalculator';

// import more calculators as you create them

export const calculatorComponents = {
  'Concrete Volume': ConcreteVolumeCalculator,
  'Tile Quantity Calculator': TileQuantityCalculator,
  'Pool Perimeter & Surface Area': PoolPerimeterSurfaceAreaCalculator,

  // Add others here like:
  // 'Tile Quantity Calculator': TileQuantityCalculator,
};
