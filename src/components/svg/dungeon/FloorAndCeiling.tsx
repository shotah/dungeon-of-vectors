import { DEPTHS, EXTENDED_DEPTH, VIEW_WIDTH, VIEW_HEIGHT } from './dungeonConstants';
import { darkenHex, floorDarkenAmount, floorRedShift } from '../../../utils/floorGradient';

const COLS = 8;

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
      const startX = (c * VIEW_WIDTH) / COLS;
      row.push({ x: startX + (vanishX - startX) * t, y });
    }
    grid.push(row);
  }
  return grid;
}

type FloorAndCeilingProps = { floor?: number };

export default function FloorAndCeiling({ floor = 1 }: FloorAndCeilingProps) {
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
          const tl = row[c], tr = row[c + 1];
          const bl = nextRow[c], br = nextRow[c + 1];
          const dark = (d + c) % 2 === 0;
          return (
            <polygon
              key={`ft-${d}-${c}`}
              points={`${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`}
              fill={dark ? tileDark : tileLight}
              stroke={strokeColor}
              strokeWidth={d < 3 ? 0.8 : 0.4}
              opacity={opacity}
            />
          );
        });
      })}

      {[1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={`cv-${i}`}
          x1={(i * VIEW_WIDTH) / 8} y1={0}
          x2={vanishX} y2={vanishY}
          stroke={lineColor} strokeWidth="0.5" opacity="0.2"
        />
      ))}
      {DEPTHS.slice(1).map((d, i) => (
        <line key={`ch-${i}`}
          x1={d.left} y1={d.top} x2={d.right} y2={d.top}
          stroke={lineColor} strokeWidth="0.5"
          opacity={Math.max(0.08, 0.25 - i * 0.04)}
        />
      ))}
    </g>
  );
}
