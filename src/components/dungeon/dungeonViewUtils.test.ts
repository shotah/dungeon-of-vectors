import { describe, it, expect } from 'vitest';
import type { CellType } from '../../types';
import { DEPTHS } from '../svg/dungeon/dungeonConstants';
import {
  getCellAt,
  isBlockingSide,
  getViewCells,
  buildWallInstructions,
  getPrompt,
} from './dungeonViewUtils';

// ---------------------------------------------------------------------------
// Helpers to build grids
// ---------------------------------------------------------------------------

function makeGrid(width: number, height: number, fill: CellType = 'floor'): CellType[][] {
  return Array.from({ length: height }, () => Array(width).fill(fill));
}

function setCell(grid: CellType[][], x: number, y: number, type: CellType) {
  grid[y][x] = type;
}

// ===========================================================================
// getCellAt
// ===========================================================================

describe('getCellAt', () => {
  const grid = makeGrid(5, 5, 'floor');
  setCell(grid, 2, 3, 'chest');

  it('returns the cell type for valid in-bounds coordinates', () => {
    expect(getCellAt(grid, 0, 0, 5, 5)).toBe('floor');
    expect(getCellAt(grid, 2, 3, 5, 5)).toBe('chest');
  });

  it('returns wall for x < 0', () => {
    expect(getCellAt(grid, -1, 0, 5, 5)).toBe('wall');
  });

  it('returns wall for x >= width', () => {
    expect(getCellAt(grid, 5, 0, 5, 5)).toBe('wall');
  });

  it('returns wall for y < 0', () => {
    expect(getCellAt(grid, 0, -1, 5, 5)).toBe('wall');
  });

  it('returns wall for y >= height', () => {
    expect(getCellAt(grid, 0, 5, 5, 5)).toBe('wall');
  });

  it('returns wall for all negative coordinates', () => {
    expect(getCellAt(grid, -10, -10, 5, 5)).toBe('wall');
  });

  it('returns the correct cell at grid edges', () => {
    expect(getCellAt(grid, 4, 4, 5, 5)).toBe('floor');
    expect(getCellAt(grid, 0, 4, 5, 5)).toBe('floor');
    expect(getCellAt(grid, 4, 0, 5, 5)).toBe('floor');
  });
});

// ===========================================================================
// isBlockingSide
// ===========================================================================

describe('isBlockingSide', () => {
  it('returns true for wall', () => {
    expect(isBlockingSide('wall')).toBe(true);
  });

  it('returns true for door', () => {
    expect(isBlockingSide('door')).toBe(true);
  });

  it('returns false for floor', () => {
    expect(isBlockingSide('floor')).toBe(false);
  });

  it('returns false for chest', () => {
    expect(isBlockingSide('chest')).toBe(false);
  });

  it('returns false for trader', () => {
    expect(isBlockingSide('trader')).toBe(false);
  });

  it('returns false for stairs_down', () => {
    expect(isBlockingSide('stairs_down')).toBe(false);
  });

  it('returns false for start', () => {
    expect(isBlockingSide('start')).toBe(false);
  });
});

// ===========================================================================
// getViewCells
// ===========================================================================

