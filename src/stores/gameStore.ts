import { create } from 'zustand';
import type {
  Character, Item, Direction, Position, DungeonFloor,
  Monster, CombatEntity, GameScreen, MessageLogEntry,
  GameSave, SaveSlot, CombatAction, Spell,
} from '../types';
import { CLASS_DEFINITIONS, calculateXpToNext } from '../data/classes';
import { generateDungeon, getStartPosition } from '../systems/dungeonGenerator';
import { getMonstersForFloor, spawnMonster, getMonsterTemplate } from '../data/monsters';
import { getChestLoot, getChestGold, rollLoot } from '../systems/lootTable';
import { getBuyPrice, getSellPrice } from '../data/trader';
import { getItem } from '../data/items';
import {
  buildTurnOrder, getEffectiveAttack,
  performAttack, performSpell, monsterAI, canFlee,
  calculateXpReward, calculateGoldReward, applyItem,
} from '../systems/combatEngine';
import { turnLeft, turnRight, moveInDirection } from '../utils/direction';
import { generateSeed } from '../utils/random';
import { SeededRandom } from '../utils/random';
import { playFootstep, playChest, playCombatStart, playVictory, playDefeat, playLevelUp } from '../systems/audioEngine';

const SAVE_KEY = 'dungeon_crawler_saves';

interface GameState {
  // App state
  screen: GameScreen;
  setScreen: (screen: GameScreen) => void;

  // Party
  party: Character[];
  inventory: Item[];
  gold: number;

  // Dungeon
  dungeonSeed: number;
  currentFloor: number;
  dungeon: DungeonFloor | null;
  position: Position;
  facing: Direction;
  exploredMaps: Record<number, boolean[][]>;

  // Combat
  combat: {
    active: boolean;
    monsters: Monster[];
    turnOrder: CombatEntity[];
    currentTurn: number;
    log: string[];
    victory: boolean;
    defeat: boolean;
    selectedAction: CombatAction | null;
    selectedSpell: Spell | null;
    selectedItem: Item | null;
    targetingMode: 'enemy' | 'ally' | 'dead_ally' | null;
    barrierActive: boolean;
    defendingIds: Set<string>;
    animating: boolean;
  };

  // Messages
  messages: MessageLogEntry[];
  addMessage: (text: string, type?: MessageLogEntry['type']) => void;

  // Playtime
  playtime: number;
  startTime: number;

  maxFloor: number;

  // Actions
  initNewGame: (partySetup: { name: string; characterClass: string }[], maxFloor: number) => void;
  moveForward: () => void;
  moveBackward: () => void;
  turnPlayerLeft: () => void;
  turnPlayerRight: () => void;
  goDownstairs: () => void;
  interact: () => void;

  // Combat actions
  startCombat: () => void;
  startBossFight: () => void;
  selectAction: (action: CombatAction) => void;
  cancelAction: () => void;
  selectSpell: (spell: Spell) => void;
  selectCombatItem: (item: Item) => void;
  executePlayerAction: (targetIndex: number) => void;
  advanceTurn: () => void;
  processMonsterTurns: () => void;
  endCombat: () => void;

  // Inventory
  equipItem: (characterId: string, item: Item) => void;
  applyItemOutOfCombat: (characterId: string, item: Item) => void;

  // Rest
  resting: boolean;
  restWithTent: (item: Item) => void;

  // Trader
  showTrader: boolean;
  setShowTrader: (show: boolean) => void;
  buyItem: (itemId: string) => void;
  sellItem: (item: Item) => void;

  // Save/Load
  saveGame: (slotId: number) => void;
  loadGame: (slotId: number) => void;
  getSaveSlots: () => SaveSlot[];
  deleteSave: (slotId: number) => void;
}

function createCharacter(name: string, characterClass: string, index: number): Character {
  const cls = CLASS_DEFINITIONS[characterClass as keyof typeof CLASS_DEFINITIONS];
  return {
    id: `char_${index}`,
    name,
    characterClass: cls.characterClass,
    stats: { ...cls.baseStats },
    row: cls.defaultRow,
    equipment: {},
    alive: true,
  };
}

function exploreAround(map: boolean[][], x: number, y: number, width: number, height: number) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        map[ny][nx] = true;
      }
    }
  }
}

