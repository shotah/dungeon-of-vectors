/**
 * Darken a hex color by a factor (0 = no change, 1 = black).
 */
export function darkenHex(hex: string, amount: number): string {
  const n = Math.max(0, Math.min(1, amount));
  const parse = (s: string) => Math.max(0, Math.min(255, Math.round(parseInt(s, 16) * (1 - n))));
  const m = hex.replace(/^#/, '').match(/.{2}/g);
  if (!m || m.length < 3) return hex;
  const r = parse(m[0]).toString(16).padStart(2, '0');
  const g = parse(m[1]).toString(16).padStart(2, '0');
  const b = parse(m[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

/** 0 at floor 1, caps so we don't go to full black. Export for use in SVG gradients. */
export function floorDarkenAmount(floor: number): number {
  return Math.min(0.6, (floor - 1) * 0.07);
}

/**
 * CSS background for the main game screen; gets darker as floor increases.
 */
export function getGameBackground(floor: number): string {
  const t = floorDarkenAmount(floor);
  const top = darkenHex('#0a0a15', t);
  const mid = darkenHex('#1a1a2e', t);
  const bottom = darkenHex('#0a0a15', t);
  return `linear-gradient(180deg, ${top} 0%, ${mid} 50%, ${bottom} 100%)`;
}

/**
 * Solid background for the dungeon viewport (SVG container); darker with floor.
 */
export function getDungeonViewBackground(floor: number): string {
  return darkenHex('#0a0a15', floorDarkenAmount(floor));
}
