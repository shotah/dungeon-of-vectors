import type { CellType } from '../../../types';
import { DEPTHS, EXTENDED_DEPTH, VIEW_WIDTH, VIEW_HEIGHT } from './dungeonConstants';

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
    const next = depth < DEPTHS.length - 1 ? DEPTHS[depth + 1] : EXTENDED_DEPTH;
    const vanishX = VIEW_WIDTH / 2;
    const vanishY = VIEW_HEIGHT / 2;

    const nearY = d.bottom;
    const farY = next.bottom;
    const tNear = (nearY - VIEW_HEIGHT) / (vanishY - VIEW_HEIGHT);
    const tFar = (farY - VIEW_HEIGHT) / (vanishY - VIEW_HEIGHT);

    const inset = 0.2;
    const nearL = d.left + (d.right - d.left) * inset;
    const nearR = d.right - (d.right - d.left) * inset;
    const floorNearL = nearL + (vanishX - nearL) * tNear;
    const floorNearR = nearR + (vanishX - nearR) * tNear;
    const floorFarL = nearL + (vanishX - nearL) * tFar;
    const floorFarR = nearR + (vanishX - nearR) * tFar;

    const holeW = floorNearR - floorNearL;
    const holeSpan = Math.abs(farY - nearY);
    const stepCount = 4;
    const dir = farY < nearY ? -1 : 1;

    return (
      <g>
        {/* Dark hole cut into the floor */}
        <polygon
          points={`${floorNearL},${nearY} ${floorNearR},${nearY} ${floorFarR},${farY} ${floorFarL},${farY}`}
          fill="#010108"
        />

        {/* Stone rim around the hole */}
        <polygon
          points={`${floorNearL},${nearY} ${floorNearR},${nearY} ${floorFarR},${farY} ${floorFarL},${farY}`}
          fill="none" stroke="#4a4a6a" strokeWidth="1.5"
        />

        {/* Steps: treads with visible risers for 3D depth */}
        {Array.from({ length: stepCount }, (_, i) => {
          const t = (i + 1) / (stepCount + 1);
          const stepY = nearY + dir * t * holeSpan * 0.8;
          const insetPct = t * 0.25;
          const sL = floorNearL + holeW * insetPct;
          const sR = floorNearR - holeW * insetPct;
          const treadH = holeSpan * 0.04;
          const riserH = holeSpan * 0.03;
          const shade = Math.max(35, 80 - i * 15);
          const rY = dir > 0 ? stepY : stepY - treadH;
          const riY = dir > 0 ? stepY - riserH : stepY + treadH;
          return (
            <g key={i}>
              {/* Riser (vertical front face) */}
              <rect
                x={sL} y={riY}
                width={sR - sL} height={riserH}
                fill={`rgb(${shade - 20},${shade - 20},${shade - 5})`}
              />
              {/* Tread (horizontal top face) */}
              <rect
                x={sL} y={rY}
                width={sR - sL} height={treadH}
                fill={`rgb(${shade},${shade},${shade + 25})`}
                stroke="#555577"
                strokeWidth="0.5"
              />
            </g>
          );
        })}
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
        <path
          d={`M${tx + tw * 0.15},${ty + th * 0.3} Q${tx + tw * 0.5},${ty + th * 0.25} ${tx + tw * 0.85},${ty + th * 0.3} L${tx + tw * 0.9},${ty + th} L${tx + tw * 0.1},${ty + th} Z`}
          fill="#6a4e23" stroke="#4a3413" strokeWidth="1"
        />
        <path
          d={`M${headCx - headR * 1.5},${headCy + headR * 0.5} Q${headCx - headR * 1.8},${headCy - headR * 1.2} ${headCx},${headCy - headR * 1.8} Q${headCx + headR * 1.8},${headCy - headR * 1.2} ${headCx + headR * 1.5},${headCy + headR * 0.5}`}
          fill="#5a3e13" stroke="#4a3413" strokeWidth="0.8"
        />
        <circle cx={headCx} cy={headCy} r={headR * 0.8} fill="#c4956a" />
        <circle cx={headCx - headR * 0.3} cy={headCy - headR * 0.1} r={headR * 0.12} fill="#333" />
        <circle cx={headCx + headR * 0.3} cy={headCy - headR * 0.1} r={headR * 0.12} fill="#333" />
        <path
          d={`M${headCx - headR * 0.25},${headCy + headR * 0.25} Q${headCx},${headCy + headR * 0.45} ${headCx + headR * 0.25},${headCy + headR * 0.25}`}
          fill="none" stroke="#8a6a4a" strokeWidth="0.5"
        />
        <rect x={tx + tw * 0.65} y={ty + th * 0.35} width={tw * 0.25} height={th * 0.35} rx={2} fill="#8B6914" stroke="#5C4A0A" strokeWidth="0.8" />
        <circle cx={tx + tw * 0.3} cy={ty + th * 0.7} r={tw * 0.08} fill="#daa520" stroke="#b8860b" strokeWidth="0.5" />
      </g>
    );
  }

  if (cellType === 'boss') {
    const bw = (d.right - d.left) * 0.4;
    const bh = (d.bottom - d.top) * 0.75;
    const bx = (d.left + d.right) / 2 - bw / 2;
    const by = d.bottom - bh;
    const headR = bw * 0.2;
    const cx = bx + bw / 2;
    const cy = by + headR * 1.5;
    return (
      <g>
        {/* Aura glow */}
        <circle cx={cx} cy={by + bh * 0.4} r={bw * 0.7} fill="#ff0000" opacity="0.08">
          <animate attributeName="opacity" values="0.08;0.15;0.08" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Robe */}
        <path
          d={`M${bx + bw * 0.15},${cy + headR} L${bx + bw * 0.05},${by + bh} L${bx + bw * 0.95},${by + bh} L${bx + bw * 0.85},${cy + headR} Z`}
          fill="#2a0a0a" stroke="#550000" strokeWidth="1"
        />
        {/* Pointed hat */}
        <path
          d={`M${cx - bw * 0.25},${cy - headR * 0.5} L${cx},${by} L${cx + bw * 0.25},${cy - headR * 0.5}`}
          fill="#2a0a0a" stroke="#550000" strokeWidth="1"
        />
        {/* Face */}
        <circle cx={cx} cy={cy} r={headR * 0.8} fill="#c4956a" />
        {/* Glowing red eyes */}
        <circle cx={cx - headR * 0.3} cy={cy - headR * 0.1} r={headR * 0.15} fill="#ff0000">
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx + headR * 0.3} cy={cy - headR * 0.1} r={headR * 0.15} fill="#ff0000">
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>
        {/* Staff */}
        <line x1={bx + bw * 0.15} y1={by + bh * 0.1} x2={bx + bw * 0.15} y2={by + bh} stroke="#3a2a1a" strokeWidth={Math.max(1, bw * 0.04)} />
        <circle cx={bx + bw * 0.15} cy={by + bh * 0.08} r={headR * 0.5} fill="#ff3300" opacity="0.7">
          <animate attributeName="r" values={`${headR * 0.5};${headR * 0.65};${headR * 0.5}`} dur="1.5s" repeatCount="indefinite" />
        </circle>
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
