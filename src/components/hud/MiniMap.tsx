import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { DungeonFloor } from '../../types';

const CELL_SIZE = 6;

function FloorProgress({ dungeon, explored }: { dungeon: DungeonFloor; explored: boolean[][] }) {
  const ic = dungeon.initialCounts;

  let chestsRemaining = 0;
  let foundStairs = false;
  let foundTrader = false;
  let foundBoss = false;

  for (let y = 0; y < dungeon.height; y++) {
    for (let x = 0; x < dungeon.width; x++) {
      const t = dungeon.grid[y][x].type;
      if (t === 'chest') chestsRemaining++;
      if (explored[y]?.[x]) {
        if (t === 'stairs_down') foundStairs = true;
        if (t === 'trader') foundTrader = true;
        if (t === 'boss') foundBoss = true;
      }
    }
  }

  const chestsOpened = ic.chests - chestsRemaining;

  const items: { label: string; value: string; color: string }[] = [];

  if (ic.chests > 0) {
    const allFound = chestsOpened === ic.chests;
    items.push({ label: 'Chests', value: `${chestsOpened}/${ic.chests}`, color: allFound ? '#44aa44' : '#daa520' });
  }
  if (ic.traders > 0) {
    items.push({ label: 'Trader', value: foundTrader ? 'Found' : '???', color: foundTrader ? '#44dd44' : '#666' });
  }
  if (ic.stairs > 0) {
    items.push({ label: 'Stairs', value: foundStairs ? 'Found' : '???', color: foundStairs ? '#44aaff' : '#666' });
  }
  if (ic.boss > 0) {
    items.push({ label: 'Boss', value: foundBoss ? 'Found' : '???', color: foundBoss ? '#ff3333' : '#666' });
  }

  if (items.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 8px', fontSize: 10, fontFamily: 'monospace' }}>
      {items.map(i => (
        <span key={i.label} style={{ color: i.color }}>
          {i.label}: {i.value}
        </span>
      ))}
    </div>
  );
}

export default function MiniMap({ mobile = false }: { mobile?: boolean } = {}) {
  const MAP_SIZE = mobile ? 160 : 160;
  const dungeon = useGameStore(s => s.dungeon);
  const position = useGameStore(s => s.position);
  const facing = useGameStore(s => s.facing);
  const exploredMaps = useGameStore(s => s.exploredMaps);
  const currentFloor = useGameStore(s => s.currentFloor);

  if (!dungeon) return null;

  const explored = exploredMaps[currentFloor];
  if (!explored) return null;

  const offsetX = Math.max(0, position.x * CELL_SIZE - MAP_SIZE / 2);
  const offsetY = Math.max(0, position.y * CELL_SIZE - MAP_SIZE / 2);

  const cells: React.ReactElement[] = [];
  for (let y = 0; y < dungeon.height; y++) {
    for (let x = 0; x < dungeon.width; x++) {
      if (!explored[y]?.[x]) continue;
      const cell = dungeon.grid[y][x];
      let color = '#333';
      if (cell.type === 'floor' || cell.type === 'start') color = '#445';
      else if (cell.type === 'wall') color = '#667';
      else if (cell.type === 'door') color = '#8B4513';
      else if (cell.type === 'stairs_down') color = '#44aaff';
      else if (cell.type === 'chest') color = '#daa520';
      else if (cell.type === 'trader') color = '#44dd44';
      else if (cell.type === 'boss') color = '#ff3333';

      cells.push(
        <rect
          key={`${x}-${y}`}
          x={x * CELL_SIZE}
          y={y * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={color}
        />
      );
    }
  }

  const arrowRotation = facing === 'N' ? 0 : facing === 'E' ? 90 : facing === 'S' ? 180 : 270;

  return (
    <div>
      <div style={{
        width: MAP_SIZE, height: MAP_SIZE, overflow: 'hidden',
        border: '2px solid #3a3a5a', borderRadius: 4, background: '#0a0a15',
      }}>
        <svg
          width={dungeon.width * CELL_SIZE}
          height={dungeon.height * CELL_SIZE}
          viewBox={`${offsetX} ${offsetY} ${MAP_SIZE} ${MAP_SIZE}`}
        >
          {cells}
          <g transform={`translate(${position.x * CELL_SIZE + CELL_SIZE / 2}, ${position.y * CELL_SIZE + CELL_SIZE / 2}) rotate(${arrowRotation})`}>
            <polygon points="0,-3 2,2 -2,2" fill="#ff4444" stroke="#cc2222" strokeWidth="0.5" />
          </g>
        </svg>
      </div>
      <div style={{ marginTop: 4 }}>
        <FloorProgress dungeon={dungeon} explored={explored} />
      </div>
    </div>
  );
}
