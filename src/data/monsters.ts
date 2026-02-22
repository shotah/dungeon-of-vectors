import type { Monster } from '../types';

type MonsterTemplate = Omit<Monster, 'hp'>;

const MONSTER_TEMPLATES: MonsterTemplate[] = [
  {
    id: 'giant_rat', name: 'Giant Rat', maxHp: 12, attack: 5, defense: 2, speed: 10,
    xpReward: 15, goldReward: 5, minFloor: 1, svgComponent: 'GiantRatSVG',
    lootTable: [{ itemId: 'health_potion_small', chance: 0.15 }],
  },
  {
    id: 'slime', name: 'Slime', maxHp: 18, attack: 4, defense: 6, speed: 3,
    xpReward: 20, goldReward: 8, minFloor: 1, svgComponent: 'SlimeSVG',
    lootTable: [{ itemId: 'health_potion_small', chance: 0.2 }],
  },
  {
    id: 'skeleton', name: 'Skeleton', maxHp: 25, attack: 10, defense: 5, speed: 7,
    xpReward: 35, goldReward: 15, minFloor: 1, svgComponent: 'SkeletonSVG',
    lootTable: [{ itemId: 'rusty_sword', chance: 0.1 }, { itemId: 'health_potion_small', chance: 0.15 }],
  },
  {
    id: 'goblin', name: 'Goblin', maxHp: 20, attack: 8, defense: 4, speed: 12,
    xpReward: 30, goldReward: 20, minFloor: 2, svgComponent: 'GoblinSVG',
    lootTable: [{ itemId: 'dagger', chance: 0.1 }, { itemId: 'health_potion_small', chance: 0.2 }],
  },
  {
    id: 'giant_spider', name: 'Giant Spider', maxHp: 30, attack: 12, defense: 6, speed: 11,
    xpReward: 45, goldReward: 18, minFloor: 2, svgComponent: 'GiantSpiderSVG',
    lootTable: [{ itemId: 'antidote', chance: 0.3 }],
  },
  {
    id: 'dark_mage', name: 'Dark Mage', maxHp: 22, attack: 16, defense: 4, speed: 9,
    xpReward: 55, goldReward: 30, minFloor: 3, svgComponent: 'DarkMageSVG',
    lootTable: [{ itemId: 'mana_potion', chance: 0.25 }, { itemId: 'apprentice_staff', chance: 0.08 }],
  },
  {
    id: 'troll', name: 'Troll', maxHp: 55, attack: 14, defense: 10, speed: 5,
    xpReward: 70, goldReward: 35, minFloor: 3, svgComponent: 'TrollSVG',
    lootTable: [{ itemId: 'iron_sword', chance: 0.1 }, { itemId: 'health_potion', chance: 0.2 }],
  },
  {
    id: 'wraith', name: 'Wraith', maxHp: 35, attack: 18, defense: 3, speed: 13,
    xpReward: 80, goldReward: 40, minFloor: 4, svgComponent: 'WraithSVG',
    lootTable: [{ itemId: 'mana_potion', chance: 0.3 }, { itemId: 'silver_ring', chance: 0.1 }, { itemId: 'phoenix_feather', chance: 0.05 }],
  },
  {
    id: 'mimic', name: 'Mimic', maxHp: 40, attack: 15, defense: 12, speed: 8,
    xpReward: 65, goldReward: 60, minFloor: 3, svgComponent: 'MimicSVG',
    lootTable: [{ itemId: 'health_potion', chance: 0.4 }, { itemId: 'iron_armor', chance: 0.15 }],
  },
  {
    id: 'dragon', name: 'Dragon', maxHp: 150, attack: 28, defense: 18, speed: 10,
    xpReward: 500, goldReward: 200, minFloor: 5, svgComponent: 'DragonSVG',
    lootTable: [{ itemId: 'dragon_sword', chance: 0.2 }, { itemId: 'dragon_shield', chance: 0.15 }, { itemId: 'phoenix_feather', chance: 0.15 }],
  },
  {
    id: 'wyvern', name: 'Wyvern', maxHp: 75, attack: 20, defense: 10, speed: 14,
    xpReward: 120, goldReward: 55, minFloor: 4, svgComponent: 'WyvernSVG',
    lootTable: [{ itemId: 'wyvern_lance', chance: 0.1 }, { itemId: 'wyvern_armor', chance: 0.08 }, { itemId: 'health_potion', chance: 0.25 }],
  },
  {
    id: 'lich', name: 'Lich', maxHp: 90, attack: 30, defense: 8, speed: 9,
    xpReward: 200, goldReward: 100, minFloor: 5, svgComponent: 'LichSVG',
    lootTable: [{ itemId: 'lich_staff', chance: 0.12 }, { itemId: 'lich_phylactery', chance: 0.08 }, { itemId: 'mana_potion_large', chance: 0.3 }, { itemId: 'phoenix_feather', chance: 0.1 }],
  },
  {
    id: 'demon', name: 'Demon', maxHp: 180, attack: 35, defense: 20, speed: 11,
    xpReward: 400, goldReward: 150, minFloor: 6, svgComponent: 'DemonSVG',
    lootTable: [{ itemId: 'demon_blade', chance: 0.12 }, { itemId: 'demon_amulet', chance: 0.1 }, { itemId: 'health_potion_large', chance: 0.25 }, { itemId: 'revive_potion', chance: 0.06 }],
  },
  {
    id: 'death_knight', name: 'Death Knight', maxHp: 140, attack: 26, defense: 22, speed: 7,
    xpReward: 300, goldReward: 120, minFloor: 6, svgComponent: 'DeathKnightSVG',
    lootTable: [{ itemId: 'death_knight_armor', chance: 0.1 }, { itemId: 'iron_sword', chance: 0.2 }, { itemId: 'health_potion_large', chance: 0.2 }],
  },
  {
    id: 'elder_dragon', name: 'Elder Dragon', maxHp: 300, attack: 40, defense: 25, speed: 12,
    xpReward: 1000, goldReward: 500, minFloor: 8, svgComponent: 'ElderDragonSVG',
    lootTable: [{ itemId: 'elder_dragon_shield', chance: 0.15 }, { itemId: 'dragon_sword', chance: 0.25 }, { itemId: 'health_potion_large', chance: 0.4 }, { itemId: 'revive_potion', chance: 0.12 }],
  },
  {
    id: 'mad_wizard', name: 'The Mad Wizard', maxHp: 400, attack: 45, defense: 20, speed: 14,
    xpReward: 2000, goldReward: 1000, minFloor: 999, svgComponent: 'MadWizardSVG',
    lootTable: [{ itemId: 'health_potion_large', chance: 1.0 }, { itemId: 'revive_potion', chance: 0.5 }],
  },
];

export function getMonstersForFloor(floor: number): MonsterTemplate[] {
  return MONSTER_TEMPLATES.filter(m => m.minFloor <= floor);
}

export function spawnMonster(template: MonsterTemplate, floorScale = 1): Monster {
  const scale = 1 + (floorScale - 1) * 0.15;
  return {
    ...template,
    hp: Math.floor(template.maxHp * scale),
    maxHp: Math.floor(template.maxHp * scale),
    attack: Math.floor(template.attack * scale),
    defense: Math.floor(template.defense * scale),
  };
}

export function getMonsterTemplate(id: string): MonsterTemplate | undefined {
  return MONSTER_TEMPLATES.find(m => m.id === id);
}