describe('getViewCells', () => {
  // 10x10 all-floor grid with walls at specific spots
  const grid = makeGrid(10, 10, 'floor');
  const W = 10, H = 10;

  describe('array shapes', () => {
    it('forward has viewDepth elements (depths 0 to viewDepth-1 = cells 1 to viewDepth ahead)', () => {
      const result = getViewCells(grid, 5, 5, 'N', W, H);
      expect(result.forward).toHaveLength(DEPTHS.length - 1);
    });

    it('left has viewDepth+1 elements (depth 0 at player + depths 1 to viewDepth ahead)', () => {
      const result = getViewCells(grid, 5, 5, 'N', W, H);
      expect(result.left).toHaveLength(DEPTHS.length);
    });

    it('right has viewDepth+1 elements (depth 0 at player + depths 1 to viewDepth ahead)', () => {
      const result = getViewCells(grid, 5, 5, 'N', W, H);
      expect(result.right).toHaveLength(DEPTHS.length);
    });

    it('leftLeft and rightRight have viewDepth+1 elements (same as left/right)', () => {
      const result = getViewCells(grid, 5, 5, 'N', W, H);
      expect(result.leftLeft).toHaveLength(DEPTHS.length);
      expect(result.rightRight).toHaveLength(DEPTHS.length);
    });

    it('leftLeftLeft and rightRightRight have viewDepth+1 elements', () => {
      const result = getViewCells(grid, 5, 5, 'N', W, H);
      expect(result.leftLeftLeft).toHaveLength(DEPTHS.length);
      expect(result.rightRightRight).toHaveLength(DEPTHS.length);
    });
  });

  describe('facing North from (5,5)', () => {
    const result = getViewCells(grid, 5, 5, 'N', W, H);

    it('left[0] is the cell directly west of player (4,5)', () => {
      expect(result.left[0]).toBe(getCellAt(grid, 4, 5, W, H));
    });

    it('right[0] is the cell directly east of player (6,5)', () => {
      expect(result.right[0]).toBe(getCellAt(grid, 6, 5, W, H));
    });

    it('forward[0] is one cell north (5,4)', () => {
      expect(result.forward[0]).toBe(getCellAt(grid, 5, 4, W, H));
    });

    it('forward[3] is four cells north (5,1)', () => {
      expect(result.forward[3]).toBe(getCellAt(grid, 5, 1, W, H));
    });

    it('left[1] is west of 1-ahead (4,4)', () => {
      expect(result.left[1]).toBe(getCellAt(grid, 4, 4, W, H));
    });

    it('right[1] is east of 1-ahead (6,4)', () => {
      expect(result.right[1]).toBe(getCellAt(grid, 6, 4, W, H));
    });

    it('leftLeft[0] is two cells west of player (3,5)', () => {
      expect(result.leftLeft[0]).toBe(getCellAt(grid, 3, 5, W, H));
    });

    it('rightRight[0] is two cells east of player (7,5)', () => {
      expect(result.rightRight[0]).toBe(getCellAt(grid, 7, 5, W, H));
    });

    it('leftLeftLeft[0] is three cells west of player (2,5)', () => {
      expect(result.leftLeftLeft[0]).toBe(getCellAt(grid, 2, 5, W, H));
    });

    it('rightRightRight[0] is three cells east of player (8,5)', () => {
      expect(result.rightRightRight[0]).toBe(getCellAt(grid, 8, 5, W, H));
    });
  });

  describe('facing West: passage to the right (minimap should match 3D)', () => {
    // When facing West, "right" = North = (px, py-1). So right[0] = grid[py-1][px].
    it('right[0] is the cell north of player (5,4)', () => {
      const result = getViewCells(grid, 5, 5, 'W', W, H);
      expect(result.right[0]).toBe(getCellAt(grid, 5, 4, W, H));
    });

    it('when passage is to the right (right[0]=floor), no column wall at 0 but column wall at 1', () => {
      const g = makeGrid(10, 10, 'floor');
      setCell(g, 4, 5, 'wall');   // wall ahead (west)
      setCell(g, 5, 6, 'wall');   // wall to left (south)
      setCell(g, 4, 4, 'wall');  // right[1] = wall (north of 1-ahead)
      const { forward, left, right } = getViewCells(g, 5, 5, 'W', W, H);
      expect(right[0]).toBe('floor');
      expect(right[1]).toBe('wall');

      const instructions = buildWallInstructions(forward, left, right);
      const rightWalls = instructions.filter(i => i.type === 'column_wall' && i.column === 4);

      expect(rightWalls.some(r => r.depth === 0)).toBe(false);
      expect(rightWalls.some(r => r.depth === 1)).toBe(true);
    });
  });

  describe('facing South from (5,5)', () => {
    const result = getViewCells(grid, 5, 5, 'S', W, H);

    it('left[0] is east of player (6,5) — left when facing south', () => {
      expect(result.left[0]).toBe(getCellAt(grid, 6, 5, W, H));
    });

    it('right[0] is west of player (4,5) — right when facing south', () => {
      expect(result.right[0]).toBe(getCellAt(grid, 4, 5, W, H));
    });

    it('forward[0] is one cell south (5,6)', () => {
      expect(result.forward[0]).toBe(getCellAt(grid, 5, 6, W, H));
    });

    it('forward[3] is four cells south (5,9)', () => {
      expect(result.forward[3]).toBe(getCellAt(grid, 5, 9, W, H));
    });
  });

  describe('facing East from (5,5)', () => {
    const result = getViewCells(grid, 5, 5, 'E', W, H);

    it('left[0] is north of player (5,4)', () => {
      expect(result.left[0]).toBe(getCellAt(grid, 5, 4, W, H));
    });

    it('right[0] is south of player (5,6)', () => {
      expect(result.right[0]).toBe(getCellAt(grid, 5, 6, W, H));
    });

    it('forward[0] is one cell east (6,5)', () => {
      expect(result.forward[0]).toBe(getCellAt(grid, 6, 5, W, H));
    });

    it('forward[3] is four cells east (9,5)', () => {
      expect(result.forward[3]).toBe(getCellAt(grid, 9, 5, W, H));
    });
  });

  describe('facing West from (5,5)', () => {
    const result = getViewCells(grid, 5, 5, 'W', W, H);

    it('left[0] is south of player (5,6)', () => {
      expect(result.left[0]).toBe(getCellAt(grid, 5, 6, W, H));
    });

    it('right[0] is north of player (5,4)', () => {
      expect(result.right[0]).toBe(getCellAt(grid, 5, 4, W, H));
    });

    it('forward[0] is one cell west (4,5)', () => {
      expect(result.forward[0]).toBe(getCellAt(grid, 4, 5, W, H));
    });
  });

  describe('out-of-bounds cells return wall', () => {
    it('looking north from (5,0) — forward goes out of bounds', () => {
      const result = getViewCells(grid, 5, 0, 'N', W, H);
      expect(result.forward[0]).toBe('wall');
      expect(result.forward[1]).toBe('wall');
    });

    it('left[0] is wall when player is at west boundary facing north', () => {
      const result = getViewCells(grid, 0, 5, 'N', W, H);
      expect(result.left[0]).toBe('wall');
    });

    it('right[0] is wall when player is at east boundary facing north', () => {
      const result = getViewCells(grid, 9, 5, 'N', W, H);
      expect(result.right[0]).toBe('wall');
    });
  });

  describe('detects specific cell types', () => {
    it('detects a chest ahead', () => {
      const g = makeGrid(10, 10, 'floor');
      setCell(g, 5, 4, 'chest');
      const result = getViewCells(g, 5, 5, 'N', 10, 10);
      expect(result.forward[0]).toBe('chest');
    });

    it('detects a trader to the left at depth 0', () => {
      const g = makeGrid(10, 10, 'floor');
      setCell(g, 4, 5, 'trader');
      const result = getViewCells(g, 5, 5, 'N', 10, 10);
      expect(result.left[0]).toBe('trader');
    });

    it('detects a door to the right at depth 2', () => {
      const g = makeGrid(10, 10, 'floor');
      setCell(g, 6, 3, 'door');
      const result = getViewCells(g, 5, 5, 'N', 10, 10);
      expect(result.right[2]).toBe('door');
    });

    it('detects stairs_down ahead at depth 1', () => {
      const g = makeGrid(10, 10, 'floor');
      setCell(g, 5, 3, 'stairs_down');
      const result = getViewCells(g, 5, 5, 'N', 10, 10);
      expect(result.forward[1]).toBe('stairs_down');
    });
  });
});

