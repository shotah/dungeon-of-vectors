import type { Spell } from '../types';

export const SPELLS: Spell[] = [
  // Mage spells
  {
    id: 'fireball', name: 'Fireball', description: 'Hurls a ball of fire at all enemies.',
    manaCost: 8, damage: 18, target: 'all_enemies', learnedByClass: 'mage', levelRequired: 1, element: 'fire',
  },
  {
    id: 'ice_shard', name: 'Ice Shard', description: 'Launches a shard of ice at one enemy.',
    manaCost: 5, damage: 22, target: 'single_enemy', learnedByClass: 'mage', levelRequired: 1, element: 'ice',
  },
  {
    id: 'lightning', name: 'Lightning', description: 'Strikes an enemy with a bolt of lightning.',
    manaCost: 12, damage: 35, target: 'single_enemy', learnedByClass: 'mage', levelRequired: 3, element: 'lightning',
  },

  // Cleric spells
  {
    id: 'heal', name: 'Heal', description: 'Restores HP to one ally.',
    manaCost: 6, healing: 30, target: 'single_ally', learnedByClass: 'cleric', levelRequired: 1,
  },
  {
    id: 'holy_light', name: 'Holy Light', description: 'Smites an enemy with divine radiance. Extra damage to undead.',
    manaCost: 7, damage: 20, target: 'single_enemy', learnedByClass: 'cleric', levelRequired: 1, element: 'holy',
  },
  {
    id: 'group_heal', name: 'Group Heal', description: 'Restores HP to all allies.',
    manaCost: 14, healing: 20, target: 'all_allies', learnedByClass: 'cleric', levelRequired: 3,
  },
  {
    id: 'barrier', name: 'Barrier', description: 'Raises the defense of all allies for the battle.',
    manaCost: 10, target: 'all_allies', learnedByClass: 'cleric', levelRequired: 2,
  },

  // Ranger spells
  {
    id: 'poison_arrow', name: 'Poison Arrow', description: 'Fires a venomous arrow at one enemy.',
    manaCost: 4, damage: 16, target: 'single_enemy', learnedByClass: 'ranger', levelRequired: 1,
  },
  {
    id: 'volley', name: 'Volley', description: 'Rains arrows on all enemies.',
    manaCost: 10, damage: 14, target: 'all_enemies', learnedByClass: 'ranger', levelRequired: 3,
  },
  {
    id: 'natures_mend', name: "Nature's Mend", description: 'Calls on nature to heal one ally.',
    manaCost: 8, healing: 25, target: 'single_ally', learnedByClass: 'ranger', levelRequired: 2,
  },
];

export function getSpellsForClass(characterClass: string, level: number): Spell[] {
  return SPELLS.filter(s => s.learnedByClass === characterClass && s.levelRequired <= level);
}
