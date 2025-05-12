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
import BrickCountCalculator from './BrickCountCalculator';
import ThinsetCoverageEstimator from './ThinsetCoverageEstimator';
import UnderlaymentCostEstimator from './UnderlaymentCostEstimator';
import TileAndCopingCalculator from './TileAndCopingCalculator';
import BoardFootCalculator from './BoardFootCalculator';
import StudSpacingCalculator from './StudSpacingCalculator';
import JoistSpanCalculator from './JoistSpanCalculator';
import DrywallSheetEstimator from './DrywallSheetEstimator';
import ScrewCountEstimator from './ScrewCountEstimator';
import JointCompoundEstimator from './JointCompoundEstimator';
import BreakerLoadEstimator from './BreakerLoadEstimator';
import DrainSlopeChecker from './DrainSlopeChecker';
import FixtureUnitCalculator from './FixtureUnitCalculator';
import ShingleEstimator from './ShingleEstimator';
import RoofPitchCalculator from './RoofPitchCalculator';
import IceWaterShieldEstimator from './IceWaterShieldEstimator';
import SurfaceAreaPerimeterCalculator from './SurfaceAreaAndPerimeterCalculator';
import MaterialWeightCalculator from './MaterialWeightCalculator';
import LaborTimeCostEstimator from './LaborTimeEstimator';

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
  'Brick Count Calculator': BrickCountCalculator,
  'Thinset Coverage Estimator': ThinsetCoverageEstimator,
  'Underlayment Cost Estimator': UnderlaymentCostEstimator,
  'Tile & Coping Calculator': TileAndCopingCalculator,
  'Board Foot Calculator': BoardFootCalculator,
  'Stud Spacing Calculator': StudSpacingCalculator,
  'Joist Span Calculator': JoistSpanCalculator,
  'Drywall Sheet Estimator': DrywallSheetEstimator,
  'Screw Count Estimator': ScrewCountEstimator,
  'Joint Compound Estimator': JointCompoundEstimator,
  'Breaker Load Estimator': BreakerLoadEstimator,
  'Drain Slope Checker': DrainSlopeChecker,
  'Fixture Unit Calculator': FixtureUnitCalculator,
  'Shingle Estimator': ShingleEstimator,
  'Roof Pitch Calculator': RoofPitchCalculator,
  'Ice & Water Shield Estimator': IceWaterShieldEstimator,
  'Surface Area & Perimeter': SurfaceAreaPerimeterCalculator,
  'Material Weight Calculator': MaterialWeightCalculator,
  'Labor Time Estimator': LaborTimeCostEstimator,

  // Add others here like:
  // 'Tile Quantity Calculator': TileQuantityCalculator,
};
