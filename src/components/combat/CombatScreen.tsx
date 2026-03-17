import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { MonsterSprite } from '../svg/monsters';
import { useIsMobile } from '../../hooks/useIsMobile';
import Button from '../ui/Button';
import StatBar from '../ui/StatBar';
import { getSpellsForClass } from '../../data/spells';
import { getAbilitiesForClass } from '../../data/abilities';
import { getEffectiveAttack } from '../../systems/combatEngine';
import { ItemIcon } from '../svg/items/ItemIcons';
import { sortInventory } from '../../utils/inventorySort';
import type { Item, ItemType } from '../../types';

const FILTER_TYPES: { label: string; value: ItemType | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Heal', value: 'consumable' },
];

function CombatItemPicker({ items, onSelect, onCancel }: {
  items: Item[];
  onSelect: (item: Item) => void;
  onCancel: () => void;
}) {
  const [sortBy, setSortBy] = useState<'type' | 'name' | 'value'>('type');
  const [filter, setFilter] = useState<ItemType | 'all'>('all');
  const isMobile = useIsMobile();

  const filtered = useMemo(() => {
    const base = filter === 'all' ? items : items.filter(i => i.type === filter);
    return sortInventory(base, sortBy);
  }, [items, filter, sortBy]);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column',
      zIndex: 10, fontFamily: 'monospace', color: '#ddd', borderRadius: 8,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', borderBottom: '1px solid #3a3a5a', flexShrink: 0,
      }}>
        <span style={{ fontSize: 14, color: '#aaccff', fontWeight: 'bold' }}>Use Item</span>
        <Button size="sm" variant="secondary" onClick={onCancel}
          style={{ minHeight: 28, padding: '4px 10px' }}>Back</Button>
      </div>

      <div style={{
        display: 'flex', gap: 6, padding: '6px 12px', flexShrink: 0,
        borderBottom: '1px solid #2a2a3a', flexWrap: 'wrap', alignItems: 'center',
      }}>
        {FILTER_TYPES.map(f => (
          <button key={f.value} type="button" onClick={() => setFilter(f.value)} style={{
            fontSize: 10, padding: '2px 8px', border: `1px solid ${filter === f.value ? '#4a6aaa' : '#3a3a5a'}`,
            borderRadius: 3, background: filter === f.value ? '#2a3a5a' : '#1a1a2e',
            color: filter === f.value ? '#aaccff' : '#888', cursor: 'pointer', fontFamily: 'monospace',
          }}>{f.label}</button>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: '#667' }}>Sort:</span>
        {(['type', 'name', 'value'] as const).map(mode => (
          <button key={mode} type="button" onClick={() => setSortBy(mode)} style={{
            fontSize: 10, padding: '2px 6px', border: `1px solid ${sortBy === mode ? '#4a6aaa' : '#3a3a5a'}`,
            borderRadius: 3, background: sortBy === mode ? '#2a3a5a' : '#1a1a2e',
            color: sortBy === mode ? '#aaccff' : '#888', cursor: 'pointer', fontFamily: 'monospace',
          }}>{mode === 'type' ? 'Type' : mode === 'name' ? 'Name' : 'Value'}</button>
        ))}
      </div>

      <div style={{
        flex: 1, overflow: 'auto', padding: isMobile ? '4px 8px' : '6px 12px',
      }}>
        {filtered.length === 0 && (
          <div style={{ color: '#555', fontSize: 12, textAlign: 'center', padding: 20 }}>No items</div>
        )}
        {filtered.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            onClick={() => onSelect(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
              marginBottom: 2, borderRadius: 4, cursor: 'pointer',
              background: '#0f0f1a', border: '1px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2a3a5a'; e.currentTarget.style.borderColor = '#4a6aaa'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0f0f1a'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <ItemIcon icon={item.icon} size={22} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: '#ddd' }}>{item.name}</div>
              <div style={{ fontSize: 10, color: '#888' }}>{item.description}</div>
              {item.healAmount && <span style={{ fontSize: 10, color: '#6c6' }}>Heals {item.healAmount} HP</span>}
              {item.manaAmount && <span style={{ fontSize: 10, color: '#68c', marginLeft: item.healAmount ? 8 : 0 }}>+{item.manaAmount} MP</span>}
              {item.reviveAmount && <span style={{ fontSize: 10, color: '#db6' }}>Revive {Math.round(item.reviveAmount * 100)}% HP</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CombatScreen() {
  const combat = useGameStore(s => s.combat);
  const party = useGameStore(s => s.party);
  const inventory = useGameStore(s => s.inventory);
  const storeSelectAction = useGameStore(s => s.selectAction);
  const storeCancelAction = useGameStore(s => s.cancelAction);
  const storeSelectSpell = useGameStore(s => s.selectSpell);
  const storeSelectAbility = useGameStore(s => s.selectAbility);
  const storeSelectCombatItem = useGameStore(s => s.selectCombatItem);
  const executePlayerAction = useGameStore(s => s.executePlayerAction);
  const endCombat = useGameStore(s => s.endCombat);
  const logRef = useRef<HTMLDivElement>(null);
  const [selectedTarget, setSelectedTarget] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [combat.log]);

  const currentEntity = combat.turnOrder[combat.currentTurn];
  const isPlayerTurn = currentEntity && !currentEntity.isMonster;
  const currentChar = isPlayerTurn ? party.find(c => c.id === currentEntity.id) : null;

  const consumables = useMemo(() => inventory.filter(i => i.type === 'consumable'), [inventory]);
  const aliveMonsters = useMemo(() => combat.monsters.map((m, i) => ({ m, i })).filter(e => e.m.hp > 0), [combat.monsters]);
  const aliveParty = useMemo(() => party.map((c, i) => ({ c, i })).filter(e => e.c.alive), [party]);
  const deadParty = useMemo(() => party.map((c, i) => ({ c, i })).filter(e => !e.c.alive), [party]);
  const spells = useMemo(
    () => currentChar ? getSpellsForClass(currentChar.characterClass, currentChar.stats.level) : [],
    [currentChar],
  );
  const abilities = useMemo(
    () => currentChar ? getAbilitiesForClass(currentChar.characterClass, currentChar.stats.level) : [],
    [currentChar],
  );

  const handleSelectAction = useCallback((action: Parameters<typeof storeSelectAction>[0]) => {
    setSelectedTarget(0);
    storeSelectAction(action);
  }, [storeSelectAction]);

  const handleSelectSpell = useCallback((spell: Parameters<typeof storeSelectSpell>[0]) => {
    setSelectedTarget(0);
    storeSelectSpell(spell);
  }, [storeSelectSpell]);

  const handleSelectAbility = useCallback((ability: Parameters<typeof storeSelectAbility>[0]) => {
    setSelectedTarget(0);
    storeSelectAbility(ability);
  }, [storeSelectAbility]);

  const handleSelectCombatItem = useCallback((item: Parameters<typeof storeSelectCombatItem>[0]) => {
    setSelectedTarget(0);
    storeSelectCombatItem(item);
  }, [storeSelectCombatItem]);

  const handleCancel = useCallback(() => {
    setSelectedTarget(0);
    storeCancelAction();
  }, [storeCancelAction]);

  const handleCombatKey = useCallback((e: KeyboardEvent) => {
    const key = e.key;

    if (combat.victory || combat.defeat) {
      if (key === 'Enter' || key === ' ') { e.preventDefault(); endCombat(); }
      return;
    }
    if (!isPlayerTurn || !currentChar) return;

    if (combat.targetingMode === 'enemy') {
      const targets = aliveMonsters;
      if (targets.length === 0) return;
      const clamp = (v: number) => ((v % targets.length) + targets.length) % targets.length;

      if (key === 'a' || key === 'ArrowLeft') { setSelectedTarget(i => clamp(i - 1)); }
      else if (key === 'd' || key === 'ArrowRight') { setSelectedTarget(i => clamp(i + 1)); }
      else if (key === 'Enter' || key === ' ' || key === 'w' || key === 'ArrowUp') {
        e.preventDefault();
        executePlayerAction(targets[selectedTarget].i);
      } else if (key === 'Escape' || key === 's' || key === 'ArrowDown') {
        handleCancel();
      } else if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < targets.length) executePlayerAction(targets[idx].i);
      }
      return;
    }

    if (combat.targetingMode === 'ally' || combat.targetingMode === 'dead_ally') {
      const targets = combat.targetingMode === 'dead_ally' ? deadParty : aliveParty;
      if (targets.length === 0) return;
      const clamp = (v: number) => ((v % targets.length) + targets.length) % targets.length;

      if (key === 'a' || key === 'ArrowLeft') { setSelectedTarget(i => clamp(i - 1)); }
      else if (key === 'd' || key === 'ArrowRight') { setSelectedTarget(i => clamp(i + 1)); }
      else if (key === 'Enter' || key === ' ' || key === 'w' || key === 'ArrowUp') {
        e.preventDefault();
        executePlayerAction(targets[selectedTarget].i);
      } else if (key === 'Escape' || key === 's' || key === 'ArrowDown') {
        handleCancel();
      } else if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < targets.length) executePlayerAction(targets[idx].i);
      }
      return;
    }

    if (combat.selectedAction === 'magic' && !combat.selectedSpell) {
      if (key === 'Escape' || key === 's' || key === 'ArrowDown') { handleCancel(); return; }
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < spells.length && currentChar.stats.mp >= spells[idx].manaCost) {
          handleSelectSpell(spells[idx]);
        }
      }
      return;
    }

    if (combat.selectedAction === 'ability' && !combat.selectedAbility) {
      if (key === 'Escape' || key === 's' || key === 'ArrowDown') { handleCancel(); return; }
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < abilities.length) handleSelectAbility(abilities[idx]);
      }
      return;
    }

    if (combat.selectedAction === 'item' && !combat.selectedItem) {
      if (key === 'Escape' || key === 's' || key === 'ArrowDown') { handleCancel(); return; }
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < consumables.length) handleSelectCombatItem(consumables[idx]);
      }
      return;
    }

    if (!combat.selectedAction) {
      switch (key) {
        case '1': case 'w': case 'ArrowUp': handleSelectAction('attack'); break;
        case '2': handleSelectAction('defend'); break;
        case '3':
          if (spells.length > 0) handleSelectAction('magic');
          else if (abilities.length > 0) handleSelectAction('ability');
          break;
        case '4': if (consumables.length > 0) handleSelectAction('item'); break;
        case '5': handleSelectAction('flee'); break;
      }
    }
  }, [combat, isPlayerTurn, currentChar, aliveMonsters, aliveParty, deadParty, selectedTarget,
      spells, abilities, consumables, endCombat, executePlayerAction, handleSelectAction, handleCancel,
      handleSelectSpell, handleSelectAbility, handleSelectCombatItem]);

  useEffect(() => {
    window.addEventListener('keydown', handleCombatKey);
    return () => window.removeEventListener('keydown', handleCombatKey);
  }, [handleCombatKey]);

  if (!combat.active && !combat.victory && !combat.defeat) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', zIndex: 50, fontFamily: 'monospace', color: '#ddd',
    }}>
      <div style={{
        width: '90%', maxWidth: 700, background: '#0f0f1a',
        border: '2px solid #3a3a5a', borderRadius: 8, overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Monster display */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, padding: isMobile ? '8px 8px' : 16,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
          minHeight: isMobile ? 120 : 160, alignItems: 'flex-end', flexWrap: 'wrap',
          position: 'relative',
        }}>
          {isPlayerTurn && !combat.selectedAction && !combat.victory && !combat.defeat && (
            <Button
              onClick={() => handleSelectAction('flee')}
              size="sm"
              variant="danger"
              style={{ position: 'absolute', top: 6, right: 6, fontSize: 11, padding: '4px 10px', minHeight: 28, zIndex: 2 }}
              tooltip="Attempt to escape combat. Chance depends on party speed vs enemy speed."
            >Flee</Button>
          )}
          {combat.monsters.map((monster, i) => {
            const aliveIdx = aliveMonsters.findIndex(e => e.i === i);
            const isHighlighted = combat.targetingMode === 'enemy' && monster.hp > 0 && aliveIdx === selectedTarget;
            return (
              <div
                key={i}
                role={combat.targetingMode === 'enemy' && monster.hp > 0 ? 'button' : undefined}
                tabIndex={combat.targetingMode === 'enemy' && monster.hp > 0 ? 0 : undefined}
                aria-label={`Target ${monster.name}`}
                style={{
                  textAlign: 'center', opacity: monster.hp <= 0 ? 0.3 : 1,
                  cursor: combat.targetingMode === 'enemy' && monster.hp > 0 ? 'pointer' : 'default',
                  transition: 'transform 0.2s',
                  transform: isHighlighted ? 'scale(1.1)' : 'scale(1)',
                  outline: isHighlighted ? '2px solid #ffcc44' : 'none',
                  borderRadius: 4,
                  padding: 4,
                  position: 'relative',
                }}
                onClick={() => {
                  if (combat.targetingMode === 'enemy' && monster.hp > 0) {
                    executePlayerAction(i);
                  }
                }}
                onMouseEnter={() => {
                  if (combat.targetingMode === 'enemy' && monster.hp > 0)
                    setSelectedTarget(aliveIdx >= 0 ? aliveIdx : 0);
                }}
              >
                {combat.targetingMode === 'enemy' && monster.hp > 0 && (
                  <div style={{
                    position: 'absolute', top: -4, left: -4, width: 18, height: 18,
                    background: isHighlighted ? '#ffcc44' : '#555',
                    color: isHighlighted ? '#000' : '#ddd',
                    borderRadius: '50%', fontSize: 11, fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{aliveIdx + 1}</div>
                )}
                <MonsterSprite name={monster.svgComponent} size={isMobile ? 80 : 100} />
                <div style={{ fontSize: 11, marginTop: 4 }}>{monster.name}</div>
                <StatBar value={monster.hp} max={monster.maxHp} height={6} color="#cc3333" showText={false} />
              </div>
            );
          })}
        </div>

        {/* Combat log */}
        <div
          ref={logRef}
          style={{
            height: 80, overflow: 'auto', padding: '4px 12px',
            background: '#0a0a12', borderTop: '1px solid #2a2a3a',
            borderBottom: '1px solid #2a2a3a', fontSize: 11,
          }}
        >
          {combat.log.map((msg, i) => (
            <div key={i} style={{ color: msg.includes('defeated') || msg.includes('Victory') ? '#daa520' : msg.includes('damage') ? '#ff8844' : '#aaa' }}>
              {msg}
            </div>
          ))}
        </div>

        {/* Party status */}
        <div style={{ display: 'flex', gap: 8, padding: '8px 12px', flexWrap: 'wrap' }}>
          {party.map((char, i) => {
            const aliveIdx = aliveParty.findIndex(e => e.i === i);
            const deadIdx = deadParty.findIndex(e => e.i === i);
            const isAllyTarget = combat.targetingMode === 'ally' && char.alive;
            const isDeadTarget = combat.targetingMode === 'dead_ally' && !char.alive;
            const isTargetable = isAllyTarget || isDeadTarget;
            const targetIdx = isDeadTarget ? deadIdx : aliveIdx;
            const isHighlighted = isTargetable && targetIdx === selectedTarget;
            return (
              <div
                key={char.id}
                role={isTargetable ? 'button' : undefined}
                tabIndex={isTargetable ? 0 : undefined}
                aria-label={`Target ${char.name}`}
                style={{
                  flex: 1, minWidth: 120, padding: 6, position: 'relative',
                  background: isHighlighted ? '#2a3a5a' : currentEntity?.id === char.id ? '#1a2a4a' : '#1a1a2e',
                  border: `1px solid ${isHighlighted ? '#ffcc44' : currentEntity?.id === char.id ? '#4a6aaa' : '#2a2a3a'}`,
                  borderRadius: 4,
                  opacity: char.alive ? 1 : (isDeadTarget ? 0.7 : 0.4),
                  cursor: isTargetable ? 'pointer' : 'default',
                }}
                onClick={() => { if (isTargetable) executePlayerAction(i); }}
                onMouseEnter={() => {
                  if (isTargetable) setSelectedTarget(targetIdx >= 0 ? targetIdx : 0);
                }}
              >
                {isTargetable && (
                  <div style={{
                    position: 'absolute', top: -6, left: -6, width: 18, height: 18,
                    background: isHighlighted ? '#ffcc44' : '#555',
                    color: isHighlighted ? '#000' : '#ddd',
                    borderRadius: '50%', fontSize: 11, fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                  }}>{targetIdx + 1}</div>
                )}
                <div style={{ fontSize: 11, color: char.alive ? '#aaccff' : '#aa4444', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{char.name} <span style={{ color: '#667', textTransform: 'capitalize' }}>{char.characterClass}</span></span>
                  <span style={{ color: '#667' }}>{char.alive ? `Lv${char.stats.level}` : 'Dead'}</span>
                </div>
                <StatBar value={char.stats.hp} max={char.stats.maxHp} height={6} color={char.alive ? '#44aa44' : '#aa4444'} showText={false} />
                {char.stats.maxMp > 0 && (
                  <StatBar value={char.stats.mp} max={char.stats.maxMp} height={5} color="#4488cc" showText={false} />
                )}
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div style={{ padding: '8px 12px', borderTop: '1px solid #2a2a3a' }}>
          {(combat.victory || combat.defeat) ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, color: combat.victory ? '#daa520' : '#ff4444', marginBottom: 8 }}>
                {combat.victory ? 'Victory!' : 'Defeat...'}
              </div>
              <Button onClick={endCombat} variant={combat.victory ? 'gold' : 'danger'}>
                {combat.victory ? 'Continue' : 'Accept Fate'}
              </Button>
            </div>
          ) : isPlayerTurn && currentChar ? (
            <div>
              <div style={{ fontSize: 12, color: '#aaccff', marginBottom: 6 }}>
                {currentChar.name}'s turn
                {combat.targetingMode && ' - Select target'}
                {combat.selectedAction === 'magic' && !combat.selectedSpell && !combat.targetingMode && ' - Select spell'}
                {combat.selectedAction === 'ability' && !combat.selectedAbility && !combat.targetingMode && ' - Select ability'}
                {combat.selectedAction === 'item' && !combat.selectedItem && !combat.targetingMode && ' - Select item'}
              </div>
              {!combat.selectedAction && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Button onClick={() => handleSelectAction('attack')} size="sm" tooltip="Strike a single enemy with your equipped weapon.">Attack {currentChar ? getEffectiveAttack(currentChar) : ''}dmg</Button>
                  <Button onClick={() => handleSelectAction('defend')} size="sm" variant="secondary" tooltip="Skip your attack to brace for incoming damage.">Defend</Button>
                  {spells.length > 0 && (
                    <Button onClick={() => handleSelectAction('magic')} size="sm" variant="gold" tooltip="Cast a spell using MP.">Magic</Button>
                  )}
                  {spells.length === 0 && abilities.length > 0 && (
                    <Button onClick={() => handleSelectAction('ability')} size="sm" variant="gold" tooltip="Use a class ability.">Ability</Button>
                  )}
                  {consumables.length > 0 && (
                    <Button onClick={() => handleSelectAction('item')} size="sm" variant="secondary" tooltip="Use a consumable item from your inventory.">Item</Button>
                  )}
                </div>
              )}
              {combat.selectedAction === 'magic' && !combat.selectedSpell && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                  {spells.map((spell) => (
                    <Button
                      key={spell.id}
                      onClick={() => handleSelectSpell(spell)}
                      size="sm"
                      variant="gold"
                      disabled={currentChar.stats.mp < spell.manaCost}
                      tooltip={`${spell.description} [${spell.target.replace(/_/g, ' ')}]`}
                    >
                      {spell.name}{spell.damage ? ` ${spell.damage}dmg` : ''}{spell.healing ? ` ${spell.healing}hp` : ''} ({spell.manaCost}MP)
                    </Button>
                  ))}
                  <div style={{ flex: 1 }} />
                  <div style={{ flex: 1 }} />
                  <Button onClick={handleCancel} size="sm" variant="secondary">Back</Button>
                </div>
              )}
              {combat.selectedAction === 'ability' && !combat.selectedAbility && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                  {abilities.map((ability) => (
                    <Button
                      key={ability.id}
                      onClick={() => handleSelectAbility(ability)}
                      size="sm"
                      variant="gold"
                      tooltip={ability.description}
                    >
                      {ability.name}
                    </Button>
                  ))}
                  <div style={{ flex: 1 }} />
                  <Button onClick={handleCancel} size="sm" variant="secondary">Back</Button>
                </div>
              )}
              {combat.selectedAction === 'item' && !combat.selectedItem && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#888' }}>Select an item from the panel above...</span>
                  <div style={{ flex: 1 }} />
                  <Button onClick={handleCancel} size="sm" variant="secondary">Back</Button>
                </div>
              )}
              {combat.targetingMode === 'enemy' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <Button onClick={() => executePlayerAction(aliveMonsters[selectedTarget]?.i ?? 0)} size="sm">
                    {combat.selectedAbility ? combat.selectedAbility.name : 'Select'}
                  </Button>
                  {!isMobile && <span style={{ fontSize: 11, color: '#888' }}>A/D to select, Enter to confirm</span>}
                  <div style={{ flex: 1 }} />
                  <Button onClick={handleCancel} size="sm" variant="secondary">Back</Button>
                </div>
              )}
              {(combat.targetingMode === 'ally' || combat.targetingMode === 'dead_ally') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  {!isMobile && (
                    <span style={{ fontSize: 11, color: '#888' }}>
                      {combat.targetingMode === 'dead_ally' ? 'Select fallen ally: ' : ''}A/D to select, Enter to confirm
                    </span>
                  )}
                  <div style={{ flex: 1 }} />
                  <Button onClick={handleCancel} size="sm" variant="secondary">Back</Button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>Enemies are attacking...</div>
          )}
        </div>

        {combat.selectedAction === 'item' && !combat.selectedItem && (
          <CombatItemPicker
            items={consumables}
            onSelect={handleSelectCombatItem}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}