// ===========================================================================
// buildWallInstructions
// ===========================================================================

describe('buildWallInstructions', () => {
  describe('empty corridor (all floors, no walls)', () => {
    const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
    const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
    const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

    it('produces no instructions', () => {
      const result = buildWallInstructions(forward, left, right);
      expect(result).toHaveLength(0);
    });
  });

  describe('corridor with walls on both sides', () => {
    const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
    const left: CellType[] = ['wall', 'wall', 'wall', 'wall', 'wall'];
    const right: CellType[] = ['wall', 'wall', 'wall', 'wall', 'wall'];

    it('produces column wall instructions for L and R at all depths', () => {
      const result = buildWallInstructions(forward, left, right);
      const lefts = result.filter(i => i.type === 'column_wall' && i.column === 2);
      const rights = result.filter(i => i.type === 'column_wall' && i.column === 4);
      expect(lefts).toHaveLength(4);
      expect(rights).toHaveLength(4);
    });

    it('left column walls are at depths 3, 2, 1, 0 (far to near)', () => {
      const result = buildWallInstructions(forward, left, right);
      const leftDepths = result.filter(i => i.type === 'column_wall' && i.column === 2).map(i => i.depth);
      expect(leftDepths).toEqual([3, 2, 1, 0]);
    });
  });

  describe('front wall at depth 1 with side walls', () => {
    const forward: CellType[] = ['floor', 'wall', 'floor', 'floor'];
    const left: CellType[] = ['wall', 'wall', 'wall', 'floor', 'floor'];
    const right: CellType[] = ['wall', 'wall', 'wall', 'floor', 'floor'];

    it('includes a front wall instruction at depth 2 (forward[1] shifted +1)', () => {
      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].depth).toBe(2);
      expect(fronts[0].cellType).toBe('wall');
    });

    it('includes a torch on the front wall at depth 2', () => {
      const result = buildWallInstructions(forward, left, right);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(1);
      expect(torches[0].depth).toBe(2);
    });

    it('still emits column walls at depth 0 (closer than front wall)', () => {
      const result = buildWallInstructions(forward, left, right);
      const leftD0 = result.find(i => i.type === 'column_wall' && i.column === 2 && i.depth === 0);
      const rightD0 = result.find(i => i.type === 'column_wall' && i.column === 4 && i.depth === 0);
      expect(leftD0).toBeDefined();
      expect(rightD0).toBeDefined();
    });
  });

  describe('front wall occlusion — hitFrontWall', () => {
    const forward: CellType[] = ['floor', 'wall', 'wall', 'floor'];
    const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
    const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

    it('only renders the nearest front wall (depth 2), not the one behind', () => {
      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].depth).toBe(2);
    });
  });

  describe('front wall at depth 3 still occludes further forward checks', () => {
    const forward: CellType[] = ['floor', 'floor', 'wall', 'wall'];
    const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
    const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

    it('renders front wall at depth 3 with torch (width > 60)', () => {
      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].depth).toBe(3);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(1);
    });
  });

  describe('door blocks like wall', () => {
    const forward: CellType[] = ['floor', 'door', 'floor', 'floor'];
    const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
    const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

    it('renders a front wall with cellType door at depth 2', () => {
      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].cellType).toBe('door');
      expect(fronts[0].depth).toBe(2);
    });

    it('does not render elements behind the door', () => {
      const fwd: CellType[] = ['floor', 'door', 'chest', 'trader'];
      const result = buildWallInstructions(fwd, forward, forward);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].cellType).toBe('door');
    });
  });

  describe('non-blocking objects (stairs, chest, trader) render without occluding', () => {
    it('chest renders and does not block wall behind it', () => {
      const forward: CellType[] = ['chest', 'wall', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(2);
      expect(fronts.some(f => f.cellType === 'chest')).toBe(true);
      expect(fronts.some(f => f.cellType === 'wall')).toBe(true);
    });

    it('stairs_down renders without blocking', () => {
      const forward: CellType[] = ['stairs_down', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].cellType).toBe('stairs_down');
      expect(fronts[0].depth).toBe(1);
    });

    it('trader renders without blocking', () => {
      const forward: CellType[] = ['floor', 'trader', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const fronts = result.filter(i => i.type === 'front');
      expect(fronts).toHaveLength(1);
      expect(fronts[0].cellType).toBe('trader');
      expect(fronts[0].depth).toBe(2);
    });
  });

  describe('side door renders as blocking column wall', () => {
    it('door on left side emits column wall at depth 0', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['door', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const lefts = result.filter(i => i.type === 'column_wall' && i.column === 2);
      expect(lefts).toHaveLength(1);
      expect(lefts[0].depth).toBe(0);
    });
  });

  describe('depth 0 column walls and passage visibility', () => {
    it('emits column wall at depth 0 for wall beside player', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['wall', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const leftWalls = result.filter(i => i.type === 'column_wall' && i.column === 2);
      expect(leftWalls).toHaveLength(1);
      expect(leftWalls[0].depth).toBe(0);
    });

    it('emits column wall at depth 0 for right wall beside player', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['wall', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const rightWalls = result.filter(i => i.type === 'column_wall' && i.column === 4);
      expect(rightWalls).toHaveLength(1);
      expect(rightWalls[0].depth).toBe(0);
    });
  });

  describe('torch placement rules', () => {
    it('places torch on front wall at depth 1 (forward[0] shifted +1)', () => {
      const forward: CellType[] = ['wall', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(1);
      expect(torches[0].depth).toBe(1);
    });

    it('places torch on front wall at depth 3 (forward[2] shifted +1)', () => {
      const forward: CellType[] = ['floor', 'floor', 'wall', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(1);
      expect(torches[0].depth).toBe(3);
    });

    it('no torch on front wall at farthest depth (wall too narrow, width < 60)', () => {
      const viewDepth = DEPTHS.length - 1;
      const forward: CellType[] = [...Array(viewDepth).fill('floor'), 'wall'];
      const left: CellType[] = Array(DEPTHS.length).fill('floor');
      const right: CellType[] = Array(DEPTHS.length).fill('floor');

      const result = buildWallInstructions(forward, left, right);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(0);
    });

    it('no torch on door (only on wall type)', () => {
      const forward: CellType[] = ['door', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const torches = result.filter(i => i.type === 'torch');
      expect(torches).toHaveLength(0);
    });
  });

  describe('instruction ordering (far to near)', () => {
    it('processes depths from 3 down to 0', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['wall', 'wall', 'wall', 'wall', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const leftDepths = result.filter(i => i.type === 'column_wall' && i.column === 2).map(i => i.depth);
      expect(leftDepths).toEqual([3, 2, 1, 0]);
    });
  });

  describe('column walls at wall-to-open transitions', () => {
    it('emits column wall only at blocking depths (isolated wall at depth 1)', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'wall', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const rights = result.filter(i => i.type === 'column_wall' && i.column === 4);
      expect(rights).toHaveLength(1);
      expect(rights[0].depth).toBe(1);
    });

    it('emits column walls for two isolated wall segments', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'wall', 'floor', 'wall', 'floor'];
      const left: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const rights = result.filter(i => i.type === 'column_wall' && i.column === 4);
      expect(rights).toHaveLength(2);
      expect(rights.map(r => r.depth).sort()).toEqual([1, 3]);
    });

    it('emits column walls for passage opening on right at depth 1', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['wall', 'wall', 'wall', 'wall', 'floor'];
      const right: CellType[] = ['wall', 'floor', 'wall', 'wall', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const rightWalls = result.filter(i => i.type === 'column_wall' && i.column === 4);
      expect(rightWalls.map(r => r.depth).sort()).toEqual([0, 2, 3]);
    });
  });

  describe('column side strips', () => {
    it('emits side strips for edges of wall columns', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['wall', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right);
      const sides = result.filter(i => i.type === 'column_side');
      expect(sides.length).toBeGreaterThan(0);
      expect(sides.every(s => s.edge === 2 || s.edge === 3)).toBe(true);
    });

    it('deduplicates shared edges between adjacent wall columns', () => {
      const forward: CellType[] = ['floor', 'floor', 'floor', 'floor'];
      const left: CellType[] = ['wall', 'floor', 'floor', 'floor', 'floor'];
      const right: CellType[] = ['floor', 'floor', 'floor', 'floor', 'floor'];
      const leftLeft: CellType[] = ['wall', 'floor', 'floor', 'floor', 'floor'];

      const result = buildWallInstructions(forward, left, right, leftLeft);
      const sidesD0 = result.filter(i => i.type === 'column_side' && i.depth === 0);
      const edges = sidesD0.map(s => s.edge!);
      expect(new Set(edges).size).toBe(edges.length);
    });
  });

  describe('complex scenario: T-junction', () => {
    const forward: CellType[] = ['floor', 'wall', 'floor', 'floor'];
    const left: CellType[] = ['wall', 'floor', 'wall', 'floor', 'floor'];
    const right: CellType[] = ['wall', 'wall', 'wall', 'floor', 'floor'];

    it('produces expected wall pattern', () => {
      const result = buildWallInstructions(forward, left, right);

      const leftWalls = result.filter(i => i.type === 'column_wall' && i.column === 2);
      const rightWalls = result.filter(i => i.type === 'column_wall' && i.column === 4);
      const fronts = result.filter(i => i.type === 'front');

      expect(leftWalls.map(i => i.depth).sort()).toEqual([0, 2]);
      expect(rightWalls.map(i => i.depth).sort()).toEqual([0, 1, 2]);

      expect(fronts).toHaveLength(1);
      expect(fronts[0].depth).toBe(2);
      expect(fronts[0].cellType).toBe('wall');
    });
  });
});

