import type { Character, Monster, CombatEntity, Spell, Item } from '../types';
import { rollDice } from '../utils/random';

export function buildTurnOrder(party: Character[], monsters: Monster[]): CombatEntity[] {
  const entities: CombatEntity[] = [
    ...party.filter(c => c.alive).map(c => ({
      id: c.id, name: c.name, isMonster: false, speed: c.stats.speed + (c.equipment.accessory?.speed || 0),
    })),
    ...monsters.map((m, i) => ({
      id: `monster_${i}`, name: m.name, isMonster: true, speed: m.speed,
    })),
  ];
  return entities.sort((a, b) => b.speed - a.speed);
}

export function calculateDamage(attackerAtk: number, defenderDef: number): number {
  const base = Math.max(1, attackerAtk - defenderDef / 2);
  const variance = Math.max(1, Math.floor(base * 0.2));
  return base + rollDice(variance) - Math.floor(variance / 2);
}

export function getEffectiveAttack(char: Character): number {
  let atk = char.stats.attack;
  if (char.equipment.weapon?.attack) atk += char.equipment.weapon.attack;
  if (char.equipment.accessory?.attack) atk += char.equipment.accessory.attack;
  return atk;
}

export function getEffectiveDefense(char: Character): number {
  let def = char.stats.defense;
  if (char.equipment.armor?.defense) def += char.equipment.armor.defense;
  if (char.equipment.accessory?.defense) def += char.equipment.accessory.defense;
  return def;
}

export function performAttack(attacker: { attack: number; name: string }, defender: { defense: number; hp: number; maxHp: number; name: string }): { damage: number; log: string } {
  const dmg = calculateDamage(attacker.attack, defender.defense);
  defender.hp = Math.max(0, defender.hp - dmg);
  return { damage: dmg, log: `${attacker.name} attacks ${defender.name} for ${dmg} damage!` };
}

export function performSpell(caster: Character, spell: Spell, targets: (Monster | Character)[]): string[] {
  const logs: string[] = [];
  caster.stats.mp -= spell.manaCost;

  if (spell.damage) {
    for (const target of targets) {
      const isMonster = 'maxHp' in target && !('characterClass' in target);
      const tgt = isMonster ? (target as Monster) : (target as Character).stats;
      const def = isMonster ? (target as Monster).defense : getEffectiveDefense(target as Character);
      const dmg = Math.max(1, spell.damage + Math.floor(caster.stats.level * 1.5) - def / 3);
      tgt.hp = Math.max(0, tgt.hp - dmg);
      const name = isMonster ? (target as Monster).name : (target as Character).name;
      logs.push(`${caster.name} casts ${spell.name} on ${name} for ${dmg} damage!`);
    }
  }

  if (spell.healing) {
    for (const target of targets) {
      const char = target as Character;
      if (!char.alive) continue;
      const heal = spell.healing + Math.floor(caster.stats.level * 2);
      char.stats.hp = Math.min(char.stats.maxHp, char.stats.hp + heal);
      logs.push(`${caster.name} casts ${spell.name} on ${char.name}, restoring ${heal} HP!`);
    }
  }

  if (spell.id === 'barrier') {
    logs.push(`${caster.name} casts Barrier! Party defense is raised!`);
  }

  return logs;
}

export function applyItem(item: Item, target: Character): string {
  if (item.reviveAmount && !target.alive) {
    target.alive = true;
    const restored = Math.max(1, Math.floor(target.stats.maxHp * item.reviveAmount));
    target.stats.hp = restored;
    return `${item.name} revives ${target.name} with ${restored} HP!`;
  }
  if (item.healAmount) {
    target.stats.hp = Math.min(target.stats.maxHp, target.stats.hp + item.healAmount);
    return `${target.name} uses ${item.name}, restoring ${item.healAmount} HP!`;
  }
  if (item.manaAmount) {
    target.stats.mp = Math.min(target.stats.maxMp, target.stats.mp + item.manaAmount);
    return `${target.name} uses ${item.name}, restoring ${item.manaAmount} MP!`;
  }
  return `${target.name} uses ${item.name}.`;
}

export function monsterAI(monster: Monster, party: Character[]): { targetIndex: number; log: string } {
  const aliveParty = party.filter(c => c.alive);
  const frontRow = aliveParty.filter(c => c.row === 'front');
  const targets = frontRow.length > 0 ? frontRow : aliveParty;
  const target = targets[Math.floor(Math.random() * targets.length)];
  const targetIndex = party.indexOf(target);
  const def = getEffectiveDefense(target);
  const dmg = calculateDamage(monster.attack, def);
  target.stats.hp = Math.max(0, target.stats.hp - dmg);
  if (target.stats.hp <= 0) target.alive = false;
  return {
    targetIndex,
    log: `${monster.name} attacks ${target.name} for ${dmg} damage!${target.stats.hp <= 0 ? ` ${target.name} falls!` : ''}`,
  };
}

export function canFlee(partySpeed: number, monsterSpeed: number): boolean {
  const chance = 0.4 + (partySpeed - monsterSpeed) * 0.05;
  return Math.random() < Math.max(0.1, Math.min(0.9, chance));
}

export function calculateXpReward(monsters: Monster[]): number {
  return monsters.reduce((sum, m) => sum + m.xpReward, 0);
}

export function calculateGoldReward(monsters: Monster[]): number {
  return monsters.reduce((sum, m) => sum + m.goldReward, 0);
}
