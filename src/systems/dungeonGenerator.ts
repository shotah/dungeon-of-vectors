import type { DungeonCell, DungeonFloor, Position, CellType } from '../types';
import { SeededRandom } from '../utils/random';

interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
}

function createEmptyGrid(width: number, height: number): DungeonCell[][] {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, (): DungeonCell => ({
      type: 'wall',
      explored: false,
      hasEncounter: false,
    }))
  );
}

function isInBounds(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < width && y >= 0 && y < height;
}

function isInterior(x: number, y: number, width: number, height: number): boolean {
  return x >= 1 && x < width - 1 && y >= 1 && y < height - 1;
}

function carveCell(grid: DungeonCell[][], x: number, y: number, type: CellType = 'floor') {
  grid[y][x] = { type, explored: false, hasEncounter: false };
}

function carveRoom(grid: DungeonCell[][], room: Room) {
  for (let dy = 0; dy < room.h; dy++) {
    for (let dx = 0; dx < room.w; dx++) {
      carveCell(grid, room.x + dx, room.y + dy);
    }
  }
}

function roomsOverlap(a: Room, b: Room, padding = 1): boolean {
  return (
    a.x - padding < b.x + b.w &&
    a.x + a.w + padding > b.x &&
    a.y - padding < b.y + b.h &&
    a.y + a.h + padding > b.y
  );
}

function carveCorridor(grid: DungeonCell[][], from: Position, to: Position, rng: SeededRandom) {
  let { x, y } = from;
  const w = grid[0].length;
  const h = grid.length;
  const goHorizontalFirst = rng.nextBool();

  if (goHorizontalFirst) {
    while (x !== to.x) {
      x += x < to.x ? 1 : -1;
      if (isInterior(x, y, w, h)) carveCell(grid, x, y);
    }
    while (y !== to.y) {
      y += y < to.y ? 1 : -1;
      if (isInterior(x, y, w, h)) carveCell(grid, x, y);
    }
  } else {
    while (y !== to.y) {
      y += y < to.y ? 1 : -1;
      if (isInterior(x, y, w, h)) carveCell(grid, x, y);
    }
    while (x !== to.x) {
      x += x < to.x ? 1 : -1;
      if (isInterior(x, y, w, h)) carveCell(grid, x, y);
    }
  }
}

function roomCenter(room: Room): Position {
  return {
    x: Math.floor(room.x + room.w / 2),
    y: Math.floor(room.y + room.h / 2),
  };
}

function addMazePaths(grid: DungeonCell[][], rng: SeededRandom) {
  const width = grid[0].length;
  const height = grid.length;

  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      if (grid[y][x].type !== 'wall') continue;

      const stack: Position[] = [{ x, y }];
      carveCell(grid, x, y);

      while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors: Position[] = [];
        const dirs = [
          { x: 0, y: -2 }, { x: 0, y: 2 },
          { x: -2, y: 0 }, { x: 2, y: 0 },
        ];

        for (const d of dirs) {
          const nx = current.x + d.x;
          const ny = current.y + d.y;
          if (isInterior(nx, ny, width, height) && grid[ny][nx].type === 'wall') {
            neighbors.push({ x: nx, y: ny });
          }
        }

        if (neighbors.length > 0) {
          const next = rng.pick(neighbors);
          const wallX = current.x + (next.x - current.x) / 2;
          const wallY = current.y + (next.y - current.y) / 2;
          carveCell(grid, wallX, wallY);
          carveCell(grid, next.x, next.y);
          stack.push(next);
        } else {
          stack.pop();
        }
      }
    }
  }
}

function placeEncounters(grid: DungeonCell[][], rng: SeededRandom, encounterRate: number) {
  const width = grid[0].length;
  const height = grid.length;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x].type === 'floor' && rng.nextBool(encounterRate)) {
        grid[y][x].hasEncounter = true;
      }
    }
  }
}

