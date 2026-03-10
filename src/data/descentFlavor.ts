/**
 * Flavor messages when descending to a new floor. Picked at random; deeper floors use creepier tiers.
 */
const SHALLOW = [
  'The stairs creak underfoot.',
  'Damp air rises from below.',
  'Torchlight flickers on the walls.',
  'You hear dripping water somewhere ahead.',
  'Dust drifts in the still air.',
];

const MID = [
  'The air grows cold.',
  'Something scrapes in the distance.',
  'The shadows seem to shift.',
  'Your breath fogs slightly.',
  'Old bones lie scattered in the corner.',
  'The walls bear faint scratches.',
];

const DEEP = [
  'A low hum seems to come from the stone itself.',
  'You feel as if something is watching.',
  'The darkness here feels heavier.',
  'Something moves just at the edge of your vision.',
  'The air tastes of ash and old blood.',
  'Whispers seem to echo from the walls.',
];

const ABYSSAL = [
  'Reality feels thin here.',
  'You hear a heartbeat that is not your own.',
  'The shadows have grown teeth.',
  'Something ancient stirs in the deep.',
  'The very light seems to bend away.',
  'You have come too far. It has noticed.',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Returns a random atmospheric message for the given floor, or null to skip (chance). */
export function getDescentFlavor(floor: number): string | null {
  if (Math.random() > 0.45) return null; // 45% chance to show something
  if (floor >= 8) return pick(ABYSSAL);
  if (floor >= 5) return pick(DEEP);
  if (floor >= 3) return pick(MID);
  return pick(SHALLOW);
}
