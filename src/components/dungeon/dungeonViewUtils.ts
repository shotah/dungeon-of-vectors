import type { Direction, CellType } from '../../types';
import { DIRECTION_DELTAS } from '../../utils/direction';
import { DEPTHS } from '../svg/dungeon/dungeonConstants';

export function getCellAt(grid: CellType[][], x: number, y: number, width: number, height: number): CellType {
  if (x < 0 || x >= width || y < 0 || y >= height) return 'wall';
  return grid[y][x];
}

export function isBlockingSide(cell: CellType): boolean {
  return cell === 'wall' || cell === 'door';
}

export function getViewCells(
  grid: CellType[][],
  px: number, py: number,
  facing: Direction,
  width: number, height: number
): { forward: CellType[]; left: CellType[]; right: CellType[]; leftLeft: CellType[]; rightRight: CellType[] } {
  const fd = DIRECTION_DELTAS[facing];
  const ld = facing === 'N' ? DIRECTION_DELTAS['W'] : facing === 'W' ? DIRECTION_DELTAS['S'] : facing === 'S' ? DIRECTION_DELTAS['E'] : DIRECTION_DELTAS['N'];
  const rd = { x: -ld.x, y: -ld.y };

  const forward: CellType[] = [];
  const left: CellType[] = [];
  const right: CellType[] = [];
  const leftLeft: CellType[] = [];
  const rightRight: CellType[] = [];

  left.push(getCellAt(grid, px + ld.x, py + ld.y, width, height));
  right.push(getCellAt(grid, px + rd.x, py + rd.y, width, height));
  leftLeft.push(getCellAt(grid, px + 2 * ld.x, py + 2 * ld.y, width, height));
  rightRight.push(getCellAt(grid, px + 2 * rd.x, py + 2 * rd.y, width, height));

  const viewDepth = DEPTHS.length - 1;
  for (let d = 1; d <= viewDepth; d++) {
    const fx = px + fd.x * d;
    const fy = py + fd.y * d;
    forward.push(getCellAt(grid, fx, fy, width, height));
    left.push(getCellAt(grid, fx + ld.x, fy + ld.y, width, height));
    right.push(getCellAt(grid, fx + rd.x, fy + rd.y, width, height));
    leftLeft.push(getCellAt(grid, fx + 2 * ld.x, fy + 2 * ld.y, width, height));
    rightRight.push(getCellAt(grid, fx + 2 * rd.x, fy + 2 * rd.y, width, height));
  }

  return { forward, left, right, leftLeft, rightRight };
}

export interface WallInstruction {
  type: 'front' | 'torch' | 'column_wall' | 'column_side';
  depth: number;
  cellType?: CellType;
  column?: number;
  edge?: number;
}

export function buildWallInstructions(
  forward: CellType[],
  left: CellType[],
  right: CellType[],
  leftLeft?: CellType[],
  rightRight?: CellType[]
): WallInstruction[] {
  const instructions: WallInstruction[] = [];

  let nearestBlocker = -1;
  for (let d = 0; d < forward.length; d++) {
    if (forward[d] === 'wall' || forward[d] === 'door') {
      nearestBlocker = d;
      break;
    }
  }

  const maxDepth = forward.length - 1;
  for (let d = maxDepth; d >= 0; d--) {
    const sideEdges = new Set<number>();
    const columnWalls: number[] = [];

    if (leftLeft && d < leftLeft.length && isBlockingSide(leftLeft[d])) {
      columnWalls.push(0);
      sideEdges.add(0);
      sideEdges.add(1);
    }
    if (d < left.length && isBlockingSide(left[d])) {
      columnWalls.push(1);
      sideEdges.add(1);
      sideEdges.add(2);
    }
    if (d < right.length && isBlockingSide(right[d])) {
      columnWalls.push(3);
      sideEdges.add(3);
      sideEdges.add(4);
    }
    if (rightRight && d < rightRight.length && isBlockingSide(rightRight[d])) {
      columnWalls.push(4);
      sideEdges.add(4);
      sideEdges.add(5);
    }

    // Side strips first (render behind column walls)
    for (const edge of sideEdges) {
      instructions.push({ type: 'column_side', depth: d, edge });
    }
    // Column walls on top of side strips
    for (const col of columnWalls) {
      instructions.push({ type: 'column_wall', depth: d, column: col });
    }

    if (nearestBlocker >= 0 && d > nearestBlocker) continue;

    const fwdCell = forward[d];

    if (fwdCell === 'wall') {
      instructions.push({ type: 'front', depth: d, cellType: 'wall' });
      if (d < DEPTHS.length) {
        const depthCfg = DEPTHS[d];
        const wallW = depthCfg.right - depthCfg.left;
        if (wallW > 60) {
          instructions.push({ type: 'torch', depth: d });
        }
      }
      continue;
    }

    if (fwdCell === 'door') {
      instructions.push({ type: 'front', depth: d, cellType: 'door' });
      continue;
    }

    if (fwdCell === 'stairs_down') {
      instructions.push({ type: 'front', depth: d, cellType: 'stairs_down' });
    }
    if (fwdCell === 'stairs_up') {
      instructions.push({ type: 'front', depth: d, cellType: 'stairs_up' });
    }
    if (fwdCell === 'chest') {
      instructions.push({ type: 'front', depth: d, cellType: 'chest' });
    }
    if (fwdCell === 'trader') {
      instructions.push({ type: 'front', depth: d, cellType: 'trader' });
    }
    if (fwdCell === 'boss') {
      instructions.push({ type: 'front', depth: d, cellType: 'boss' });
    }
  }

  return instructions;
}

export interface PromptInfo {
  text: string;
  color: string;
}

export function getPrompt(
  currentCellType: CellType | null,
  facingCellType: CellType | null,
  isOnStairsUp?: boolean
): PromptInfo | null {
  if (isOnStairsUp) return { text: 'Press SPACE to ascend', color: '#aaccff' };
  if (currentCellType === 'stairs_down') return { text: 'Press SPACE to descend', color: '#aaccff' };
  if (currentCellType === 'trader') return { text: 'Press SPACE to trade', color: '#44dd44' };
  if (facingCellType === 'chest') return { text: 'Press SPACE to open chest', color: '#daa520' };
  if (facingCellType === 'trader') return { text: 'Press SPACE to trade', color: '#44dd44' };
  if (facingCellType === 'stairs_down') return { text: 'Stairs ahead', color: '#aaccff' };
  if (facingCellType === 'stairs_up') return { text: 'Stairs up ahead', color: '#aaccff' };
  if (currentCellType === 'boss') return { text: 'A dark presence awaits... [Space] to confront', color: '#ff4444' };
  if (facingCellType === 'boss') return { text: 'A dark presence awaits... [Space] to confront', color: '#ff4444' };
  return null;
}