// ===========================================================================
// getPrompt
// ===========================================================================

describe('getPrompt', () => {
  it('returns descend prompt when standing on stairs_down', () => {
    const result = getPrompt('stairs_down', 'floor');
    expect(result).toEqual({ text: 'Press SPACE to descend', color: '#aaccff' });
  });

  it('returns trade prompt when standing on trader', () => {
    const result = getPrompt('trader', 'floor');
    expect(result).toEqual({ text: 'Press SPACE to trade', color: '#44dd44' });
  });

  it('returns open chest prompt when facing a chest', () => {
    const result = getPrompt('floor', 'chest');
    expect(result).toEqual({ text: 'Press SPACE to open chest', color: '#daa520' });
  });

  it('returns trade prompt when facing a trader', () => {
    const result = getPrompt('floor', 'trader');
    expect(result).toEqual({ text: 'Press SPACE to trade', color: '#44dd44' });
  });

  it('returns stairs ahead when facing stairs_down', () => {
    const result = getPrompt('floor', 'stairs_down');
    expect(result).toEqual({ text: 'Stairs ahead', color: '#aaccff' });
  });

  it('returns null for plain floor in both positions', () => {
    expect(getPrompt('floor', 'floor')).toBeNull();
  });

  it('returns null when both are null', () => {
    expect(getPrompt(null, null)).toBeNull();
  });

  it('prioritises current cell over facing cell', () => {
    const result = getPrompt('stairs_down', 'chest');
    expect(result!.text).toBe('Press SPACE to descend');
  });

  it('standing on trader takes priority over facing chest', () => {
    const result = getPrompt('trader', 'chest');
    expect(result!.text).toBe('Press SPACE to trade');
  });

  it('facing wall returns null', () => {
    expect(getPrompt('floor', 'wall')).toBeNull();
  });

  it('standing on floor returns null', () => {
    expect(getPrompt('floor', null)).toBeNull();
  });
});
