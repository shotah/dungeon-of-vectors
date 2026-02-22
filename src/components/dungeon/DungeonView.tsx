import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { Direction, CellType } from '../../types';
import { DIRECTION_DELTAS } from '../../utils/direction';

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 400;

interface DepthConfig {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

const DEPTHS: DepthConfig[] = [
  { left: 0, right: VIEW_WIDTH, top: 0, bottom: VIEW_HEIGHT },
  { left: 100, right: VIEW_WIDTH - 100, top: 50, bottom: VIEW_HEIGHT - 50 },
  { left: 180, right: VIEW_WIDTH - 180, top: 90, bottom: VIEW_HEIGHT - 90 },
  { left: 240, right: VIEW_WIDTH - 240, top: 120, bottom: VIEW_HEIGHT - 120 },
];

function getCellAt(grid: CellType[][], x: number, y: number, width: number, height: number): CellType {
  if (x < 0 || x >= width || y < 0 || y >= height) return 'wall';
  return grid[y][x];
}

function getViewCells(
  grid: CellType[][],
  px: number, py: number,
  facing: Direction,
  width: number, height: number
): { forward: CellType[]; left: CellType[]; right: CellType[] } {
  const fd = DIRECTION_DELTAS[facing];
  const ld = facing === 'N' ? DIRECTION_DELTAS['W'] : facing === 'W' ? DIRECTION_DELTAS['S'] : facing === 'S' ? DIRECTION_DELTAS['E'] : DIRECTION_DELTAS['N'];
  const rd = { x: -ld.x, y: -ld.y };

  const forward: CellType[] = [];
  const left: CellType[] = [];
  const right: CellType[] = [];

  for (let d = 1; d <= 4; d++) {
    const fx = px + fd.x * d;
    const fy = py + fd.y * d;
    forward.push(getCellAt(grid, fx, fy, width, height));
    left.push(getCellAt(grid, fx + ld.x, fy + ld.y, width, height));
    right.push(getCellAt(grid, fx + rd.x, fy + rd.y, width, height));
  }

  return { forward, left, right };
}

function WallGradients() {
  return (
    <defs>
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a4a5a" />
        <stop offset="100%" stopColor="#2a2a3a" />
      </linearGradient>
      <linearGradient id="sideWallGradL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3a3a4a" />
        <stop offset="100%" stopColor="#4a4a5a" />
      </linearGradient>
      <linearGradient id="sideWallGradR" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#3a3a4a" />
        <stop offset="100%" stopColor="#4a4a5a" />
      </linearGradient>
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="ceilGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0f0f1a" />
      </linearGradient>
      <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#5C2E0A" />
      </linearGradient>
      <linearGradient id="stairsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#555577" />
        <stop offset="100%" stopColor="#333355" />
      </linearGradient>
      <pattern id="brickPattern" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
        <rect width="20" height="10" fill="#4a4a5a" />
        <line x1="0" y1="0" x2="20" y2="0" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="10" y1="0" x2="10" y2="5" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="20" y2="5" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="0" y2="10" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="20" y1="5" x2="20" y2="10" stroke="#3a3a4a" strokeWidth="0.5" />
      </pattern>
      <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff9933" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ff9933" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function LeftWall({ depth }: { depth: number }) {
  if (depth >= 4) return null;
  const curr = DEPTHS[depth];
  const next = depth < 3 ? DEPTHS[depth + 1] : {
    left: 270, right: VIEW_WIDTH - 270, top: 140, bottom: VIEW_HEIGHT - 140,
  };
  return (
    <polygon
      points={`${curr.left},${curr.top} ${next.left},${next.top} ${next.left},${next.bottom} ${curr.left},${curr.bottom}`}
      fill="url(#sideWallGradL)"
      stroke="#222233"
      strokeWidth="1"
    />
  );
}

function RightWall({ depth }: { depth: number }) {
  if (depth >= 4) return null;
  const curr = DEPTHS[depth];
  const next = depth < 3 ? DEPTHS[depth + 1] : {
    left: 270, right: VIEW_WIDTH - 270, top: 140, bottom: VIEW_HEIGHT - 140,
  };
  return (
    <polygon
      points={`${curr.right},${curr.top} ${next.right},${next.top} ${next.right},${next.bottom} ${curr.right},${curr.bottom}`}
      fill="url(#sideWallGradR)"
      stroke="#222233"
      strokeWidth="1"
    />
  );
}

function FrontWall({ depth, cellType }: { depth: number; cellType: CellType }) {
  if (depth >= 4) return null;
  const d = DEPTHS[depth];

  if (cellType === 'door') {
    const doorW = (d.right - d.left) * 0.4;
    const doorH = (d.bottom - d.top) * 0.7;
    const doorX = (d.left + d.right) / 2 - doorW / 2;
    const doorY = d.bottom - doorH;
    return (
      <g>
        <rect x={d.left} y={d.top} width={d.right - d.left} height={d.bottom - d.top} fill="url(#wallGrad)" stroke="#222233" strokeWidth="1" />
        <rect x={doorX} y={doorY} width={doorW} height={doorH} fill="url(#doorGrad)" stroke="#3a2510" strokeWidth="2" rx="2" />
        <circle cx={doorX + doorW - doorW * 0.15} cy={doorY + doorH / 2} r={Math.max(2, doorW * 0.05)} fill="#c0a030" />
        <rect x={doorX + doorW * 0.1} y={doorY + 3} width={doorW * 0.35} height={doorH - 6} fill="#6B3410" rx="1" />
        <rect x={doorX + doorW * 0.5} y={doorY + 3} width={doorW * 0.35} height={doorH - 6} fill="#6B3410" rx="1" />
      </g>
    );
  }

  if (cellType === 'stairs_down') {
    const sw = (d.right - d.left) * 0.6;
    const sh = (d.bottom - d.top) * 0.5;
    const sx = (d.left + d.right) / 2 - sw / 2;
    const sy = d.bottom - sh;
    const stepCount = 5;
    const stepH = sh / stepCount;
    const stepW = sw / stepCount;
    return (
      <g>
        <rect x={d.left} y={d.top} width={d.right - d.left} height={d.bottom - d.top} fill="url(#wallGrad)" stroke="#222233" strokeWidth="1" />
        {Array.from({ length: stepCount }, (_, i) => (
          <rect
            key={i}
            x={sx + i * (stepW / 2)}
            y={sy + i * stepH}
            width={sw - i * stepW}
            height={stepH}
            fill="url(#stairsGrad)"
            stroke="#222244"
            strokeWidth="0.5"
          />
        ))}
      </g>
    );
  }

  if (cellType === 'chest') {
    const cw = (d.right - d.left) * 0.3;
    const ch = (d.bottom - d.top) * 0.25;
    const cx = (d.left + d.right) / 2 - cw / 2;
    const cy = d.bottom - ch - (d.bottom - d.top) * 0.1;
    return (
      <g>
        <rect x={cx} y={cy} width={cw} height={ch} fill="#8B6914" stroke="#5C4A0A" strokeWidth="1.5" rx="2" />
        <rect x={cx} y={cy} width={cw} height={ch * 0.4} fill="#A07818" stroke="#5C4A0A" strokeWidth="1" rx="2" />
        <rect x={cx + cw * 0.35} y={cy + ch * 0.3} width={cw * 0.3} height={ch * 0.2} fill="#c0a030" rx="1" />
        <line x1={cx + 2} y1={cy + ch * 0.4} x2={cx + cw - 2} y2={cy + ch * 0.4} stroke="#5C4A0A" strokeWidth="1.5" />
      </g>
    );
  }

  if (cellType === 'trader') {
    const tw = (d.right - d.left) * 0.35;
    const th = (d.bottom - d.top) * 0.65;
    const tx = (d.left + d.right) / 2 - tw / 2;
    const ty = d.bottom - th;
    const headR = tw * 0.22;
    const headCx = tx + tw / 2;
    const headCy = ty + headR;
    return (
      <g>
        {/* Body / cloak */}
        <path
          d={`M${tx + tw * 0.15},${ty + th * 0.3} Q${tx + tw * 0.5},${ty + th * 0.25} ${tx + tw * 0.85},${ty + th * 0.3} L${tx + tw * 0.9},${ty + th} L${tx + tw * 0.1},${ty + th} Z`}
          fill="#6a4e23" stroke="#4a3413" strokeWidth="1"
        />
        {/* Hood */}
        <path
          d={`M${headCx - headR * 1.5},${headCy + headR * 0.5} Q${headCx - headR * 1.8},${headCy - headR * 1.2} ${headCx},${headCy - headR * 1.8} Q${headCx + headR * 1.8},${headCy - headR * 1.2} ${headCx + headR * 1.5},${headCy + headR * 0.5}`}
          fill="#5a3e13" stroke="#4a3413" strokeWidth="0.8"
        />
        {/* Face */}
        <circle cx={headCx} cy={headCy} r={headR * 0.8} fill="#c4956a" />
        {/* Eyes */}
        <circle cx={headCx - headR * 0.3} cy={headCy - headR * 0.1} r={headR * 0.12} fill="#333" />
        <circle cx={headCx + headR * 0.3} cy={headCy - headR * 0.1} r={headR * 0.12} fill="#333" />
        {/* Smile */}
        <path
          d={`M${headCx - headR * 0.25},${headCy + headR * 0.25} Q${headCx},${headCy + headR * 0.45} ${headCx + headR * 0.25},${headCy + headR * 0.25}`}
          fill="none" stroke="#8a6a4a" strokeWidth="0.5"
        />
        {/* Backpack */}
        <rect x={tx + tw * 0.65} y={ty + th * 0.35} width={tw * 0.25} height={th * 0.35} rx={2} fill="#8B6914" stroke="#5C4A0A" strokeWidth="0.8" />
        {/* Gold pouch */}
        <circle cx={tx + tw * 0.3} cy={ty + th * 0.7} r={tw * 0.08} fill="#daa520" stroke="#b8860b" strokeWidth="0.5" />
      </g>
    );
  }

  return (
    <rect
      x={d.left} y={d.top}
      width={d.right - d.left} height={d.bottom - d.top}
      fill="url(#wallGrad)"
      stroke="#222233"
      strokeWidth="1"
    />
  );
}

function TorchSconce({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g>
      <rect x={x - size * 0.15} y={y} width={size * 0.3} height={size * 0.8} fill="#5a3a1a" />
      <ellipse cx={x} cy={y - size * 0.1} rx={size * 0.25} ry={size * 0.35} fill="#ff6600" opacity="0.8">
        <animate attributeName="ry" values={`${size * 0.35};${size * 0.45};${size * 0.35}`} dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.7;0.9;0.8" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx={x} cy={y - size * 0.2} rx={size * 0.12} ry={size * 0.2} fill="#ffcc00" opacity="0.9">
        <animate attributeName="ry" values={`${size * 0.2};${size * 0.28};${size * 0.2}`} dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      <circle cx={x} cy={y} r={size * 1.5} fill="url(#torchGlow)" />
    </g>
  );
}

function FloorAndCeiling() {
  return (
    <g>
      <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT / 2} fill="url(#ceilGrad)" />
      <rect x={0} y={VIEW_HEIGHT / 2} width={VIEW_WIDTH} height={VIEW_HEIGHT / 2} fill="url(#floorGrad)" />
    </g>
  );
}

export default function DungeonView() {
  const dungeon = useGameStore(s => s.dungeon);
  const position = useGameStore(s => s.position);
  const facing = useGameStore(s => s.facing);

  if (!dungeon) return null;

  const typeGrid = dungeon.grid.map(row => row.map(cell => cell.type));
  const { forward, left, right } = getViewCells(
    typeGrid, position.x, position.y, facing,
    dungeon.width, dungeon.height
  );

  const wallElements: React.ReactElement[] = [];

  for (let d = 3; d >= 0; d--) {
    const fwdCell = forward[d];
    const leftCell = left[d];
    const rightCell = right[d];

    if (fwdCell === 'wall') {
      wallElements.push(<FrontWall key={`fw-${d}`} depth={d} cellType="wall" />);
      if (d <= 2) {
        const depthCfg = DEPTHS[d];
        const wallW = depthCfg.right - depthCfg.left;
        const wallH = depthCfg.bottom - depthCfg.top;
        if (wallW > 60) {
          wallElements.push(
            <TorchSconce
              key={`torch-${d}`}
              x={(depthCfg.left + depthCfg.right) / 2}
              y={depthCfg.top + wallH * 0.3}
              size={Math.max(4, wallW * 0.04)}
            />
          );
        }
      }
      break;
    }

    if (fwdCell === 'door') {
      wallElements.push(<FrontWall key={`fw-${d}`} depth={d} cellType="door" />);
      break;
    }

    if (fwdCell === 'stairs_down') {
      wallElements.push(<FrontWall key={`fw-${d}`} depth={d} cellType="stairs_down" />);
    }

    if (fwdCell === 'chest') {
      wallElements.push(<FrontWall key={`fw-${d}`} depth={d} cellType="chest" />);
    }

    if (fwdCell === 'trader') {
      wallElements.push(<FrontWall key={`fw-${d}`} depth={d} cellType="trader" />);
    }

    if (leftCell === 'wall') {
      wallElements.push(<LeftWall key={`lw-${d}`} depth={d} />);
    }
    if (rightCell === 'wall') {
      wallElements.push(<RightWall key={`rw-${d}`} depth={d} />);
    }
  }

  const currentCell = dungeon.grid[position.y]?.[position.x];
  const onStairs = currentCell?.type === 'stairs_down';
  const onTrader = currentCell?.type === 'trader';

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      width="100%"
      height="100%"
      style={{ background: '#0a0a15', borderRadius: 8, border: '2px solid #333' }}
    >
      <WallGradients />
      <FloorAndCeiling />
      {wallElements}
      {onStairs && (
        <text x={VIEW_WIDTH / 2} y={VIEW_HEIGHT - 15} textAnchor="middle" fill="#aaccff" fontSize="14" fontFamily="monospace">
          Press SPACE to descend
        </text>
      )}
      {onTrader && (
        <text x={VIEW_WIDTH / 2} y={VIEW_HEIGHT - 15} textAnchor="middle" fill="#44dd44" fontSize="14" fontFamily="monospace">
          A trader is here
        </text>
      )}
      <text x={VIEW_WIDTH / 2} y={20} textAnchor="middle" fill="#667" fontSize="12" fontFamily="monospace">
        Facing {facing === 'N' ? 'North' : facing === 'S' ? 'South' : facing === 'E' ? 'East' : 'West'}
      </text>
    </svg>
  );
}
