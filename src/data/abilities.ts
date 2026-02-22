import type { Ability } from '../types';

export const ABILITIES: Ability[] = [
  {
    id: 'steal', name: 'Steal', description: 'Attempt to steal gold from an enemy.',
    target: 'single_enemy', learnedByClass: 'rogue', levelRequired: 1,
  },
  {
    id: 'assassinate', name: 'Assassinate', description: 'Gamble for an instant kill. Fail and you take damage.',
    target: 'single_enemy', learnedByClass: 'rogue', levelRequired: 2,
  },
];

export function getAbilitiesForClass(characterClass: string, level: number): Ability[] {
  return ABILITIES.filter(a => a.learnedByClass === characterClass && a.levelRequired <= level);
}
