import type { Item } from '../types';

const TYPE_ORDER: Record<Item['type'], number> = { weapon: 0, armor: 1, accessory: 2, consumable: 3, key: 4 };

export function sortInventory(items: Item[], by: 'type' | 'name' | 'value'): Item[] {
  const copy = [...items];
  if (by === 'type') {
    copy.sort((a, b) => TYPE_ORDER[a.type] - TYPE_ORDER[b.type] || a.name.localeCompare(b.name));
  } else if (by === 'name') {
    copy.sort((a, b) => a.name.localeCompare(b.name) || TYPE_ORDER[a.type] - TYPE_ORDER[b.type]);
  } else {
    copy.sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
  }
  return copy;
}