export function generateDungeon(seed: number, floor: number, maxFloor?: number): DungeonFloor {
  const rng = new SeededRandom(seed + floor * 7919);
  const baseSize = 20;
  const width = baseSize + floor * 4;
  const height = baseSize + floor * 4;
  const numRooms = 5 + floor * 2;

  const grid = createEmptyGrid(width, height);
  const rooms: Room[] = [];

  // Place rooms
  for (let attempt = 0; attempt < numRooms * 10 && rooms.length < numRooms; attempt++) {
    const w = rng.nextInt(3, 7);
    const h = rng.nextInt(3, 7);
    const x = rng.nextInt(2, width - w - 2);
    const y = rng.nextInt(2, height - h - 2);
    const room: Room = { x, y, w, h };

    if (!rooms.some(r => roomsOverlap(r, room))) {
      rooms.push(room);
      carveRoom(grid, room);
    }
  }

  // Connect rooms with corridors
  for (let i = 1; i < rooms.length; i++) {
    carveCorridor(grid, roomCenter(rooms[i - 1]), roomCenter(rooms[i]), rng);
  }
  // Extra connections for loops
  for (let i = 0; i < Math.floor(rooms.length / 3); i++) {
    const a = rng.nextInt(0, rooms.length - 1);
    const b = rng.nextInt(0, rooms.length - 1);
    if (a !== b) {
      carveCorridor(grid, roomCenter(rooms[a]), roomCenter(rooms[b]), rng);
    }
  }

  // Fill remaining walls with maze passages
  addMazePaths(grid, rng);

  // Place start in first room
  const startPos = roomCenter(rooms[0]);
  grid[startPos.y][startPos.x].type = 'start';

  // Place stairs down (or boss on final floor) in last room
  const stairsPos = roomCenter(rooms[rooms.length - 1]);
  const isFinalFloor = maxFloor != null && floor >= maxFloor;
  grid[stairsPos.y][stairsPos.x].type = isFinalFloor ? 'boss' : 'stairs_down';

  // Place doors only in proper doorways (floor tile flanked by walls on two opposite sides)
  for (const room of rooms) {
    const doorCandidates = [
      ...Array.from({ length: room.w }, (_, i) => [{ x: room.x + i, y: room.y - 1 }, { x: room.x + i, y: room.y + room.h }]).flat(),
      ...Array.from({ length: room.h }, (_, i) => [{ x: room.x - 1, y: room.y + i }, { x: room.x + room.w, y: room.y + i }]).flat(),
    ];
    for (const pos of doorCandidates) {
      if (!isInBounds(pos.x, pos.y, width, height)) continue;
      if (grid[pos.y][pos.x].type !== 'floor') continue;

      const wallN = !isInBounds(pos.x, pos.y - 1, width, height) || grid[pos.y - 1][pos.x].type === 'wall';
      const wallS = !isInBounds(pos.x, pos.y + 1, width, height) || grid[pos.y + 1][pos.x].type === 'wall';
      const wallE = !isInBounds(pos.x + 1, pos.y, width, height) || grid[pos.y][pos.x + 1].type === 'wall';
      const wallW = !isInBounds(pos.x - 1, pos.y, width, height) || grid[pos.y][pos.x - 1].type === 'wall';

      const isBetweenWalls = (wallN && wallS) || (wallE && wallW);
      if (!isBetweenWalls) continue;

      if (rng.nextBool(0.35)) {
        grid[pos.y][pos.x].type = 'door';
        if (rng.nextBool(0.15)) {
          grid[pos.y][pos.x].locked = true;
        }
      }
    }
  }

  // Place treasure chests in random rooms (not first or last)
  for (let i = 1; i < rooms.length - 1; i++) {
    if (rng.nextBool(0.4)) {
      const center = roomCenter(rooms[i]);
      grid[center.y][center.x].type = 'chest';
    }
  }

  // Place a wandering trader in a random middle room
  const traderCandidates = rooms.slice(1, -1).filter(r => {
    const c = roomCenter(r);
    return grid[c.y][c.x].type === 'floor';
  });
  if (traderCandidates.length > 0) {
    const traderRoom = rng.pick(traderCandidates);
    const tc = roomCenter(traderRoom);
    grid[tc.y][tc.x].type = 'trader';
  }

  // Place random encounters
  placeEncounters(grid, rng, 0.08 + floor * 0.02);

  // Enforce solid wall border around the entire map edge
  for (let x = 0; x < width; x++) {
    grid[0][x] = { type: 'wall', explored: false, hasEncounter: false };
    grid[height - 1][x] = { type: 'wall', explored: false, hasEncounter: false };
  }
  for (let y = 0; y < height; y++) {
    grid[y][0] = { type: 'wall', explored: false, hasEncounter: false };
    grid[y][width - 1] = { type: 'wall', explored: false, hasEncounter: false };
  }

  let chests = 0, traders = 0, stairs = 0, boss = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const t = grid[y][x].type;
      if (t === 'chest') chests++;
      else if (t === 'trader') traders++;
      else if (t === 'stairs_down') stairs++;
      else if (t === 'boss') boss++;
    }
  }

  return { width, height, grid, floor, seed, initialCounts: { chests, traders, stairs, boss } };
}

export function getStartPosition(dungeon: DungeonFloor): Position {
  for (let y = 0; y < dungeon.height; y++) {
    for (let x = 0; x < dungeon.width; x++) {
      if (dungeon.grid[y][x].type === 'start') {
        return { x, y };
      }
    }
  }
  return { x: 1, y: 1 };
}
