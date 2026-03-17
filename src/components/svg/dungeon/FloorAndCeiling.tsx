import { DEPTHS, EXTENDED_DEPTH, VIEW_WIDTH, VIEW_HEIGHT, TOTAL_COLS } from './dungeonConstants';
import { darkenHex, floorDarkenAmount, floorRedShift } from '../../../utils/floorGradient';
import type { CellType } from '../../../types';

const COLS = TOTAL_COLS;
const INNER_COLS = 5;

function buildFloorGrid() {
  const vanishX = VIEW_WIDTH / 2;
  const vanishY = VIEW_HEIGHT / 2;
  const depthBottoms = [...DEPTHS.map(d => d.bottom), EXTENDED_DEPTH.bottom];

  const grid: { x: number; y: number }[][] = [];
  for (let d = 0; d < depthBottoms.length; d++) {
    const y = depthBottoms[d];
    const t = (y - VIEW_HEIGHT) / (vanishY - VIEW_HEIGHT);
    const row: { x: number; y: number }[] = [];
    for (let c = 0; c <= COLS; c++) {
      const startX = ((c - 1) / INNER_COLS) * VIEW_WIDTH;
      row.push({ x: startX + (vanishX - startX) * t, y });
    }
    grid.push(row);
  }
  return grid;
}

type ViewCells = {
  forward: CellType[];
  left: CellType[];
  right: CellType[];
  leftLeft: CellType[];
  rightRight: CellType[];
  leftLeftLeft: CellType[];
  rightRightRight: CellType[];
};

type FloorAndCeilingProps = { floor?: number; viewCells?: ViewCells };

function getCellForTile(d: number, c: number, viewCells?: ViewCells): CellType {
  if (!viewCells) return 'floor';
  switch (c) {
    case 0: return viewCells.leftLeftLeft[d] ?? 'wall';
    case 1: return viewCells.leftLeft[d] ?? 'wall';
    case 2: return viewCells.left[d] ?? 'wall';
    case 3: return d === 0 ? 'floor' : (viewCells.forward[d - 1] ?? 'wall');
    case 4: return viewCells.right[d] ?? 'wall';
    case 5: return viewCells.rightRight[d] ?? 'wall';
    case 6: return viewCells.rightRightRight[d] ?? 'wall';
    default: return 'wall';
  }
}

export default function FloorAndCeiling({ floor = 1, viewCells }: FloorAndCeilingProps) {
  const vanishX = VIEW_WIDTH / 2;
  const vanishY = VIEW_HEIGHT / 2;
  const t = floorDarkenAmount(floor);
  const rs = floorRedShift(floor);
  const tileDark = darkenHex('#171730', t, rs);
  const tileLight = darkenHex('#1e1e3a', t, rs);
  const strokeColor = darkenHex('#2e2e48', t, rs);
  const lineColor = darkenHex('#15152a', t, rs);

  const floorGrid = buildFloorGrid();

  return (
    <g>
      <rect x={0} y={0} width={VIEW_WIDTH} height={vanishY} fill="url(#ceilGrad)" />
      <rect x={0} y={vanishY} width={VIEW_WIDTH} height={vanishY} fill="url(#floorGrad)" />

      {floorGrid.map((row, d) => {
        if (d >= floorGrid.length - 1) return null;
        const nextRow = floorGrid[d + 1];
        const opacity = Math.max(0.15, 0.55 - d * 0.06);
        return Array.from({ length: COLS }, (_, c) => {
          const cell = getCellForTile(d, c, viewCells);
          if (cell === 'wall') return null;

          const tl = row[c], tr = row[c + 1];
          const bl = nextRow[c], br = nextRow[c + 1];
          const dark = (d + c) % 2 === 0;
          const cx = (tl.x + tr.x + br.x + bl.x) / 4;
          const cy = (tl.y + tr.y + br.y + bl.y) / 4;
          return (
            <g key={`ft-${d}-${c}`}>
              <polygon
                points={`${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`}
                fill={dark ? tileDark : tileLight}
                stroke={strokeColor}
                strokeWidth={d < 3 ? 0.8 : 0.4}
                opacity={opacity}
              />
              {import.meta.env.DEV && (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={d < 4 ? 10 : 8}
                  fill="#446"
                  fontFamily="monospace"
                  opacity={0.9}
                >
                  {d}
                </text>
              )}
            </g>
          );
        });
      })}

      {Array.from({ length: COLS - 1 }, (_, i) => i + 1).map(i => (
        <line key={`cv-${i}`}
          x1={((i - 1) / INNER_COLS) * VIEW_WIDTH} y1={0}
          x2={vanishX} y2={vanishY}
          stroke={lineColor} strokeWidth="0.5" opacity="0.2"
        />
      ))}
      {DEPTHS.slice(1).map((d, i) => {
        const tileW = d.right - d.left;
        const fullLeft = Math.max(0, d.left - 2 * tileW);
        const fullRight = Math.min(VIEW_WIDTH, d.right + 2 * tileW);
        return (
          <line key={`ch-${i}`}
            x1={fullLeft} y1={d.top} x2={fullRight} y2={d.top}
            stroke={lineColor} strokeWidth="0.5"
            opacity={Math.max(0.08, 0.25 - i * 0.04)}
          />
        );
      })}
    </g>
  );
}
