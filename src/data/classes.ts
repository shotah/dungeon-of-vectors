import type { CharacterClass, CharacterStats, FormationRow } from '../types';

export interface ClassDefinition {
  name: string;
  characterClass: CharacterClass;
  description: string;
  defaultRow: FormationRow;
  baseStats: CharacterStats;
  growthRates: {
    hp: number;
    mp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  warrior: {
    name: 'Warrior',
    characterClass: 'warrior',
    description: 'A stalwart fighter who excels in melee combat. High HP and defense.',
    defaultRow: 'front',
    baseStats: {
      maxHp: 45, hp: 45, maxMp: 0, mp: 0,
      attack: 14, defense: 12, speed: 8,
      level: 1, xp: 0, xpToNext: 100,
    },
    growthRates: { hp: 12, mp: 0, attack: 4, defense: 3, speed: 1 },
  },
  mage: {
    name: 'Mage',
    characterClass: 'mage',
    description: 'A wielder of arcane magic. Devastating spells but fragile in melee.',
    defaultRow: 'back',
    baseStats: {
      maxHp: 22, hp: 22, maxMp: 30, mp: 30,
      attack: 6, defense: 5, speed: 10,
      level: 1, xp: 0, xpToNext: 100,
    },
    growthRates: { hp: 5, mp: 8, attack: 2, defense: 1, speed: 2 },
  },
  rogue: {
    name: 'Rogue',
    characterClass: 'rogue',
    description: 'A swift striker who attacks first. High speed and critical hits.',
    defaultRow: 'back',
    baseStats: {
      maxHp: 30, hp: 30, maxMp: 5, mp: 5,
      attack: 12, defense: 7, speed: 14,
      level: 1, xp: 0, xpToNext: 100,
    },
    growthRates: { hp: 7, mp: 1, attack: 3, defense: 2, speed: 4 },
  },
  cleric: {
    name: 'Cleric',
    characterClass: 'cleric',
    description: 'A holy healer who supports the party. Can heal and smite undead.',
    defaultRow: 'front',
    baseStats: {
      maxHp: 35, hp: 35, maxMp: 20, mp: 20,
      attack: 10, defense: 10, speed: 9,
      level: 1, xp: 0, xpToNext: 100,
    },
    growthRates: { hp: 8, mp: 5, attack: 2, defense: 3, speed: 1 },
  },
};

export function calculateXpToNext(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}
