import type { Item } from '../types';
import { getItem } from './items';

interface ShopTier {
  minFloor: number;
  itemIds: string[];
}

const SHOP_TIERS: ShopTier[] = [
  { minFloor: 1, itemIds: ['health_potion_small', 'antidote', 'dungeon_key'] },
  { minFloor: 1, itemIds: ['health_potion', 'mana_potion', 'tent'] },
  { minFloor: 2, itemIds: ['rusty_sword', 'dagger', 'leather_armor'] },
  { minFloor: 2, itemIds: ['apprentice_staff', 'mage_robe'] },
  { minFloor: 3, itemIds: ['iron_sword', 'iron_armor', 'silver_ring'] },
  { minFloor: 3, itemIds: ['health_potion_large', 'mana_potion_large'] },
  { minFloor: 4, itemIds: ['phoenix_feather'] },
  { minFloor: 5, itemIds: ['wyvern_lance', 'wyvern_armor'] },
  { minFloor: 6, itemIds: ['revive_potion'] },
];

const BUY_MARKUP = 1.5;
const SELL_RATIO = 0.4;

export function getTraderStock(floor: number): Item[] {
  const items: Item[] = [];
  for (const tier of SHOP_TIERS) {
    if (tier.minFloor > floor) continue;
    for (const id of tier.itemIds) {
      const item = getItem(id);
      if (item) items.push(item);
    }
  }
  return items;
}

export function getBuyPrice(item: Item): number {
  return Math.ceil(item.value * BUY_MARKUP);
}

export function getSellPrice(item: Item): number {
  if (item.value <= 0) return 0;
  return Math.max(1, Math.floor(item.value * SELL_RATIO));
}
