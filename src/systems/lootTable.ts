import type { Monster, Item } from '../types';
import { getItem } from '../data/items';

export function rollLoot(monsters: Monster[]): Item[] {
  const loot: Item[] = [];
  for (const monster of monsters) {
    for (const drop of monster.lootTable) {
      if (Math.random() < drop.chance) {
        const item = getItem(drop.itemId);
        if (item) loot.push(item);
      }
    }
  }
  return loot;
}

export function getChestLoot(floor: number): Item[] {
  const loot: Item[] = [];
  const rand = Math.random();

  if (rand < 0.4) {
    const potion = floor >= 3 ? getItem('health_potion') : getItem('health_potion_small');
    if (potion) loot.push(potion);
  }
  if (rand < 0.2) {
    const mana = getItem('mana_potion');
    if (mana) loot.push(mana);
  }

  if (floor >= 2 && rand < 0.15) {
    const weapons = ['rusty_sword', 'dagger', 'apprentice_staff'];
    const item = getItem(weapons[Math.floor(Math.random() * weapons.length)]);
    if (item) loot.push(item);
  }
  if (floor >= 3 && rand < 0.1) {
    const armor = ['leather_armor', 'iron_armor', 'mage_robe'];
    const item = getItem(armor[Math.floor(Math.random() * armor.length)]);
    if (item) loot.push(item);
  }

  if (loot.length === 0) {
    const fallback = getItem('health_potion_small');
    if (fallback) loot.push(fallback);
  }

  return loot;
}

export function getChestGold(floor: number): number {
  return Math.floor(10 + Math.random() * 20 * floor);
}
