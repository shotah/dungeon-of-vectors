import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { DIRECTION_DELTAS } from '../../utils/direction';
import { VIEW_WIDTH, VIEW_HEIGHT, DEPTHS, EXTENDED_DEPTH, columnEdgeX, type DepthConfig } from '../svg/dungeon/dungeonConstants';
import WallGradients from '../svg/dungeon/WallGradients';
import { FrontWall } from '../svg/dungeon/WallPanels';
import { StairsDownSVG, StairsUpSVG, ChestWallSVG, TraderWallSVG, BossWallSVG, DoorWallSVG } from '../svg/dungeon/WallTypes';
import TorchSconce from '../svg/dungeon/TorchSconce';
import FloorAndCeiling from '../svg/dungeon/FloorAndCeiling';
import { getViewCells, buildWallInstructions, getPrompt } from './dungeonViewUtils';
import { getDungeonViewBackground } from '../../utils/floorGradient';

export default function DungeonView() {
  const dungeon = useGameStore(s => s.dungeon);
  const position = useGameStore(s => s.position);
  const facing = useGameStore(s => s.facing);
  const currentFloor = useGameStore(s => s.currentFloor);
  const stairsUpPosition = useGameStore(s => s.stairsUpPosition);
  const [copied, setCopied] = useState(false);
  const debugTextRef = useRef('');
  const handleCopyDebug = useCallback(() => {
    void navigator.clipboard.writeText(debugTextRef.current).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  useEffect(() => {
    if (!dungeon) {
      debugTextRef.current = '';
      return;
    }
    const typeGrid = dungeon.grid.map(row => row.map(cell => cell.type));
    const { forward, left, right, leftLeft, rightRight } = getViewCells(
      typeGrid, position.x, position.y, facing,
      dungeon.width, dungeon.height
    );
    const cellLabel = (c: string) => (c === 'wall' ? 'W' : c === 'floor' ? 'F' : c === 'door' ? 'D' : (c?.slice(0, 1) ?? '?').toUpperCase());
    const maxDepth = left.length - 1;
    const debugLines = Array.from({ length: maxDepth + 1 }, (_, d) => {
      const ll = cellLabel(leftLeft[d]);
      const l = cellLabel(left[d]);
      const f = d < forward.length ? cellLabel(forward[d]) : '?';
      const r = cellLabel(right[d]);
      const rr = cellLabel(rightRight[d]);
      return `d${d}: LL=${ll} L=${l} F=${f} R=${r} RR=${rr}`;
    });
    const fd = DIRECTION_DELTAS[facing];
    const rd = facing === 'N' ? { x: 1, y: 0 } : facing === 'E' ? { x: 0, y: 1 } : facing === 'S' ? { x: -1, y: 0 } : { x: 0, y: -1 };
    const rightCoords = (n: number) => Array.from({ length: n }, (_, i) => (i === 0 ? `(${position.x + rd.x},${position.y + rd.y})` : `(${position.x + fd.x * i + rd.x},${position.y + fd.y * i + rd.y})`)).join(' ');
    debugTextRef.current = [...debugLines, `R cells: ${rightCoords(6)}`].join('\n');
  }, [dungeon, position, facing]);

  if (!dungeon) return null;

  const isOnStairsUp = currentFloor > 1 && !!stairsUpPosition && position.x === stairsUpPosition.x && position.y === stairsUpPosition.y;

  const typeGrid = dungeon.grid.map(row => row.map(cell => cell.type));
  const { forward, left, right, leftLeft, rightRight } = getViewCells(
    typeGrid, position.x, position.y, facing,
    dungeon.width, dungeon.height
  );

  const instructions = buildWallInstructions(forward, left, right, leftLeft, rightRight);

  const wallElements: React.ReactElement[] = [];
  for (const inst of instructions) {
    switch (inst.type) {
      case 'column_side': {
        const edge = inst.edge!;
        const curr = DEPTHS[inst.depth];
        const next = inst.depth < DEPTHS.length - 1 ? DEPTHS[inst.depth + 1] : EXTENDED_DEPTH;
        if (curr && next) {
          const x1 = columnEdgeX(edge, curr.bottom);
          const x2 = columnEdgeX(edge, next.bottom);
          wallElements.push(
            <polygon
              key={`cs-${inst.depth}-${edge}`}
              points={`${x1},${curr.top} ${x2},${next.top} ${x2},${next.bottom} ${x1},${curr.bottom}`}
              fill="url(#sideWallGrad)"
              stroke="#222233"
              strokeWidth="1"
            />
          );
        }
        break;
      }
      case 'column_wall': {
        const col = inst.column!;
        const depthCfg = DEPTHS[inst.depth];
        if (depthCfg) {
          const colLeft = columnEdgeX(col, depthCfg.bottom);
          const colRight = columnEdgeX(col + 1, depthCfg.bottom);
          wallElements.push(
            <rect
              key={`cw-${inst.depth}-${col}`}
              x={colLeft}
              y={depthCfg.top}
              width={colRight - colLeft}
              height={depthCfg.bottom - depthCfg.top}
              fill="url(#wallGrad)"
              stroke="#222233"
              strokeWidth="1"
            />
          );
        }
        break;
      }
      case 'front':
        wallElements.push(<FrontWall key={`fw-${inst.depth}`} depth={inst.depth} cellType={inst.cellType!} />);
        break;
      case 'column_front': {
        const col = inst.column!;
        const depthCfg = DEPTHS[inst.depth];
        if (depthCfg) {
          const colLeft = columnEdgeX(col, depthCfg.bottom);
          const colRight = columnEdgeX(col + 1, depthCfg.bottom);
          const colD: DepthConfig = { left: colLeft, right: colRight, top: depthCfg.top, bottom: depthCfg.bottom };
          const nextDepthCfg = inst.depth < DEPTHS.length - 1 ? DEPTHS[inst.depth + 1] : EXTENDED_DEPTH;
          const nextColLeft = columnEdgeX(col, nextDepthCfg.bottom);
          const nextColRight = columnEdgeX(col + 1, nextDepthCfg.bottom);
          const colNext: DepthConfig = { left: nextColLeft, right: nextColRight, top: nextDepthCfg.top, bottom: nextDepthCfg.bottom };
          const k = `cf-${inst.depth}-${col}`;
          switch (inst.cellType) {
            case 'stairs_down': wallElements.push(<StairsDownSVG key={k} d={colD} next={colNext} />); break;
            case 'stairs_up': wallElements.push(<StairsUpSVG key={k} d={colD} next={colNext} />); break;
            case 'chest': wallElements.push(<ChestWallSVG key={k} d={colD} />); break;
            case 'trader': wallElements.push(<TraderWallSVG key={k} d={colD} />); break;
            case 'boss': wallElements.push(<BossWallSVG key={k} d={colD} />); break;
            case 'door': wallElements.push(<DoorWallSVG key={k} d={colD} />); break;
          }
        }
        break;
      }
      case 'torch': {
        const depthCfg = DEPTHS[inst.depth];
        const wallW = depthCfg.right - depthCfg.left;
        const wallH = depthCfg.bottom - depthCfg.top;
        wallElements.push(
          <TorchSconce
            key={`torch-${inst.depth}`}
            x={(depthCfg.left + depthCfg.right) / 2}
            y={depthCfg.top + wallH * 0.3}
            size={Math.max(4, wallW * 0.04)}
          />
        );
        break;
      }
    }
  }

  const currentCell = dungeon.grid[position.y]?.[position.x];
  const fd = DIRECTION_DELTAS[facing];
  const ax = position.x + fd.x, ay = position.y + fd.y;
  const facingType = (ax >= 0 && ax < dungeon.width && ay >= 0 && ay < dungeon.height)
    ? dungeon.grid[ay][ax].type : null;

  const prompt = getPrompt(currentCell?.type ?? null, facingType, isOnStairsUp);

  const cellLabel = (c: string) => (c === 'wall' ? 'W' : c === 'floor' ? 'F' : c === 'door' ? 'D' : (c?.slice(0, 1) ?? '?').toUpperCase());
  const maxDepth = left.length - 1;
  const debugLines = Array.from({ length: maxDepth + 1 }, (_, d) => {
    const ll = cellLabel(leftLeft[d]);
    const l = cellLabel(left[d]);
    const f = d < forward.length ? cellLabel(forward[d]) : '?';
    const r = cellLabel(right[d]);
    const rr = cellLabel(rightRight[d]);
    return `d${d}: LL=${ll} L=${l} F=${f} R=${r} RR=${rr}`;
  });
  const rd = facing === 'N' ? { x: 1, y: 0 } : facing === 'E' ? { x: 0, y: 1 } : facing === 'S' ? { x: -1, y: 0 } : { x: 0, y: -1 };
  const rightCoords = (n: number) => Array.from({ length: n }, (_, i) => (i === 0 ? `(${position.x + rd.x},${position.y + rd.y})` : `(${position.x + fd.x * i + rd.x},${position.y + fd.y * i + rd.y})`)).join(' ');

  return (
    <svg
      viewBox={`${VIEW_WIDTH * 0.05} 0 ${VIEW_WIDTH * 0.9} ${VIEW_HEIGHT}`}
      width="100%"
      height="100%"
      style={{ background: getDungeonViewBackground(currentFloor), borderRadius: 8, border: '2px solid #333' }}
    >
      <WallGradients floor={currentFloor} />
      <FloorAndCeiling floor={currentFloor} viewCells={{ forward, left, right, leftLeft, rightRight }} />
      {wallElements}
      {prompt && (
        <text x={VIEW_WIDTH / 2} y={VIEW_HEIGHT - 15} textAnchor="middle" fill={prompt.color} fontSize="14" fontFamily="monospace">
          {prompt.text}
        </text>
      )}
      <text x={VIEW_WIDTH / 2} y={20} textAnchor="middle" fill="#667" fontSize="12" fontFamily="monospace">
        Facing {facing === 'N' ? 'North' : facing === 'S' ? 'South' : facing === 'E' ? 'East' : 'West'}
      </text>
      {import.meta.env.DEV && (
        <g fontSize="10" fontFamily="monospace" fill="#446">
          {/* Copy button at top, then depth stack (d0 closest at bottom), then R cells at very bottom */}
          <foreignObject x={8} y={VIEW_HEIGHT - 8 - (maxDepth + 3) * 12} width={80} height={24}>
            <button
              type="button"
              onClick={handleCopyDebug}
              style={{
                fontSize: 10, fontFamily: 'monospace', padding: '2px 6px',
                background: copied ? '#2a4' : '#334', color: '#ccc', border: '1px solid #556', borderRadius: 4,
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </foreignObject>
          {/* Vertical: d0 (closest) at bottom, d_max (furthest) at top; stacked above R cells */}
          {debugLines.map((line, d) => (
            <text key={d} x={8} y={VIEW_HEIGHT - 8 - (d + 1) * 12}>{line}</text>
          ))}
          <text x={8} y={VIEW_HEIGHT - 8}>R cells: {rightCoords(6)}</text>
        </g>
      )}
    </svg>
  );
}
