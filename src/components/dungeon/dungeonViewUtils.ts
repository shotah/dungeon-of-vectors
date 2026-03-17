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

const SIDE_OBJECT_TYPES = new Set<CellType>(['stairs_down', 'stairs_up', 'chest', 'trader', 'boss']);

export function getViewCells(
  grid: CellType[][],
  px: number, py: number,
  facing: Direction,
  width: number, height: number
): { forward: CellType[]; left: CellType[]; right: CellType[]; leftLeft: CellType[]; rightRight: CellType[]; leftLeftLeft: CellType[]; rightRightRight: CellType[] } {
  const fd = DIRECTION_DELTAS[facing];
  const ld = facing === 'N' ? DIRECTION_DELTAS['W'] : facing === 'W' ? DIRECTION_DELTAS['S'] : facing === 'S' ? DIRECTION_DELTAS['E'] : DIRECTION_DELTAS['N'];
  const rd = { x: -ld.x, y: -ld.y };

  const forward: CellType[] = [];
  const left: CellType[] = [];
  const right: CellType[] = [];
  const leftLeft: CellType[] = [];
  const rightRight: CellType[] = [];
  const leftLeftLeft: CellType[] = [];
  const rightRightRight: CellType[] = [];

  left.push(getCellAt(grid, px + ld.x, py + ld.y, width, height));
  right.push(getCellAt(grid, px + rd.x, py + rd.y, width, height));
  leftLeft.push(getCellAt(grid, px + 2 * ld.x, py + 2 * ld.y, width, height));
  rightRight.push(getCellAt(grid, px + 2 * rd.x, py + 2 * rd.y, width, height));
  leftLeftLeft.push(getCellAt(grid, px + 3 * ld.x, py + 3 * ld.y, width, height));
  rightRightRight.push(getCellAt(grid, px + 3 * rd.x, py + 3 * rd.y, width, height));

  const viewDepth = DEPTHS.length - 1;
  for (let d = 1; d <= viewDepth; d++) {
    const fx = px + fd.x * d;
    const fy = py + fd.y * d;
    forward.push(getCellAt(grid, fx, fy, width, height));
    left.push(getCellAt(grid, fx + ld.x, fy + ld.y, width, height));
    right.push(getCellAt(grid, fx + rd.x, fy + rd.y, width, height));
    leftLeft.push(getCellAt(grid, fx + 2 * ld.x, fy + 2 * ld.y, width, height));
    rightRight.push(getCellAt(grid, fx + 2 * rd.x, fy + 2 * rd.y, width, height));
    leftLeftLeft.push(getCellAt(grid, fx + 3 * ld.x, fy + 3 * ld.y, width, height));
    rightRightRight.push(getCellAt(grid, fx + 3 * rd.x, fy + 3 * rd.y, width, height));
  }

  for (let i = 0; i < left.length; i++) {
    if (isBlockingSide(left[i])) leftLeft[i] = 'wall';
    if (isBlockingSide(right[i])) rightRight[i] = 'wall';
    if (isBlockingSide(leftLeft[i])) leftLeftLeft[i] = 'wall';
    if (isBlockingSide(rightRight[i])) rightRightRight[i] = 'wall';
  }

  return { forward, left, right, leftLeft, rightRight, leftLeftLeft, rightRightRight };
}

export interface WallInstruction {
  type: 'front' | 'torch' | 'column_wall' | 'column_side' | 'column_front';
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
  rightRight?: CellType[],
  leftLeftLeft?: CellType[],
  rightRightRight?: CellType[]
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

    if (leftLeftLeft && d < leftLeftLeft.length && isBlockingSide(leftLeftLeft[d])) {
      columnWalls.push(0);
      sideEdges.add(0);
      sideEdges.add(1);
    }
    if (leftLeft && d < leftLeft.length && isBlockingSide(leftLeft[d])) {
      columnWalls.push(1);
      sideEdges.add(1);
      sideEdges.add(2);
    }
    if (d < left.length && isBlockingSide(left[d])) {
      columnWalls.push(2);
      sideEdges.add(2);
      sideEdges.add(3);
    }
    if (d < right.length && isBlockingSide(right[d])) {
      columnWalls.push(4);
      sideEdges.add(4);
      sideEdges.add(5);
    }
    if (rightRight && d < rightRight.length && isBlockingSide(rightRight[d])) {
      columnWalls.push(5);
      sideEdges.add(5);
      sideEdges.add(6);
    }
    if (rightRightRight && d < rightRightRight.length && isBlockingSide(rightRightRight[d])) {
      columnWalls.push(6);
      sideEdges.add(6);
      sideEdges.add(7);
    }

    // Side strips first (render behind column walls)
    for (const edge of sideEdges) {
      instructions.push({ type: 'column_side', depth: d, edge });
    }
    // Column walls on top of side strips
    for (const col of columnWalls) {
      instructions.push({ type: 'column_wall', depth: d, column: col });
    }

    // Special objects (stairs, chests, traders, bosses, doors) in side columns
    if (leftLeftLeft && d < leftLeftLeft.length && SIDE_OBJECT_TYPES.has(leftLeftLeft[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 0, cellType: leftLeftLeft[d] });
    }
    if (leftLeft && d < leftLeft.length && SIDE_OBJECT_TYPES.has(leftLeft[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 1, cellType: leftLeft[d] });
    }
    if (d < left.length && SIDE_OBJECT_TYPES.has(left[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 2, cellType: left[d] });
    }
    if (d < right.length && SIDE_OBJECT_TYPES.has(right[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 4, cellType: right[d] });
    }
    if (rightRight && d < rightRight.length && SIDE_OBJECT_TYPES.has(rightRight[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 5, cellType: rightRight[d] });
    }
    if (rightRightRight && d < rightRightRight.length && SIDE_OBJECT_TYPES.has(rightRightRight[d])) {
      instructions.push({ type: 'column_front', depth: d, column: 6, cellType: rightRightRight[d] });
    }

    if (nearestBlocker >= 0 && d > nearestBlocker) continue;

    const fwdCell = forward[d];

    const frontDepth = d + 1;

    if (fwdCell === 'wall') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'wall' });
      if (frontDepth < DEPTHS.length) {
        const depthCfg = DEPTHS[frontDepth];
        const wallW = depthCfg.right - depthCfg.left;
        if (wallW > 60) {
          instructions.push({ type: 'torch', depth: frontDepth });
        }
      }
      continue;
    }

    if (fwdCell === 'door') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'door' });
      continue;
    }

    if (fwdCell === 'stairs_down') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'stairs_down' });
    }
    if (fwdCell === 'stairs_up') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'stairs_up' });
    }
    if (fwdCell === 'chest') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'chest' });
    }
    if (fwdCell === 'trader') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'trader' });
    }
    if (fwdCell === 'boss') {
      instructions.push({ type: 'front', depth: frontDepth, cellType: 'boss' });
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
