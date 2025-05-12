import ConcreteVolumeCalculator from './ConcreteVolumeCalculator';
import TileQuantityCalculator from './TileQuantityCalculator';
import PoolPerimeterSurfaceAreaCalculator from './PoolPerimeterSurfaceAreaCalculator';
import ConcreteVolumeForPoolsCalculator from './ConcreteVolumeForPoolsCalculator';
import PipeVolumeCalculator from './PipeVolumeCalculator';
import RebarEstimator from './RebarEstimator';
import SlabCostEstimator from './SlabCostEstimator';
import MortarMixCalculator from './MortarMixCalculator';
import BlockWallEstimator from './BlockWallEstimator';
import VoltageDropCalculator from './VoltageDropCalculator';
import ConduitFillCalculator from './ConduitFillCalculator';

// import more calculators as you create them

export const calculatorComponents = {
  'Concrete Volume': ConcreteVolumeCalculator,
  'Tile Quantity Calculator': TileQuantityCalculator,
  'Pool Perimeter & Surface Area': PoolPerimeterSurfaceAreaCalculator,
  'Concrete Volume for Pools': ConcreteVolumeForPoolsCalculator,
  'Pipe Volume Calculator': PipeVolumeCalculator,
  'Rebar Estimator': RebarEstimator,
  'Slab Cost Estimator': SlabCostEstimator,
  'Mortar Mix Calculator': MortarMixCalculator,
  'Block Wall Estimator': BlockWallEstimator,
  'Voltage Drop Calculator': VoltageDropCalculator,
  'Conduit Fill Calculator': ConduitFillCalculator,

  // Add others here like:
  // 'Tile Quantity Calculator': TileQuantityCalculator,
};