function createExploredMap(width: number, height: number): boolean[][] {
  return Array.from({ length: height }, () => Array(width).fill(false));
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'main_menu',
  setScreen: (screen) => set({ screen }),

  party: [],
  inventory: [],
  gold: 0,

  dungeonSeed: 0,
  currentFloor: 1,
  maxFloor: 10,
  dungeon: null,
  position: { x: 0, y: 0 },
  facing: 'N',
  exploredMaps: {},

  combat: {
    active: false, monsters: [], turnOrder: [], currentTurn: 0,
    log: [], victory: false, defeat: false,
    selectedAction: null, selectedSpell: null, selectedItem: null,
    targetingMode: null, barrierActive: false,
    defendingIds: new Set(), animating: false,
  },

  messages: [],
  addMessage: (text, type = 'info') => set(state => ({
    messages: [...state.messages.slice(-50), { text, type, timestamp: Date.now() }],
  })),

  playtime: 0,
  startTime: Date.now(),

  initNewGame: (partySetup, maxFloor) => {
    const seed = generateSeed();
    const dungeon = generateDungeon(seed, 1, maxFloor);
    const startPos = getStartPosition(dungeon);
    const explored = { 1: createExploredMap(dungeon.width, dungeon.height) };
    exploreAround(explored[1], startPos.x, startPos.y, dungeon.width, dungeon.height);

    set({
      party: partySetup.map((p, i) => createCharacter(p.name, p.characterClass, i)),
      inventory: [],
      gold: 0,
      dungeonSeed: seed,
      currentFloor: 1,
      maxFloor,
      dungeon,
      position: startPos,
      facing: 'N',
      exploredMaps: explored,
      messages: [{ text: 'You descend into the dungeon...', type: 'system', timestamp: Date.now() }],
      screen: 'game',
      playtime: 0,
      startTime: Date.now(),
      combat: {
        active: false, monsters: [], turnOrder: [], currentTurn: 0,
        log: [], victory: false, defeat: false,
        selectedAction: null, selectedSpell: null, selectedItem: null,
        targetingMode: null, barrierActive: false,
        defendingIds: new Set(), animating: false,
      },
    });
  },

  moveForward: () => {
    const { position, facing, dungeon, exploredMaps, currentFloor } = get();
    if (!dungeon) return;
    const next = moveInDirection(position, facing);
    if (next.x < 0 || next.x >= dungeon.width || next.y < 0 || next.y >= dungeon.height) return;
    const cell = dungeon.grid[next.y][next.x];
    if (cell.type === 'wall') return;

    if (cell.type === 'door' && cell.locked) {
      const { inventory } = get();
      const keyIndex = inventory.findIndex(i => i.type === 'key');
      if (keyIndex === -1) {
        get().addMessage('The door is locked. You need a key.', 'danger');
        return;
      }
      const newInv = [...inventory];
      newInv.splice(keyIndex, 1);
      dungeon.grid[next.y][next.x].locked = false;
      set({ inventory: newInv });
      get().addMessage('You unlock the door with a key.', 'info');
    }

    const map = exploredMaps[currentFloor] || createExploredMap(dungeon.width, dungeon.height);
    exploreAround(map, next.x, next.y, dungeon.width, dungeon.height);
    set({ position: next, exploredMaps: { ...exploredMaps, [currentFloor]: map } });
    playFootstep();

    if (cell.type === 'chest') {
      const loot = getChestLoot(currentFloor);
      const chestGold = getChestGold(currentFloor);
      dungeon.grid[next.y][next.x].type = 'floor';
      set(state => ({
        inventory: [...state.inventory, ...loot],
        gold: state.gold + chestGold,
      }));
      const lootNames = loot.map(i => i.name).join(', ');
      get().addMessage(`Found a treasure chest! Got ${chestGold} gold${loot.length ? ` and ${lootNames}` : ''}.`, 'loot');
      playChest();
    }

    if (cell.type === 'trader') {
      get().addMessage('A wandering trader beckons you over...', 'info');
      set({ showTrader: true });
    }

    if (cell.type === 'stairs_down') {
      get().addMessage('You see stairs leading deeper...', 'info');
    }

    if (cell.type === 'boss') {
      get().addMessage('A dark presence fills the room... The Mad Wizard awaits!', 'danger');
    }

    if (cell.hasEncounter && !get().combat.active) {
      dungeon.grid[next.y][next.x].hasEncounter = false;
      if (Math.random() < 0.6) {
        get().startCombat();
      }
    }
  },

  moveBackward: () => {
    const { position, facing, dungeon, exploredMaps, currentFloor } = get();
    if (!dungeon) return;
    const backDir = facing === 'N' ? 'S' : facing === 'S' ? 'N' : facing === 'E' ? 'W' : 'E';
    const next = moveInDirection(position, backDir);
    if (next.x < 0 || next.x >= dungeon.width || next.y < 0 || next.y >= dungeon.height) return;
    if (dungeon.grid[next.y][next.x].type === 'wall') return;

    const map = exploredMaps[currentFloor] || createExploredMap(dungeon.width, dungeon.height);
    exploreAround(map, next.x, next.y, dungeon.width, dungeon.height);
    set({ position: next, exploredMaps: { ...exploredMaps, [currentFloor]: map } });
  },

  turnPlayerLeft: () => set(state => ({ facing: turnLeft(state.facing) })),
  turnPlayerRight: () => set(state => ({ facing: turnRight(state.facing) })),

  goDownstairs: () => {
    const { dungeon, position, dungeonSeed, currentFloor, maxFloor, exploredMaps } = get();
    if (!dungeon) return;
    if (dungeon.grid[position.y][position.x].type !== 'stairs_down') return;

    const nextFloor = currentFloor + 1;
    const newDungeon = generateDungeon(dungeonSeed, nextFloor, maxFloor);
    const startPos = getStartPosition(newDungeon);
    const map = exploredMaps[nextFloor] || createExploredMap(newDungeon.width, newDungeon.height);
    exploreAround(map, startPos.x, startPos.y, newDungeon.width, newDungeon.height);

    set({
      currentFloor: nextFloor,
      dungeon: newDungeon,
      position: startPos,
      facing: 'N',
      exploredMaps: { ...exploredMaps, [nextFloor]: map },
    });
    get().addMessage(`You descend to floor ${nextFloor}...`, 'system');

    // Auto-save
    get().saveGame(0);
  },

  interact: () => {
    const { position, facing, dungeon, currentFloor, showTrader, combat, resting } = get();
    if (!dungeon || combat.active || showTrader || resting) return;

    const ahead = moveInDirection(position, facing);
    if (ahead.x >= 0 && ahead.x < dungeon.width && ahead.y >= 0 && ahead.y < dungeon.height) {
      const cell = dungeon.grid[ahead.y][ahead.x];

      if (cell.type === 'chest') {
        const loot = getChestLoot(currentFloor);
        const chestGold = getChestGold(currentFloor);
        dungeon.grid[ahead.y][ahead.x].type = 'floor';
        set(state => ({
          inventory: [...state.inventory, ...loot],
          gold: state.gold + chestGold,
        }));
        const lootNames = loot.map(i => i.name).join(', ');
        get().addMessage(`Found a treasure chest! Got ${chestGold} gold${loot.length ? ` and ${lootNames}` : ''}.`, 'loot');
        playChest();
        return;
      }

      if (cell.type === 'trader') {
        get().addMessage('A wandering trader beckons you over...', 'info');
        set({ showTrader: true });
        return;
      }
    }

    if (dungeon.grid[ahead.y]?.[ahead.x]?.type === 'boss') {
      get().startBossFight();
      return;
    }

    const currentCell = dungeon.grid[position.y]?.[position.x];
    if (currentCell?.type === 'boss') {
      get().startBossFight();
      return;
    }
    if (currentCell?.type === 'stairs_down') {
      get().goDownstairs();
    } else if (currentCell?.type === 'trader') {
      get().addMessage('A wandering trader beckons you over...', 'info');
      set({ showTrader: true });
    } else if (currentCell?.type === 'chest') {
      const loot = getChestLoot(currentFloor);
      const chestGold = getChestGold(currentFloor);
      dungeon.grid[position.y][position.x].type = 'floor';
      set(state => ({
        inventory: [...state.inventory, ...loot],
        gold: state.gold + chestGold,
      }));
      const lootNames = loot.map(i => i.name).join(', ');
      get().addMessage(`Found a treasure chest! Got ${chestGold} gold${loot.length ? ` and ${lootNames}` : ''}.`, 'loot');
      playChest();
    }
  },

  startCombat: () => {
    const { currentFloor, party } = get();
    const templates = getMonstersForFloor(currentFloor);
    if (templates.length === 0) return;

    const rng = new SeededRandom(Date.now());
    const numMonsters = rng.nextInt(1, Math.min(4, 1 + Math.floor(currentFloor / 2)));
    const monsters: Monster[] = [];
    for (let i = 0; i < numMonsters; i++) {
      const template = rng.pick(templates);
      monsters.push(spawnMonster(template, currentFloor));
    }

    const turnOrder = buildTurnOrder(party, monsters);
    const monsterNames = monsters.map(m => m.name).join(', ');

    set({
      combat: {
        active: true, monsters, turnOrder, currentTurn: -1,
        log: [`Encountered: ${monsterNames}!`],
        victory: false, defeat: false,
        selectedAction: null, selectedSpell: null, selectedItem: null,
        targetingMode: null, barrierActive: false,
        defendingIds: new Set(), animating: false,
      },
    });
    get().addMessage(`Ambushed by ${monsterNames}!`, 'combat');
    playCombatStart();
    setTimeout(() => get().advanceTurn(), 300);
  },

  startBossFight: () => {
    const { currentFloor, party } = get();
    const template = getMonsterTemplate('mad_wizard');
    if (!template) return;
    const boss = spawnMonster(template, currentFloor);
    const turnOrder = buildTurnOrder(party, [boss]);

    set({
      combat: {
        active: true, monsters: [boss], turnOrder, currentTurn: -1,
        log: ['The Mad Wizard cackles with fury!'],
        victory: false, defeat: false,
        selectedAction: null, selectedSpell: null, selectedItem: null,
        targetingMode: null, barrierActive: false,
        defendingIds: new Set(), animating: false,
      },
    });
    get().addMessage('The Mad Wizard attacks!', 'combat');
    playCombatStart();
    setTimeout(() => get().advanceTurn(), 300);
  },

  selectAction: (action) => {
    const { combat, party } = get();
    if (action === 'flee') {
      const avgPartySpeed = party.filter(c => c.alive).reduce((s, c) => s + c.stats.speed, 0) / party.filter(c => c.alive).length;
      const avgMonsterSpeed = combat.monsters.filter(m => m.hp > 0).reduce((s, m) => s + m.speed, 0) / combat.monsters.filter(m => m.hp > 0).length;
      if (canFlee(avgPartySpeed, avgMonsterSpeed)) {
        set({
          combat: { ...combat, active: false, log: [...combat.log, 'You fled from battle!'] },
        });
        get().addMessage('You fled from battle!', 'combat');
      } else {
        set({
          combat: {
            ...combat,
            log: [...combat.log, 'Failed to flee!'],
            selectedAction: null,
          },
        });
        setTimeout(() => get().advanceTurn(), 300);
      }
      return;
    }

    if (action === 'defend') {
      const currentEntity = combat.turnOrder[combat.currentTurn];
      const newDefending = new Set(combat.defendingIds);
      newDefending.add(currentEntity.id);
      set({
        combat: {
          ...combat,
          defendingIds: newDefending,
          log: [...combat.log, `${currentEntity.name} defends!`],
          selectedAction: null,
        },
      });
      setTimeout(() => get().advanceTurn(), 200);
      return;
    }

    if (action === 'magic') {
      set({ combat: { ...combat, selectedAction: 'magic', targetingMode: null, selectedSpell: null } });
      return;
    }

    if (action === 'item') {
      set({ combat: { ...combat, selectedAction: 'item', targetingMode: null, selectedItem: null } });
      return;
    }

    set({ combat: { ...combat, selectedAction: action, targetingMode: 'enemy' } });
  },

  cancelAction: () => {
    const { combat } = get();
    set({ combat: { ...combat, selectedAction: null, selectedSpell: null, selectedItem: null, targetingMode: null } });
  },

  selectSpell: (spell) => {
    const targetingMode = spell.target.includes('enemy') ? 'enemy' as const : 'ally' as const;
    set(state => ({
      combat: { ...state.combat, selectedSpell: spell, targetingMode },
    }));
  },

  selectCombatItem: (item) => {
    const mode = item.reviveAmount ? 'dead_ally' as const : 'ally' as const;
    set(state => ({
      combat: { ...state.combat, selectedItem: item, targetingMode: mode },
    }));
  },

  executePlayerAction: (targetIndex) => {
    const state = get();
    const { combat, party, inventory } = state;
    const currentEntity = combat.turnOrder[combat.currentTurn];
    const char = party.find(c => c.id === currentEntity.id);
    if (!char) return;

    const newLog = [...combat.log];
    const newMonsters = combat.monsters.map(m => ({ ...m }));
    const newParty = party.map(c => ({ ...c, stats: { ...c.stats }, equipment: { ...c.equipment } }));
    const newInventory = [...inventory];

    if (combat.selectedAction === 'attack') {
      const monster = newMonsters[targetIndex];
      if (monster && monster.hp > 0) {
        const atk = getEffectiveAttack(char);
        const result = performAttack(
          { attack: atk, name: char.name },
          { defense: monster.defense, hp: monster.hp, maxHp: monster.maxHp, name: monster.name }
        );
        monster.hp = Math.max(0, monster.hp - result.damage);
        newLog.push(result.log);
        if (monster.hp <= 0) {
          newLog.push(`${monster.name} is defeated!`);
        }
      }
    } else if (combat.selectedAction === 'magic' && combat.selectedSpell) {
      const spell = combat.selectedSpell;
      const charRef = newParty.find(c => c.id === char.id)!;
      if (spell.target === 'single_enemy') {
        const logs = performSpell(charRef, spell, [newMonsters[targetIndex]]);
        newLog.push(...logs);
      } else if (spell.target === 'all_enemies') {
        const alive = newMonsters.filter(m => m.hp > 0);
        const logs = performSpell(charRef, spell, alive);
        newLog.push(...logs);
      } else if (spell.target === 'single_ally') {
        const logs = performSpell(charRef, spell, [newParty[targetIndex]]);
        newLog.push(...logs);
      } else if (spell.target === 'all_allies') {
        const alive = newParty.filter(c => c.alive);
        const logs = performSpell(charRef, spell, alive);
        newLog.push(...logs);
        if (spell.id === 'barrier') {
          set(s => ({ combat: { ...s.combat, barrierActive: true } }));
        }
      }
    } else if (combat.selectedAction === 'item' && combat.selectedItem) {
      const item = combat.selectedItem;
      const target = newParty[targetIndex];
      const log = applyItem(item, target);
      newLog.push(log);
      const idx = newInventory.findIndex(i => i.id === item.id);
      if (idx !== -1) newInventory.splice(idx, 1);
    }

    newMonsters.forEach(m => { if (m.hp <= 0) m.hp = 0; });

    const allMonstersDead = newMonsters.every(m => m.hp <= 0);
    if (allMonstersDead) {
      const xp = calculateXpReward(newMonsters);
      const goldReward = calculateGoldReward(newMonsters);
      const loot = rollLoot(newMonsters);
      newLog.push(`Victory! Gained ${xp} XP and ${goldReward} gold!`);

      newParty.forEach(c => {
        if (!c.alive) return;
        c.stats.xp += xp;
        while (c.stats.xp >= c.stats.xpToNext) {
          c.stats.xp -= c.stats.xpToNext;
          c.stats.level++;
          c.stats.xpToNext = calculateXpToNext(c.stats.level);
          const growth = CLASS_DEFINITIONS[c.characterClass].growthRates;
          c.stats.maxHp += growth.hp;
          c.stats.hp = c.stats.maxHp;
          c.stats.maxMp += growth.mp;
          c.stats.mp = c.stats.maxMp;
          c.stats.attack += growth.attack;
          c.stats.defense += growth.defense;
          c.stats.speed += growth.speed;
          newLog.push(`${c.name} leveled up to level ${c.stats.level}!`);
          playLevelUp();
        }
      });

      set({
        party: newParty,
        inventory: [...newInventory, ...loot],
        gold: state.gold + goldReward,
        combat: {
          ...combat, monsters: newMonsters, log: newLog,
          victory: true, selectedAction: null, selectedSpell: null,
          selectedItem: null, targetingMode: null,
        },
      });
      playVictory();
      if (loot.length > 0) {
        get().addMessage(`Loot: ${loot.map(i => i.name).join(', ')}`, 'loot');
      }
      if (newMonsters.some(m => m.id === 'mad_wizard')) {
        setTimeout(() => set({ screen: 'victory' }), 2000);
      }
      return;
    }

    set({
      party: newParty,
      inventory: newInventory,
      combat: {
        ...combat, monsters: newMonsters, log: newLog,
        currentTurn: combat.currentTurn, selectedAction: null, selectedSpell: null,
        selectedItem: null, targetingMode: null,
      },
    });

    setTimeout(() => get().advanceTurn(), 200);
  },

  advanceTurn: () => {
    const { combat, party } = get();
    const aliveMonsters = combat.monsters.filter(m => m.hp > 0);

    const turn = combat.currentTurn + 1;

    if (turn >= combat.turnOrder.length) {
      const newTurnOrder = buildTurnOrder(party, aliveMonsters);
      set({
        combat: {
          ...combat, currentTurn: -1, turnOrder: newTurnOrder,
          defendingIds: new Set(), selectedAction: null,
        },
      });
      setTimeout(() => get().advanceTurn(), 100);
      return;
    }

    const nextEntity = combat.turnOrder[turn];
    if (!nextEntity) return;

    if (!nextEntity.isMonster) {
      const char = party.find(c => c.id === nextEntity.id);
      if (!char || !char.alive) {
        set({ combat: { ...combat, currentTurn: turn } });
        setTimeout(() => get().advanceTurn(), 50);
        return;
      }
      set({ combat: { ...combat, currentTurn: turn, selectedAction: null } });
      return;
    }

    const monster = combat.monsters.find((_m, i) => `monster_${i}` === nextEntity.id);
    if (!monster || monster.hp <= 0) {
      set({ combat: { ...combat, currentTurn: turn } });
      setTimeout(() => get().advanceTurn(), 50);
      return;
    }

    const newParty = party.map(c => ({ ...c, stats: { ...c.stats }, equipment: { ...c.equipment } }));
    const newLog = [...combat.log];
    const result = monsterAI(monster, newParty);
    newLog.push(result.log);

    const allDead = newParty.every(c => !c.alive);

    set({
      party: newParty,
      combat: { ...combat, currentTurn: turn, log: newLog, defeat: allDead },
    });

    if (allDead) {
      get().addMessage('Your party has been wiped out...', 'danger');
      playDefeat();
      setTimeout(() => set({ screen: 'game_over' }), 1500);
      return;
    }

    setTimeout(() => get().advanceTurn(), 400);
  },

  processMonsterTurns: () => {
    get().advanceTurn();
  },

  endCombat: () => {
    set(state => ({
      combat: {
        active: false, monsters: [], turnOrder: [], currentTurn: 0,
        log: [], victory: false, defeat: false,
        selectedAction: null, selectedSpell: null, selectedItem: null,
        targetingMode: null, barrierActive: false,
        defendingIds: new Set(), animating: false,
      },
      messages: state.messages,
    }));
  },

  equipItem: (characterId, item) => {
    set(state => {
      const newParty = state.party.map(c => {
        if (c.id !== characterId) return c;
        const newEquip = { ...c.equipment };
        let unequipped: Item | undefined;

        if (item.type === 'weapon') {
          unequipped = newEquip.weapon;
          newEquip.weapon = item;
        } else if (item.type === 'armor') {
          unequipped = newEquip.armor;
          newEquip.armor = item;
        } else if (item.type === 'accessory') {
          unequipped = newEquip.accessory;
          newEquip.accessory = item;
        }

        const newInv = state.inventory.filter(i => i !== item);
        if (unequipped) newInv.push(unequipped);

        return { ...c, equipment: newEquip };
      });

      const newInv = state.inventory.filter(i => i !== item);
      const oldChar = state.party.find(c => c.id === characterId)!;
      let unequipped: Item | undefined;
      if (item.type === 'weapon') unequipped = oldChar.equipment.weapon;
      else if (item.type === 'armor') unequipped = oldChar.equipment.armor;
      else if (item.type === 'accessory') unequipped = oldChar.equipment.accessory;
      if (unequipped) newInv.push(unequipped);

      return { party: newParty, inventory: newInv };
    });
  },

  resting: false,

  restWithTent: (item) => {
    if (!item.restAll) return;
    const { combat } = get();
    if (combat.active) return;

    set(state => {
      const newInv = [...state.inventory];
      const idx = newInv.findIndex(i => i === item);
      if (idx !== -1) newInv.splice(idx, 1);
      const newParty = state.party.map(c => {
        if (!c.alive) return c;
        return {
          ...c,
          stats: { ...c.stats, hp: c.stats.maxHp, mp: c.stats.maxMp },
        };
      });
      return { party: newParty, inventory: newInv, resting: true };
    });
    get().addMessage('The party sets up camp and rests...', 'system');
    setTimeout(() => {
      set({ resting: false });
      get().addMessage('Everyone feels refreshed!', 'system');
    }, 3000);
  },

  showTrader: false,
  setShowTrader: (show) => set({ showTrader: show }),

  buyItem: (itemId) => {
    const item = getItem(itemId);
    if (!item) return;
    const price = getBuyPrice(item);
    const { gold } = get();
    if (gold < price) {
      get().addMessage("You can't afford that.", 'danger');
      return;
    }
    set(state => ({
      gold: state.gold - price,
      inventory: [...state.inventory, item],
    }));
    get().addMessage(`Bought ${item.name} for ${price} gold.`, 'loot');
  },

  sellItem: (item) => {
    const price = getSellPrice(item);
    if (price <= 0) {
      get().addMessage("The trader doesn't want that.", 'info');
      return;
    }
    set(state => {
      const newInv = [...state.inventory];
      const idx = newInv.findIndex(i => i === item);
      if (idx === -1) return {};
      newInv.splice(idx, 1);
      return { gold: state.gold + price, inventory: newInv };
    });
    get().addMessage(`Sold ${item.name} for ${price} gold.`, 'loot');
  },

  applyItemOutOfCombat: (characterId, item) => {
    if (item.type !== 'consumable') return;
    set(state => {
      const newParty = state.party.map(c => {
        if (c.id !== characterId) return c;
        if (item.reviveAmount && !c.alive) {
          const restored = Math.max(1, Math.floor(c.stats.maxHp * item.reviveAmount));
          return { ...c, alive: true, stats: { ...c.stats, hp: restored } };
        }
        const newStats = { ...c.stats };
        if (item.healAmount) newStats.hp = Math.min(newStats.maxHp, newStats.hp + item.healAmount);
        if (item.manaAmount) newStats.mp = Math.min(newStats.maxMp, newStats.mp + item.manaAmount);
        return { ...c, stats: newStats };
      });
      const newInv = [...state.inventory];
      const idx = newInv.findIndex(i => i.id === item.id);
      if (idx !== -1) newInv.splice(idx, 1);
      return { party: newParty, inventory: newInv };
    });
  },

  saveGame: (slotId) => {
    const state = get();
    const elapsed = Date.now() - state.startTime;
    const save: GameSave = {
      party: state.party,
      inventory: state.inventory,
      gold: state.gold,
      dungeonSeed: state.dungeonSeed,
      currentFloor: state.currentFloor,
      maxFloor: state.maxFloor,
      position: state.position,
      facing: state.facing,
      exploredMaps: state.exploredMaps,
      playtime: state.playtime + elapsed,
      timestamp: Date.now(),
    };
    const saves = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    saves[slotId] = save;
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
    if (slotId !== 0) {
      get().addMessage('Game saved!', 'system');
    }
  },

  loadGame: (slotId) => {
    const saves = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    const save: GameSave = saves[slotId];
    if (!save) return;

    const loadedMaxFloor = save.maxFloor || 10;
    const dungeon = generateDungeon(save.dungeonSeed, save.currentFloor, loadedMaxFloor);
    set({
      party: save.party,
      inventory: save.inventory,
      gold: save.gold,
      dungeonSeed: save.dungeonSeed,
      currentFloor: save.currentFloor,
      maxFloor: loadedMaxFloor,
      dungeon,
      position: save.position,
      facing: save.facing,
      exploredMaps: save.exploredMaps,
      playtime: save.playtime,
      startTime: Date.now(),
      screen: 'game',
      messages: [{ text: 'Game loaded!', type: 'system', timestamp: Date.now() }],
      combat: {
        active: false, monsters: [], turnOrder: [], currentTurn: 0,
        log: [], victory: false, defeat: false,
        selectedAction: null, selectedSpell: null, selectedItem: null,
        targetingMode: null, barrierActive: false,
        defendingIds: new Set(), animating: false,
      },
    });
  },

  getSaveSlots: () => {
    const saves = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    return [1, 2, 3].map(id => {
      const save: GameSave | undefined = saves[id];
      return {
        id,
        exists: !!save,
        playerName: save ? save.party[0]?.name || 'Unknown' : '',
        floor: save ? save.currentFloor : 0,
        playtime: save ? save.playtime : 0,
        timestamp: save ? save.timestamp : 0,
      };
    });
  },

  deleteSave: (slotId) => {
    const saves = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
    delete saves[slotId];
    localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
  },
}));
