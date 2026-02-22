import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { MonsterSprite } from '../svg/monsters';
import Button from '../ui/Button';
import StatBar from '../ui/StatBar';
import { getSpellsForClass } from '../../data/spells';

export default function CombatScreen() {
  const combat = useGameStore(s => s.combat);
  const party = useGameStore(s => s.party);
  const inventory = useGameStore(s => s.inventory);
  const selectAction = useGameStore(s => s.selectAction);
  const selectSpell = useGameStore(s => s.selectSpell);
  const selectCombatItem = useGameStore(s => s.selectCombatItem);
  const executePlayerAction = useGameStore(s => s.executePlayerAction);
  const endCombat = useGameStore(s => s.endCombat);
  const logRef = useRef<HTMLDivElement>(null);
  const [selectedTarget, setSelectedTarget] = useState(0);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [combat.log]);

  useEffect(() => {
    setSelectedTarget(0);
  }, [combat.targetingMode, combat.selectedAction]);

  if (!combat.active && !combat.victory && !combat.defeat) return null;

  const currentEntity = combat.turnOrder[combat.currentTurn];
  const isPlayerTurn = currentEntity && !currentEntity.isMonster;
  const currentChar = isPlayerTurn ? party.find(c => c.id === currentEntity.id) : null;

  const consumables = inventory.filter(i => i.type === 'consumable');
  const aliveMonsters = combat.monsters.map((m, i) => ({ m, i })).filter(e => e.m.hp > 0);
  const aliveParty = party.map((c, i) => ({ c, i })).filter(e => e.c.alive);
  const spells = currentChar ? getSpellsForClass(currentChar.characterClass, currentChar.stats.level) : [];

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
        selectAction('attack');
        setSelectedTarget(0);
      } else if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < targets.length) executePlayerAction(targets[idx].i);
      }
      return;
    }

    if (combat.targetingMode === 'ally') {
      const targets = aliveParty;
      if (targets.length === 0) return;
      const clamp = (v: number) => ((v % targets.length) + targets.length) % targets.length;

      if (key === 'a' || key === 'ArrowLeft') { setSelectedTarget(i => clamp(i - 1)); }
      else if (key === 'd' || key === 'ArrowRight') { setSelectedTarget(i => clamp(i + 1)); }
      else if (key === 'Enter' || key === ' ' || key === 'w' || key === 'ArrowUp') {
        e.preventDefault();
        executePlayerAction(targets[selectedTarget].i);
      } else if (key === 'Escape' || key === 's' || key === 'ArrowDown') {
        selectAction('attack');
        setSelectedTarget(0);
      } else if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < targets.length) executePlayerAction(targets[idx].i);
      }
      return;
    }

    if (combat.selectedAction === 'magic' && !combat.selectedSpell) {
      if (key === 'Escape' || key === 's' || key === 'ArrowDown') { selectAction('attack'); return; }
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < spells.length && currentChar.stats.mp >= spells[idx].manaCost) {
          selectSpell(spells[idx]);
        }
      }
      return;
    }

    if (combat.selectedAction === 'item' && !combat.selectedItem) {
      if (key === 'Escape' || key === 's' || key === 'ArrowDown') { selectAction('attack'); return; }
      if (key >= '1' && key <= '9') {
        const idx = parseInt(key) - 1;
        if (idx < consumables.length) selectCombatItem(consumables[idx]);
      }
      return;
    }

    if (!combat.selectedAction) {
      switch (key) {
        case '1': case 'w': case 'ArrowUp': selectAction('attack'); break;
        case '2': selectAction('defend'); break;
        case '3': if (currentChar.stats.maxMp > 0) selectAction('magic'); break;
        case '4': if (consumables.length > 0) selectAction('item'); break;
        case '5': selectAction('flee'); break;
      }
    }
  }, [combat, isPlayerTurn, currentChar, aliveMonsters, aliveParty, selectedTarget,
      spells, consumables, endCombat, executePlayerAction, selectAction, selectSpell,
      selectCombatItem]);

  useEffect(() => {
    window.addEventListener('keydown', handleCombatKey);
    return () => window.removeEventListener('keydown', handleCombatKey);
  }, [handleCombatKey]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', zIndex: 50, fontFamily: 'monospace', color: '#ddd',
    }}>
      <div style={{
        width: '90%', maxWidth: 700, background: '#0f0f1a',
        border: '2px solid #3a3a5a', borderRadius: 8, overflow: 'hidden',
      }}>
        {/* Monster display */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 16, padding: 16,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
          minHeight: 160, alignItems: 'flex-end', flexWrap: 'wrap',
        }}>
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
                <MonsterSprite name={monster.svgComponent} size={100} />
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
            const isAllyHighlighted = combat.targetingMode === 'ally' && char.alive && aliveIdx === selectedTarget;
            return (
              <div
                key={char.id}
                role={combat.targetingMode === 'ally' && char.alive ? 'button' : undefined}
                tabIndex={combat.targetingMode === 'ally' && char.alive ? 0 : undefined}
                aria-label={`Target ${char.name}`}
                style={{
                  flex: 1, minWidth: 120, padding: 6, position: 'relative',
                  background: isAllyHighlighted ? '#2a3a5a' : currentEntity?.id === char.id ? '#1a2a4a' : '#1a1a2e',
                  border: `1px solid ${isAllyHighlighted ? '#ffcc44' : currentEntity?.id === char.id ? '#4a6aaa' : '#2a2a3a'}`,
                  borderRadius: 4, opacity: char.alive ? 1 : 0.4,
                  cursor: combat.targetingMode === 'ally' ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (combat.targetingMode === 'ally' && char.alive) {
                    executePlayerAction(i);
                  }
                }}
                onMouseEnter={() => {
                  if (combat.targetingMode === 'ally' && char.alive)
                    setSelectedTarget(aliveIdx >= 0 ? aliveIdx : 0);
                }}
              >
                {combat.targetingMode === 'ally' && char.alive && (
                  <div style={{
                    position: 'absolute', top: -6, left: -6, width: 18, height: 18,
                    background: isAllyHighlighted ? '#ffcc44' : '#555',
                    color: isAllyHighlighted ? '#000' : '#ddd',
                    borderRadius: '50%', fontSize: 11, fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                  }}>{aliveIdx + 1}</div>
                )}
                <div style={{ fontSize: 11, color: '#aaccff' }}>
                  {char.name} <span style={{ color: '#667' }}>Lv{char.stats.level}</span>
                </div>
                <StatBar value={char.stats.hp} max={char.stats.maxHp} height={6} color="#44aa44" showText={false} />
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
                {combat.selectedAction && ` - Select target`}
              </div>
              {!combat.selectedAction && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <Button onClick={() => selectAction('attack')} size="sm">[1] Attack</Button>
                  <Button onClick={() => selectAction('defend')} size="sm" variant="secondary">[2] Defend</Button>
                  {currentChar.stats.maxMp > 0 && (
                    <Button onClick={() => selectAction('magic')} size="sm" variant="gold">[3] Magic</Button>
                  )}
                  {consumables.length > 0 && (
                    <Button onClick={() => selectAction('item')} size="sm" variant="secondary">[4] Item</Button>
                  )}
                  <Button onClick={() => selectAction('flee')} size="sm" variant="danger">[5] Flee</Button>
                </div>
              )}
              {combat.selectedAction === 'magic' && !combat.selectedSpell && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {spells.map((spell, si) => (
                    <Button
                      key={spell.id}
                      onClick={() => selectSpell(spell)}
                      size="sm"
                      variant="gold"
                      disabled={currentChar.stats.mp < spell.manaCost}
                    >
                      [{si + 1}] {spell.name} ({spell.manaCost}MP)
                    </Button>
                  ))}
                  <Button onClick={() => selectAction('attack')} size="sm" variant="secondary">[Esc] Back</Button>
                </div>
              )}
              {combat.selectedAction === 'item' && !combat.selectedItem && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {consumables.map((item, ci) => (
                    <Button key={`${item.id}-${ci}`} onClick={() => selectCombatItem(item)} size="sm" variant="secondary">
                      [{ci + 1}] {item.name}
                    </Button>
                  ))}
                  <Button onClick={() => selectAction('attack')} size="sm" variant="secondary">[Esc] Back</Button>
                </div>
              )}
              {combat.targetingMode === 'enemy' && (
                <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>A/D to select, W/Enter to confirm, Esc to cancel</div>
              )}
              {combat.targetingMode === 'ally' && (
                <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>A/D to select, W/Enter to confirm, Esc to cancel</div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: '#888', textAlign: 'center' }}>Enemies are attacking...</div>
          )}
        </div>
      </div>
    </div>
  );
}
