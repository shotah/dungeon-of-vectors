/**
 * Darken a hex color by a factor (0 = no change, 1 = black).
 * When redShift > 0, blends in a red tint (used on deep floors).
 */
export function darkenHex(hex: string, amount: number, redShift = 0): string {
  const n = Math.max(0, Math.min(1, amount));
  const rs = Math.max(0, Math.min(1, redShift));
  const parse = (s: string) => parseInt(s, 16);
  const m = hex.replace(/^#/, '').match(/.{2}/g);
  if (!m || m.length < 3) return hex;
  let r = parse(m[0]) * (1 - n);
  let g = parse(m[1]) * (1 - n);
  let b = parse(m[2]) * (1 - n);
  if (rs > 0) {
    r = r + (Math.min(r + 40, 255) - r) * rs;
    g = g * (1 - rs * 0.6);
    b = b * (1 - rs * 0.5);
  }
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

/** 0 at floor 1, steeper darkening, caps at 0.85. */
export function floorDarkenAmount(floor: number): number {
  return Math.min(0.85, (floor - 1) * 0.1);
}

/** Red shift kicks in once darkening passes 60%, scaling from 0 to 1. */
export function floorRedShift(floor: number): number {
  const t = floorDarkenAmount(floor);
  if (t <= 0.6) return 0;
  return Math.min(1, (t - 0.6) / 0.25);
}

/**
 * CSS background for the main game screen; gets darker as floor increases.
 */
export function getGameBackground(floor: number): string {
  const t = floorDarkenAmount(floor);
  const rs = floorRedShift(floor);
  const top = darkenHex('#0a0a15', t, rs);
  const mid = darkenHex('#1a1a2e', t, rs);
  const bottom = darkenHex('#0a0a15', t, rs);
  return `linear-gradient(180deg, ${top} 0%, ${mid} 50%, ${bottom} 100%)`;
}

/**
 * Solid background for the dungeon viewport (SVG container); darker with floor.
 */
export function getDungeonViewBackground(floor: number): string {
  const t = floorDarkenAmount(floor);
  const rs = floorRedShift(floor);
  return darkenHex('#0a0a15', t, rs);
}
