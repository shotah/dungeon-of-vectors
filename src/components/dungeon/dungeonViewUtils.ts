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
): { forward: CellType[]; left: CellType[]; right: CellType[] } {
  const fd = DIRECTION_DELTAS[facing];
  const ld = facing === 'N' ? DIRECTION_DELTAS['W'] : facing === 'W' ? DIRECTION_DELTAS['S'] : facing === 'S' ? DIRECTION_DELTAS['E'] : DIRECTION_DELTAS['N'];
  const rd = { x: -ld.x, y: -ld.y };

  const forward: CellType[] = [];
  const left: CellType[] = [];
  const right: CellType[] = [];

  left.push(getCellAt(grid, px + ld.x, py + ld.y, width, height));
  right.push(getCellAt(grid, px + rd.x, py + rd.y, width, height));

  const viewDepth = DEPTHS.length - 1;
  for (let d = 1; d <= viewDepth; d++) {
    const fx = px + fd.x * d;
    const fy = py + fd.y * d;
    forward.push(getCellAt(grid, fx, fy, width, height));
    left.push(getCellAt(grid, fx + ld.x, fy + ld.y, width, height));
    right.push(getCellAt(grid, fx + rd.x, fy + rd.y, width, height));
  }

  return { forward, left, right };
}

export interface WallInstruction {
  type: 'left' | 'right' | 'front' | 'torch' | 'left_cross' | 'right_cross';
  depth: number;
  cellType?: CellType;
}

export function buildWallInstructions(
  forward: CellType[],
  left: CellType[],
  right: CellType[]
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
    if (isBlockingSide(left[d])) {
      const hasFarCrossL = d < maxDepth && !isBlockingSide(left[d + 1]);
      if (!hasFarCrossL) {
        instructions.push({ type: 'left', depth: d });
      }
      if (d > 0 && !isBlockingSide(left[d - 1])) {
        instructions.push({ type: 'left_cross', depth: d });
      }
      if (hasFarCrossL) {
        instructions.push({ type: 'left_cross', depth: d + 1 });
      }
    }
    if (isBlockingSide(right[d])) {
      const hasFarCrossR = d < maxDepth && !isBlockingSide(right[d + 1]);
      if (!hasFarCrossR) {
        instructions.push({ type: 'right', depth: d });
      }
      if (d > 0 && !isBlockingSide(right[d - 1])) {
        instructions.push({ type: 'right_cross', depth: d });
      }
      if (hasFarCrossR) {
        instructions.push({ type: 'right_cross', depth: d + 1 });
      }
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
  facingCellType: CellType | null
): PromptInfo | null {
  if (currentCellType === 'stairs_down') return { text: 'Press SPACE to descend', color: '#aaccff' };
  if (currentCellType === 'trader') return { text: 'Press SPACE to trade', color: '#44dd44' };
  if (facingCellType === 'chest') return { text: 'Press SPACE to open chest', color: '#daa520' };
  if (facingCellType === 'trader') return { text: 'Press SPACE to trade', color: '#44dd44' };
  if (facingCellType === 'stairs_down') return { text: 'Stairs ahead', color: '#aaccff' };
  if (currentCellType === 'boss') return { text: 'A dark presence awaits... [Space] to confront', color: '#ff4444' };
  if (facingCellType === 'boss') return { text: 'A dark presence awaits... [Space] to confront', color: '#ff4444' };
  return null;
}
