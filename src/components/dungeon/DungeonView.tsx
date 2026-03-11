import React, { useState, useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { DIRECTION_DELTAS } from '../../utils/direction';
import { VIEW_WIDTH, VIEW_HEIGHT, DEPTHS } from '../svg/dungeon/dungeonConstants';
import WallGradients from '../svg/dungeon/WallGradients';
import { SideWall, FrontWall } from '../svg/dungeon/WallPanels';
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

  if (!dungeon) return null;

  const isOnStairsUp = currentFloor > 1 && !!stairsUpPosition && position.x === stairsUpPosition.x && position.y === stairsUpPosition.y;

  const typeGrid = dungeon.grid.map(row => row.map(cell => cell.type));
  const { forward, left, right, leftLeft, rightRight } = getViewCells(
    typeGrid, position.x, position.y, facing,
    dungeon.width, dungeon.height
  );

  const instructions = buildWallInstructions(forward, left, right);

  const wallElements: React.ReactElement[] = [];
  for (const inst of instructions) {
    switch (inst.type) {
      case 'left':
        wallElements.push(<SideWall key={`lw-${inst.depth}`} depth={inst.depth} side="left" />);
        break;
      case 'right':
        wallElements.push(<SideWall key={`rw-${inst.depth}`} depth={inst.depth} side="right" />);
        break;
      case 'left_cross':
        wallElements.push(<FrontWall key={`lcw-${inst.depth}`} depth={inst.depth} side="left" />);
        break;
      case 'right_cross':
        wallElements.push(<FrontWall key={`rcw-${inst.depth}`} depth={inst.depth} side="right" />);
        break;
      case 'front':
        wallElements.push(<FrontWall key={`fw-${inst.depth}`} depth={inst.depth} cellType={inst.cellType!} />);
        break;
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
  const debugTextToCopy = [...debugLines, `R cells: ${rightCoords(6)}`].join('\n');
  const [copied, setCopied] = useState(false);
  const handleCopyDebug = useCallback(() => {
    void navigator.clipboard.writeText(debugTextToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [debugTextToCopy]);

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      width="100%"
      height="100%"
      style={{ background: getDungeonViewBackground(currentFloor), borderRadius: 8, border: '2px solid #333' }}
    >
      <WallGradients floor={currentFloor} />
      <FloorAndCeiling floor={currentFloor} />
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
