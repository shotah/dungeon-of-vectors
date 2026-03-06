import type { Item, CharacterClass } from '../types';

const WARRIOR_ROGUE_RANGER: CharacterClass[] = ['warrior', 'rogue', 'ranger'];
const MAGE_CLERIC: CharacterClass[] = ['mage', 'cleric'];
const WARRIOR_RANGER: CharacterClass[] = ['warrior', 'ranger'];
const ROGUE_RANGER: CharacterClass[] = ['rogue', 'ranger'];
const ROGUE_ONLY: CharacterClass[] = ['rogue'];
const CLERIC_ONLY: CharacterClass[] = ['cleric'];

const DAGGER_WEAPON_IDS = ['dagger', 'stiletto', 'assassin_blade', 'shadow_dagger'] as const;

export const ITEMS: Record<string, Item> = {
  // Weapons
  rusty_sword: {
    id: 'rusty_sword', name: 'Rusty Sword', type: 'weapon', icon: 'sword',
    description: 'A worn blade, still sharp enough to cut.', attack: 3, value: 15,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  dagger: {
    id: 'dagger', name: 'Dagger', type: 'weapon', icon: 'sword',
    description: 'A quick blade favored by rogues. Improves Assassinate.', attack: 4, speed: 2, value: 25,
    allowedClasses: ROGUE_ONLY,
  },
  stiletto: {
    id: 'stiletto', name: 'Stiletto', type: 'weapon', icon: 'sword',
    description: 'A thin blade for precise strikes. Improves Assassinate.', attack: 6, speed: 3, value: 55,
    allowedClasses: ROGUE_ONLY,
  },
  assassin_blade: {
    id: 'assassin_blade', name: "Assassin's Blade", type: 'weapon', icon: 'sword',
    description: 'A deadly blade made for the killing blow. Improves Assassinate.', attack: 11, speed: 2, value: 260,
    allowedClasses: ROGUE_ONLY,
  },
  shadow_dagger: {
    id: 'shadow_dagger', name: 'Shadow Dagger', type: 'weapon', icon: 'sword',
    description: 'A blade that strikes from the dark. Greatly improves Assassinate.', attack: 15, speed: 3, value: 450,
    allowedClasses: ROGUE_ONLY,
  },
  short_bow: {
    id: 'short_bow', name: 'Short Bow', type: 'weapon', icon: 'bow',
    description: 'A compact bow for quick shots at range.', attack: 5, speed: 2, value: 40,
    allowedClasses: ROGUE_RANGER,
  },
  iron_sword: {
    id: 'iron_sword', name: 'Iron Sword', type: 'weapon', icon: 'sword',
    description: 'A solid iron blade.', attack: 8, value: 60,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  apprentice_staff: {
    id: 'apprentice_staff', name: 'Apprentice Staff', type: 'weapon', icon: 'staff',
    description: 'A staff humming with minor magic.', attack: 5, defense: 1, value: 45,
    allowedClasses: MAGE_CLERIC,
  },
  mace: {
    id: 'mace', name: 'Mace', type: 'weapon', icon: 'mace',
    description: 'A simple blunt weapon favored by clergy in battle.', attack: 6, value: 50,
    allowedClasses: CLERIC_ONLY,
  },
  flanged_mace: {
    id: 'flanged_mace', name: 'Flanged Mace', type: 'weapon', icon: 'mace',
    description: 'A heavy mace with flanged head for crushing blows.', attack: 10, value: 120,
    allowedClasses: CLERIC_ONLY,
  },
  holy_scepter: {
    id: 'holy_scepter', name: 'Holy Scepter', type: 'weapon', icon: 'mace',
    description: 'An ornate scepter blessed for the faithful. A mace fit for ceremony and combat.', attack: 12, defense: 2, value: 280,
    allowedClasses: CLERIC_ONLY,
  },
  divine_scepter: {
    id: 'divine_scepter', name: 'Divine Scepter', type: 'weapon', icon: 'mace',
    description: 'A sacred scepter that channels divine might.', attack: 15, defense: 2, value: 420,
    allowedClasses: CLERIC_ONLY,
  },
  dragon_sword: {
    id: 'dragon_sword', name: 'Dragon Slayer', type: 'weapon', icon: 'sword',
    description: 'A legendary blade forged in dragonfire.', attack: 18, value: 500,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  long_bow: {
    id: 'long_bow', name: 'Long Bow', type: 'weapon', icon: 'bow',
    description: 'A sturdy long bow with good range and power.', attack: 9, speed: 1, value: 90,
    allowedClasses: ROGUE_RANGER,
  },
  hunters_bow: {
    id: 'hunters_bow', name: "Hunter's Bow", type: 'weapon', icon: 'bow',
    description: 'A well-crafted bow favored by trackers and scouts.', attack: 13, speed: 1, value: 280,
    allowedClasses: ROGUE_RANGER,
  },
  shadow_bow: {
    id: 'shadow_bow', name: 'Shadow Bow', type: 'weapon', icon: 'bow',
    description: 'A darkwood bow that strikes from the shadows.', attack: 17, speed: 2, value: 480,
    allowedClasses: ROGUE_RANGER,
  },

  // Armor
  leather_armor: {
    id: 'leather_armor', name: 'Leather Armor', type: 'armor', icon: 'armor',
    description: 'Light but protective leather armor.', defense: 3, value: 30,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  iron_armor: {
    id: 'iron_armor', name: 'Iron Armor', type: 'armor', icon: 'armor',
    description: 'Sturdy iron plate armor.', defense: 7, speed: -1, value: 80,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  dragon_shield: {
    id: 'dragon_shield', name: 'Dragon Shield', type: 'armor', icon: 'shield',
    description: 'A shield made from dragon scales.', defense: 12, value: 400,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  mage_robe: {
    id: 'mage_robe', name: 'Mage Robe', type: 'armor', icon: 'armor',
    description: 'Enchanted robes that boost magical power.', defense: 2, speed: 1, value: 50,
    allowedClasses: MAGE_CLERIC,
  },

  wyvern_lance: {
    id: 'wyvern_lance', name: 'Wyvern Lance', type: 'weapon', icon: 'sword',
    description: 'A spear tipped with a wyvern stinger.', attack: 14, speed: 1, value: 300,
    allowedClasses: WARRIOR_RANGER,
  },
  lich_staff: {
    id: 'lich_staff', name: 'Lich Staff', type: 'weapon', icon: 'staff',
    description: 'A staff crackling with necrotic energy.', attack: 16, defense: 3, value: 400,
    allowedClasses: MAGE_CLERIC,
  },
  demon_blade: {
    id: 'demon_blade', name: 'Demon Blade', type: 'weapon', icon: 'sword',
    description: 'A cursed blade wreathed in hellfire.', attack: 22, value: 600,
    allowedClasses: ['warrior'],
  },
  wyvern_armor: {
    id: 'wyvern_armor', name: 'Wyvern Hide Armor', type: 'armor', icon: 'armor',
    description: 'Tough armor crafted from wyvern hide.', defense: 10, value: 250,
    allowedClasses: WARRIOR_RANGER,
  },
  death_knight_armor: {
    id: 'death_knight_armor', name: 'Death Knight Armor', type: 'armor', icon: 'armor',
    description: 'Cursed plate armor that resists death itself.', defense: 15, speed: -2, value: 500,
    allowedClasses: ['warrior'],
  },
  elder_dragon_shield: {
    id: 'elder_dragon_shield', name: 'Elder Dragon Shield', type: 'armor', icon: 'shield',
    description: 'An ancient shield of immense power.', defense: 18, value: 700,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },

  // Accessories
  silver_ring: {
    id: 'silver_ring', name: 'Silver Ring', type: 'accessory', icon: 'ring',
    description: 'A ring that slightly boosts all stats.', attack: 1, defense: 1, speed: 1, value: 75,
  },
  demon_amulet: {
    id: 'demon_amulet', name: 'Demon Amulet', type: 'accessory', icon: 'ring',
    description: 'A burning amulet that greatly boosts attack.', attack: 5, speed: 2, value: 350,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  lich_phylactery: {
    id: 'lich_phylactery', name: 'Lich Phylactery', type: 'accessory', icon: 'ring',
    description: 'A soul vessel that enhances magical power.', attack: 3, defense: 3, speed: 3, value: 450,
    allowedClasses: MAGE_CLERIC,
  },
  berserker_ring: {
    id: 'berserker_ring', name: 'Berserker Ring', type: 'accessory', icon: 'ring',
    description: 'A ring that fuels fury in battle.', attack: 4, speed: 1, value: 200,
    allowedClasses: ['warrior'],
  },
  arcane_ring: {
    id: 'arcane_ring', name: 'Arcane Ring', type: 'accessory', icon: 'ring',
    description: 'A ring that channels arcane power.', attack: 2, defense: 2, value: 180,
    allowedClasses: MAGE_CLERIC,
  },
  shadow_pin: {
    id: 'shadow_pin', name: 'Shadow Cloak Pin', type: 'accessory', icon: 'ring',
    description: 'A pin that sharpens the senses and reflexes.', attack: 3, speed: 3, value: 220,
    allowedClasses: ['rogue'],
  },
  holy_pendant: {
    id: 'holy_pendant', name: 'Holy Pendant', type: 'accessory', icon: 'ring',
    description: 'A blessed symbol that fortifies body and spirit.', attack: 2, defense: 4, value: 250,
    allowedClasses: ['cleric'],
  },
  hunters_talisman: {
    id: 'hunters_talisman', name: "Hunter's Talisman", type: 'accessory', icon: 'ring',
    description: 'A talisman that steadies the hand and eye.', attack: 3, speed: 2, value: 200,
    allowedClasses: ['ranger'],
  },
  knights_crest: {
    id: 'knights_crest', name: "Knight's Crest", type: 'accessory', icon: 'ring',
    description: 'A crest worn by frontline fighters.', attack: 2, defense: 4, value: 280,
    allowedClasses: WARRIOR_RANGER,
  },
  crystal_pendant: {
    id: 'crystal_pendant', name: 'Crystal Pendant', type: 'accessory', icon: 'ring',
    description: 'A crystal that amplifies spellcasting.', attack: 4, defense: 1, value: 300,
    allowedClasses: ['mage'],
  },
  assassins_brooch: {
    id: 'assassins_brooch', name: "Assassin's Brooch", type: 'accessory', icon: 'ring',
    description: 'A brooch that favors the decisive strike.', attack: 5, speed: 1, value: 350,
    allowedClasses: ['rogue'],
  },
  ward_amulet: {
    id: 'ward_amulet', name: 'Ward Amulet', type: 'accessory', icon: 'ring',
    description: 'An amulet that wards against harm.', defense: 5, speed: 1, value: 320,
    allowedClasses: WARRIOR_ROGUE_RANGER,
  },
  spirit_ring: {
    id: 'spirit_ring', name: 'Spirit Ring', type: 'accessory', icon: 'ring',
    description: 'A ring that strengthens the bond with healing light.', defense: 3, attack: 2, value: 260,
    allowedClasses: ['cleric'],
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

/** True if the character's class is allowed to equip this item (weapon/armor/accessory). */
export function canEquipItem(characterClass: CharacterClass, item: Item): boolean {
  if (item.type !== 'weapon' && item.type !== 'armor' && item.type !== 'accessory') return false;
  if (!item.allowedClasses?.length) return true;
  return item.allowedClasses.includes(characterClass);
}

/** Human-readable list of classes that can equip this item, or empty if any. */
export function getAllowedClassesLabel(item: Item): string {
  if (!item.allowedClasses?.length) return '';
  return item.allowedClasses.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
}

/** True if this weapon is a dagger (grants Assassinate bonus when equipped). */
export function isDaggerWeapon(item: Item | undefined): boolean {
  return !!item && item.type === 'weapon' && (DAGGER_WEAPON_IDS as readonly string[]).includes(item.id);
}
