import type { CharacterClass, CharacterStats, FormationRow } from '../types';

export const HP_PER_VIT = 10;
export const MP_PER_INT = 6;
export const STR_PER_PT = 2;
export const AGI_PER_PT = 2;

export interface ClassDefinition {
  name: string;
  characterClass: CharacterClass;
  description: string;
  defaultRow: FormationRow;
  baseStats: CharacterStats;
  pointsPerLevel: number;
}

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  warrior: {
    name: 'Warrior',
    characterClass: 'warrior',
    description: 'A stalwart fighter who excels in melee combat. High HP and defense.',
    defaultRow: 'front',
    baseStats: {
      maxHp: 45, hp: 45, maxMp: 0, mp: 0,
      strength: 14, agility: 8,
      vitality: 10, intelligence: 2,
      level: 1, xp: 0, xpToNext: 100,
    },
    pointsPerLevel: 3,
  },
  mage: {
    name: 'Mage',
    characterClass: 'mage',
    description: 'A wielder of arcane magic. Devastating spells but fragile in melee.',
    defaultRow: 'back',
    baseStats: {
      maxHp: 22, hp: 22, maxMp: 30, mp: 30,
      strength: 6, agility: 10,
      vitality: 5, intelligence: 14,
      level: 1, xp: 0, xpToNext: 100,
    },
    pointsPerLevel: 3,
  },
  rogue: {
    name: 'Rogue',
    characterClass: 'rogue',
    description: 'A swift striker who attacks first. High speed and critical hits.',
    defaultRow: 'back',
    baseStats: {
      maxHp: 30, hp: 30, maxMp: 5, mp: 5,
      strength: 12, agility: 14,
      vitality: 7, intelligence: 3,
      level: 1, xp: 0, xpToNext: 100,
    },
    pointsPerLevel: 3,
  },
  cleric: {
    name: 'Cleric',
    characterClass: 'cleric',
    description: 'A holy healer who supports the party. Can heal and smite undead.',
    defaultRow: 'front',
    baseStats: {
      maxHp: 35, hp: 35, maxMp: 20, mp: 20,
      strength: 10, agility: 9,
      vitality: 8, intelligence: 10,
      level: 1, xp: 0, xpToNext: 100,
    },
    pointsPerLevel: 3,
  },
  ranger: {
    name: 'Ranger',
    characterClass: 'ranger',
    description: 'A skilled hunter with keen aim. Balanced stats with nature magic.',
    defaultRow: 'back',
    baseStats: {
      maxHp: 34, hp: 34, maxMp: 12, mp: 12,
      strength: 13, agility: 12,
      vitality: 8, intelligence: 5,
      level: 1, xp: 0, xpToNext: 100,
    },
    pointsPerLevel: 3,
  },
};

export function calculateXpToNext(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}
