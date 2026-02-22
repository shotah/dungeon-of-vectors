export const VIEW_WIDTH = 600;
export const VIEW_HEIGHT = 400;

export interface DepthConfig {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const DEPTHS: DepthConfig[] = [
  { left: 0, right: VIEW_WIDTH, top: 0, bottom: VIEW_HEIGHT },
  { left: 100, right: VIEW_WIDTH - 100, top: 50, bottom: VIEW_HEIGHT - 50 },
  { left: 180, right: VIEW_WIDTH - 180, top: 90, bottom: VIEW_HEIGHT - 90 },
  { left: 240, right: VIEW_WIDTH - 240, top: 120, bottom: VIEW_HEIGHT - 120 },
  { left: 264, right: VIEW_WIDTH - 264, top: 132, bottom: VIEW_HEIGHT - 132 },
  { left: 278, right: VIEW_WIDTH - 278, top: 140, bottom: VIEW_HEIGHT - 140 },
  { left: 288, right: VIEW_WIDTH - 288, top: 146, bottom: VIEW_HEIGHT - 146 },
];

export const EXTENDED_DEPTH: DepthConfig = {
  left: 293,
  right: VIEW_WIDTH - 293,
  top: 150,
  bottom: VIEW_HEIGHT - 150,
};
