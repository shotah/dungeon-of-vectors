export const VIEW_WIDTH = 600;
export const VIEW_HEIGHT = 400;

const VANISH_X = VIEW_WIDTH / 2;
const VANISH_Y = VIEW_HEIGHT / 2;

/** Horizontal inset at bottom (each side); corridor width = VIEW_WIDTH - 2 * CORRIDOR_INSET. */
export const CORRIDOR_INSET = VIEW_WIDTH * 2 / 5;

/** Vertical y where the floor plane starts (smaller = floor comes up higher). */
export const FLOOR_TOP_Y = 120;

export interface DepthConfig {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Same perspective as floor grid: horizontal bounds from bottom y so walls align with floor tiles. */
function depthBoundsFromBottom(bottom: number): { left: number; right: number } {
  const t = (bottom - VIEW_HEIGHT) / (VANISH_Y - VIEW_HEIGHT);
  return {
    left: CORRIDOR_INSET + (VANISH_X - CORRIDOR_INSET) * t,
    right: VIEW_WIDTH - CORRIDOR_INSET - (VANISH_X - CORRIDOR_INSET) * t,
  };
}

// More depth tiers = more side-wall panels left/right; left/right match floor perspective
export const DEPTHS: DepthConfig[] = [
  { top: 0, bottom: VIEW_HEIGHT, ...depthBoundsFromBottom(VIEW_HEIGHT) },
  { top: 50, bottom: VIEW_HEIGHT - 50, ...depthBoundsFromBottom(VIEW_HEIGHT - 50) },
  { top: 70, bottom: VIEW_HEIGHT - 70, ...depthBoundsFromBottom(VIEW_HEIGHT - 70) },
  { top: 90, bottom: VIEW_HEIGHT - 90, ...depthBoundsFromBottom(VIEW_HEIGHT - 90) },
  { top: 105, bottom: VIEW_HEIGHT - 105, ...depthBoundsFromBottom(VIEW_HEIGHT - 105) },
  { top: 120, bottom: VIEW_HEIGHT - 120, ...depthBoundsFromBottom(VIEW_HEIGHT - 120) },
  { top: 126, bottom: VIEW_HEIGHT - 126, ...depthBoundsFromBottom(VIEW_HEIGHT - 126) },
  { top: 132, bottom: VIEW_HEIGHT - 132, ...depthBoundsFromBottom(VIEW_HEIGHT - 132) },
  { top: 136, bottom: VIEW_HEIGHT - 136, ...depthBoundsFromBottom(VIEW_HEIGHT - 136) },
  { top: 140, bottom: VIEW_HEIGHT - 140, ...depthBoundsFromBottom(VIEW_HEIGHT - 140) },
  { top: 143, bottom: VIEW_HEIGHT - 143, ...depthBoundsFromBottom(VIEW_HEIGHT - 143) },
  { top: 146, bottom: VIEW_HEIGHT - 146, ...depthBoundsFromBottom(VIEW_HEIGHT - 146) },
];

export const EXTENDED_DEPTH: DepthConfig = {
  top: 150,
  bottom: VIEW_HEIGHT - 150,
  ...depthBoundsFromBottom(VIEW_HEIGHT - 150),
};

export const TOTAL_COLS = 7;
const INNER_COLS = 5;

/** X coordinate for a column edge at a given y, using same perspective as floor grid.
 *  Columns 1-5 match the original 5-column layout; 0 (LLL) and 6 (RRR) extend beyond. */
export function columnEdgeX(colEdge: number, y: number): number {
  const t = (y - VIEW_HEIGHT) / (VANISH_Y - VIEW_HEIGHT);
  const startX = ((colEdge - 1) / INNER_COLS) * VIEW_WIDTH;
  return startX + (VANISH_X - startX) * t;
}
