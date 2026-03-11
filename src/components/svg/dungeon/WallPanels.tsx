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

export function SideWall({ depth, side }: { depth: number; side: 'left' | 'right' }) {
  if (depth >= DEPTHS.length) return null;
  const curr = DEPTHS[depth];
  const next = depth < DEPTHS.length - 1 ? DEPTHS[depth + 1] : EXTENDED_DEPTH;
  const x1 = side === 'left' ? curr.left : curr.right;
  const x2 = side === 'left' ? next.left : next.right;
  return (
    <polygon
      points={`${x1},${curr.top} ${x2},${next.top} ${x2},${next.bottom} ${x1},${curr.bottom}`}
      fill="url(#sideWallGrad)"
      stroke="#222233"
      strokeWidth="1"
    />
  );
}

export function FrontWall({ depth, cellType, side }: { depth: number; cellType?: CellType; side?: 'left' | 'right' }) {
  if (depth >= DEPTHS.length) return null;

  if (side) {
    if (depth < 1) return null;
    const curr = DEPTHS[depth];
    const prev = DEPTHS[depth - 1];
    const x = side === 'left' ? prev.left : curr.right;
    const w = side === 'left' ? curr.left - prev.left : prev.right - curr.right;
    return (
      <rect
        x={x} y={curr.top}
        width={w} height={curr.bottom - curr.top}
        fill="url(#wallGrad)" stroke="#222233" strokeWidth="1"
      />
    );
  }

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
