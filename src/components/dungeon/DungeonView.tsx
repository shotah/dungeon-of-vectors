import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { DIRECTION_DELTAS } from '../../utils/direction';
import { VIEW_WIDTH, VIEW_HEIGHT, DEPTHS } from '../svg/dungeon/dungeonConstants';
import WallGradients from '../svg/dungeon/WallGradients';
import { SideWall, FrontWall } from '../svg/dungeon/WallPanels';
import TorchSconce from '../svg/dungeon/TorchSconce';
import FloorAndCeiling from '../svg/dungeon/FloorAndCeiling';
import { getViewCells, buildWallInstructions, getPrompt } from './dungeonViewUtils';

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

  const prompt = getPrompt(currentCell?.type ?? null, facingType);

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
      {prompt && (
        <text x={VIEW_WIDTH / 2} y={VIEW_HEIGHT - 15} textAnchor="middle" fill={prompt.color} fontSize="14" fontFamily="monospace">
          {prompt.text}
        </text>
      )}
      <text x={VIEW_WIDTH / 2} y={20} textAnchor="middle" fill="#667" fontSize="12" fontFamily="monospace">
        Facing {facing === 'N' ? 'North' : facing === 'S' ? 'South' : facing === 'E' ? 'East' : 'West'}
      </text>
    </svg>
  );
}
