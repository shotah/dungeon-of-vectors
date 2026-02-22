export type Direction = 'N' | 'S' | 'E' | 'W';

export type CellType = 'wall' | 'floor' | 'door' | 'stairs_up' | 'stairs_down' | 'chest' | 'start';

export interface DungeonCell {
  type: CellType;
  explored: boolean;
  hasEncounter: boolean;
  lootId?: string;
  locked?: boolean;
}

export interface DungeonFloor {
  width: number;
  height: number;
  grid: DungeonCell[][];
  floor: number;
  seed: number;
}

export interface Position {
  x: number;
  y: number;
}

export type CharacterClass = 'warrior' | 'mage' | 'rogue' | 'cleric';

export type FormationRow = 'front' | 'back';

export interface CharacterStats {
  maxHp: number;
  hp: number;
  maxMp: number;
  mp: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  xp: number;
  xpToNext: number;
}

export interface Character {
  id: string;
  name: string;
  characterClass: CharacterClass;
  stats: CharacterStats;
  row: FormationRow;
  equipment: Equipment;
  alive: boolean;
}

export interface Equipment {
  weapon?: Item;
  armor?: Item;
  accessory?: Item;
}

export type ItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'key';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  icon: string;
  attack?: number;
  defense?: number;
  speed?: number;
  healAmount?: number;
  manaAmount?: number;
  value: number;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
  manaCost: number;
  damage?: number;
  healing?: number;
  target: 'single_enemy' | 'all_enemies' | 'single_ally' | 'all_allies';
  learnedByClass: CharacterClass;
  levelRequired: number;
  element?: 'fire' | 'ice' | 'lightning' | 'holy';
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  xpReward: number;
  goldReward: number;
  lootTable: LootDrop[];
  minFloor: number;
  svgComponent: string;
}

export interface LootDrop {
  itemId: string;
  chance: number;
}

export interface CombatState {
  active: boolean;
  monsters: Monster[];
  turnOrder: CombatEntity[];
  currentTurn: number;
  log: string[];
  playerFled: boolean;
  victory: boolean;
  defeat: boolean;
  selectedAction?: CombatAction;
  selectedTarget?: number;
  animating: boolean;
}

export interface CombatEntity {
  id: string;
  name: string;
  isMonster: boolean;
  speed: number;
}

export type CombatAction = 'attack' | 'defend' | 'magic' | 'item' | 'flee';

export interface SaveSlot {
  id: number;
  exists: boolean;
  playerName: string;
  floor: number;
  playtime: number;
  timestamp: number;
}

export interface GameSave {
  party: Character[];
  inventory: Item[];
  gold: number;
  dungeonSeed: number;
  currentFloor: number;
  position: Position;
  facing: Direction;
  exploredMaps: Record<number, boolean[][]>;
  playtime: number;
  timestamp: number;
}

export type GameScreen = 'main_menu' | 'character_creation' | 'game' | 'game_over';

export interface MessageLogEntry {
  text: string;
  type: 'info' | 'combat' | 'loot' | 'danger' | 'system';
  timestamp: number;
}
