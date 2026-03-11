import type { CellType } from '../../../types';
import { DEPTHS, EXTENDED_DEPTH } from './dungeonConstants';
import {
  DoorWallSVG,
  StairsDownSVG,
  StairsUpSVG,
  ChestWallSVG,
  TraderWallSVG,
  BossWallSVG,
  DefaultWallSVG,
} from './WallTypes';

export function FrontWall({ depth, cellType }: { depth: number; cellType?: CellType }) {
  if (depth >= DEPTHS.length) return null;

  const d = DEPTHS[depth];

  if (cellType === 'door') {
    return <DoorWallSVG d={d} />;
  }

  if (cellType === 'stairs_down') {
    const next = depth < DEPTHS.length - 1 ? DEPTHS[depth + 1] : EXTENDED_DEPTH;
    return <StairsDownSVG d={d} next={next} />;
  }

  if (cellType === 'stairs_up') {
    const next = depth < DEPTHS.length - 1 ? DEPTHS[depth + 1] : EXTENDED_DEPTH;
    return <StairsUpSVG d={d} next={next} />;
  }

  if (cellType === 'chest') {
    return <ChestWallSVG d={d} />;
  }

  if (cellType === 'trader') {
    return <TraderWallSVG d={d} />;
  }

  if (cellType === 'boss') {
    return <BossWallSVG d={d} />;
  }

  return <DefaultWallSVG d={d} />;
}
