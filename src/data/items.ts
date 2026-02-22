import type { Item } from '../types';

export const ITEMS: Record<string, Item> = {
  // Weapons
  rusty_sword: {
    id: 'rusty_sword', name: 'Rusty Sword', type: 'weapon', icon: 'sword',
    description: 'A worn blade, still sharp enough to cut.', attack: 3, value: 15,
  },
  dagger: {
    id: 'dagger', name: 'Dagger', type: 'weapon', icon: 'sword',
    description: 'A quick blade favored by rogues.', attack: 4, speed: 2, value: 25,
  },
  iron_sword: {
    id: 'iron_sword', name: 'Iron Sword', type: 'weapon', icon: 'sword',
    description: 'A solid iron blade.', attack: 8, value: 60,
  },
  apprentice_staff: {
    id: 'apprentice_staff', name: 'Apprentice Staff', type: 'weapon', icon: 'staff',
    description: 'A staff humming with minor magic.', attack: 5, defense: 1, value: 45,
  },
  dragon_sword: {
    id: 'dragon_sword', name: 'Dragon Slayer', type: 'weapon', icon: 'sword',
    description: 'A legendary blade forged in dragonfire.', attack: 18, value: 500,
  },

  // Armor
  leather_armor: {
    id: 'leather_armor', name: 'Leather Armor', type: 'armor', icon: 'armor',
    description: 'Light but protective leather armor.', defense: 3, value: 30,
  },
  iron_armor: {
    id: 'iron_armor', name: 'Iron Armor', type: 'armor', icon: 'armor',
    description: 'Sturdy iron plate armor.', defense: 7, speed: -1, value: 80,
  },
  dragon_shield: {
    id: 'dragon_shield', name: 'Dragon Shield', type: 'armor', icon: 'shield',
    description: 'A shield made from dragon scales.', defense: 12, value: 400,
  },
  mage_robe: {
    id: 'mage_robe', name: 'Mage Robe', type: 'armor', icon: 'armor',
    description: 'Enchanted robes that boost magical power.', defense: 2, speed: 1, value: 50,
  },

  wyvern_lance: {
    id: 'wyvern_lance', name: 'Wyvern Lance', type: 'weapon', icon: 'sword',
    description: 'A spear tipped with a wyvern stinger.', attack: 14, speed: 1, value: 300,
  },
  lich_staff: {
    id: 'lich_staff', name: 'Lich Staff', type: 'weapon', icon: 'staff',
    description: 'A staff crackling with necrotic energy.', attack: 16, defense: 3, value: 400,
  },
  demon_blade: {
    id: 'demon_blade', name: 'Demon Blade', type: 'weapon', icon: 'sword',
    description: 'A cursed blade wreathed in hellfire.', attack: 22, value: 600,
  },
  wyvern_armor: {
    id: 'wyvern_armor', name: 'Wyvern Hide Armor', type: 'armor', icon: 'armor',
    description: 'Tough armor crafted from wyvern hide.', defense: 10, value: 250,
  },
  death_knight_armor: {
    id: 'death_knight_armor', name: 'Death Knight Armor', type: 'armor', icon: 'armor',
    description: 'Cursed plate armor that resists death itself.', defense: 15, speed: -2, value: 500,
  },
  elder_dragon_shield: {
    id: 'elder_dragon_shield', name: 'Elder Dragon Shield', type: 'armor', icon: 'shield',
    description: 'An ancient shield of immense power.', defense: 18, value: 700,
  },

  // Accessories
  silver_ring: {
    id: 'silver_ring', name: 'Silver Ring', type: 'accessory', icon: 'ring',
    description: 'A ring that slightly boosts all stats.', attack: 1, defense: 1, speed: 1, value: 75,
  },
  demon_amulet: {
    id: 'demon_amulet', name: 'Demon Amulet', type: 'accessory', icon: 'ring',
    description: 'A burning amulet that greatly boosts attack.', attack: 5, speed: 2, value: 350,
  },
  lich_phylactery: {
    id: 'lich_phylactery', name: 'Lich Phylactery', type: 'accessory', icon: 'ring',
    description: 'A soul vessel that enhances magical power.', attack: 3, defense: 3, speed: 3, value: 450,
  },

  // Consumables
  health_potion_small: {
    id: 'health_potion_small', name: 'Minor Health Potion', type: 'consumable', icon: 'potion_red',
    description: 'Restores 20 HP.', healAmount: 20, value: 10,
  },
  health_potion: {
    id: 'health_potion', name: 'Health Potion', type: 'consumable', icon: 'potion_red',
    description: 'Restores 50 HP.', healAmount: 50, value: 30,
  },
  health_potion_large: {
    id: 'health_potion_large', name: 'Greater Health Potion', type: 'consumable', icon: 'potion_red',
    description: 'Restores 120 HP.', healAmount: 120, value: 75,
  },
  mana_potion: {
    id: 'mana_potion', name: 'Mana Potion', type: 'consumable', icon: 'potion_blue',
    description: 'Restores 25 MP.', manaAmount: 25, value: 25,
  },
  mana_potion_large: {
    id: 'mana_potion_large', name: 'Greater Mana Potion', type: 'consumable', icon: 'potion_blue',
    description: 'Restores 60 MP.', manaAmount: 60, value: 60,
  },
  antidote: {
    id: 'antidote', name: 'Antidote', type: 'consumable', icon: 'potion_green',
    description: 'Cures poison.', value: 15,
  },
  phoenix_feather: {
    id: 'phoenix_feather', name: 'Phoenix Feather', type: 'consumable', icon: 'potion_gold',
    description: 'Revives a fallen ally with 50% HP.', reviveAmount: 0.5, value: 200,
  },
  revive_potion: {
    id: 'revive_potion', name: 'Revive Potion', type: 'consumable', icon: 'potion_gold',
    description: 'Revives a fallen ally with full HP.', reviveAmount: 1.0, value: 500,
  },

  // Camp
  tent: {
    id: 'tent', name: 'Tent', type: 'consumable', icon: 'tent',
    description: 'Set up camp. Fully restores HP and MP for the whole party.', restAll: true, value: 100,
  },

  // Keys
  dungeon_key: {
    id: 'dungeon_key', name: 'Dungeon Key', type: 'key', icon: 'key',
    description: 'Opens a locked door.', value: 25,
  },
};

export function getItem(id: string): Item | undefined {
  return ITEMS[id] ? { ...ITEMS[id] } : undefined;
}
