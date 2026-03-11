import { useState, useMemo } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { Character, Item } from '../../types';
import { ItemIcon, GoldIcon } from '../svg/items/ItemIcons';
import { CharacterPortrait } from '../svg/characters';
import Button from '../ui/Button';
import StatBar from '../ui/StatBar';
import { getBaseDefense, getEffectiveAttack, getEffectiveDefense } from '../../systems/combatEngine';
import { canEquipItem, getAllowedClassesLabel } from '../../data/items';
import { sortInventory } from '../../utils/inventorySort';

function getAttackWithEquipment(char: Character, overrides: { weapon?: Item | null; armor?: Item | null; accessory?: Item | null }): number {
  const c: Character = {
    ...char,
    equipment: {
      weapon: overrides.weapon !== undefined ? overrides.weapon ?? undefined : char.equipment.weapon,
      armor: overrides.armor !== undefined ? overrides.armor ?? undefined : char.equipment.armor,
      accessory: overrides.accessory !== undefined ? overrides.accessory ?? undefined : char.equipment.accessory,
    },
  };
  return getEffectiveAttack(c);
}

function getDefenseWithEquipment(char: Character, overrides: { weapon?: Item | null; armor?: Item | null; accessory?: Item | null }): number {
  const c: Character = {
    ...char,
    equipment: {
      weapon: overrides.weapon !== undefined ? overrides.weapon ?? undefined : char.equipment.weapon,
      armor: overrides.armor !== undefined ? overrides.armor ?? undefined : char.equipment.armor,
      accessory: overrides.accessory !== undefined ? overrides.accessory ?? undefined : char.equipment.accessory,
    },
  };
  return getEffectiveDefense(c);
}

function getItemStatNote(item: Item): string | null {
  if (item.type !== 'weapon' && item.type !== 'armor' && item.type !== 'accessory') return null;
  const parts: string[] = [];
  if (item.attack != null && item.attack !== 0) parts.push(`${item.attack > 0 ? '+' : ''}${item.attack} ATK`);
  if (item.defense != null && item.defense !== 0) parts.push(`${item.defense > 0 ? '+' : ''}${item.defense} DEF`);
  if (item.speed != null && item.speed !== 0) parts.push(`${item.speed > 0 ? '+' : ''}${item.speed} SPD`);
  return parts.length ? parts.join(' · ') : null;
}

export default function InventoryPanel({ onClose }: { onClose: () => void }) {
  const party = useGameStore(s => s.party);
  const inventory = useGameStore(s => s.inventory);
  const gold = useGameStore(s => s.gold);
  const equipItem = useGameStore(s => s.equipItem);
  const applyItemOutOfCombat = useGameStore(s => s.applyItemOutOfCombat);
  const restWithTent = useGameStore(s => s.restWithTent);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [sortBy, setSortBy] = useState<'type' | 'name' | 'value'>('type');
  const isMobile = useIsMobile();
  const selectedChar = selectedCharId ? party.find(c => c.id === selectedCharId) ?? null : null;
  const displayInventory = useMemo(() => sortInventory(inventory, sortBy), [inventory, sortBy]);

  const itemImpactLines = (): string[] => {
    if (!selectedItem || !selectedChar) return [];
    const lines: string[] = [];
    if (selectedItem.type === 'weapon') {
      const atkNow = getEffectiveAttack(selectedChar);
      const atkWith = getAttackWithEquipment(selectedChar, { weapon: selectedItem });
      const diff = atkWith - atkNow;
      const currentLabel = selectedChar.equipment.weapon ? selectedChar.equipment.weapon.name : 'No weapon';
      lines.push(`ATK ${atkNow} → ${atkWith} (${diff >= 0 ? '+' : ''}${diff}) vs ${currentLabel}`);
    }
    if (selectedItem.type === 'armor') {
      const defNow = getEffectiveDefense(selectedChar);
      const defWith = getDefenseWithEquipment(selectedChar, { armor: selectedItem });
      const diff = defWith - defNow;
      const currentLabel = selectedChar.equipment.armor ? selectedChar.equipment.armor.name : 'No armor';
      lines.push(`DEF ${defNow} → ${defWith} (${diff >= 0 ? '+' : ''}${diff}) vs ${currentLabel}`);
    }
    if (selectedItem.type === 'accessory') {
      const atkNow = getEffectiveAttack(selectedChar);
      const atkWith = getAttackWithEquipment(selectedChar, { accessory: selectedItem });
      const defNow = getEffectiveDefense(selectedChar);
      const defWith = getDefenseWithEquipment(selectedChar, { accessory: selectedItem });
      if (atkWith !== atkNow) lines.push(`ATK ${atkNow} → ${atkWith} (${atkWith - atkNow >= 0 ? '+' : ''}${atkWith - atkNow})`);
      if (defWith !== defNow) lines.push(`DEF ${defNow} → ${defWith} (${defWith - defNow >= 0 ? '+' : ''}${defWith - defNow})`);
      const spdNow = selectedChar.stats.agility + (selectedChar.equipment.accessory?.speed ?? 0);
      const spdWith = selectedChar.stats.agility + (selectedItem.speed ?? 0);
      if (spdWith !== spdNow) lines.push(`SPD ${spdNow} → ${spdWith} (${spdWith - spdNow >= 0 ? '+' : ''}${spdWith - spdNow})`);
      const currentLabel = selectedChar.equipment.accessory ? selectedChar.equipment.accessory.name : 'No accessory';
      if (lines.length) lines.push(`vs ${currentLabel}`);
    }
    if (selectedItem.type === 'consumable') {
      if (selectedItem.healAmount) lines.push(`Heals ${selectedItem.healAmount} HP`);
      if (selectedItem.manaAmount) lines.push(`Restores ${selectedItem.manaAmount} MP`);
      if (selectedItem.reviveAmount) lines.push(`Revives with ${Math.round((selectedItem.reviveAmount ?? 0) * 100)}% HP`);
    }
    return lines;
  };

  const actionArea = (
    <>
      {selectedItem && selectedItem.restAll && (
        <div style={{ padding: 8, background: '#0f0f1a', borderRadius: 4, borderTop: '1px solid #3a3a5a' }}>
          <div style={{ fontSize: 11, color: '#ddd', marginBottom: 6 }}>
            {selectedItem.name} — rest the whole party
          </div>
          <Button size="sm" variant="gold" onClick={() => {
            restWithTent(selectedItem);
            setSelectedItem(null);
            onClose();
          }}>
            Set Up Camp
          </Button>
        </div>
      )}
      {selectedItem && selectedChar && !selectedItem.restAll && (
        <div style={{ padding: 8, background: '#0f0f1a', borderRadius: 4, borderTop: '1px solid #3a3a5a' }}>
          <div style={{ fontSize: 11, color: '#ddd', marginBottom: 6 }}>
            {selectedItem.name} → {selectedChar.name}
          </div>
          {itemImpactLines().length > 0 && (
            <div style={{ fontSize: 11, color: '#aaccff', marginBottom: 6 }}>
              {itemImpactLines().map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            {(selectedItem.type === 'weapon' || selectedItem.type === 'armor' || selectedItem.type === 'accessory') && (
              <>
                <Button size="sm" disabled={!canEquipItem(selectedChar.characterClass, selectedItem)} onClick={() => {
                  if (canEquipItem(selectedChar.characterClass, selectedItem)) {
                    equipItem(selectedChar.id, selectedItem);
                    setSelectedItem(null);
                  }
                }}>
                  Equip
                </Button>
                {!canEquipItem(selectedChar.characterClass, selectedItem) && getAllowedClassesLabel(selectedItem) && (
                  <span style={{ fontSize: 11, color: '#b88' }}>({getAllowedClassesLabel(selectedItem)} only)</span>
                )}
              </>
            )}
            {selectedItem.type === 'consumable' && (() => {
              const isRevive = !!selectedItem.reviveAmount;
              const canUse = isRevive ? !selectedChar.alive : selectedChar.alive;
              return (
                <Button size="sm" variant={isRevive ? 'gold' : 'secondary'} disabled={!canUse} onClick={() => {
                  applyItemOutOfCombat(selectedChar.id, selectedItem);
                  setSelectedItem(null);
                }}>
                  {isRevive ? 'Revive' : 'Use'}
                </Button>
              );
            })()}
          </div>
        </div>
      )}
      {selectedItem && !selectedChar && !selectedItem.restAll && (
        <div style={{ padding: 8, background: '#0f0f1a', borderRadius: 4, borderTop: '1px solid #3a3a5a' }}>
          <div style={{ fontSize: 11, color: '#888' }}>
            {selectedItem.name} selected — tap a character above to equip/use
          </div>
          {(selectedItem.type === 'weapon' || selectedItem.type === 'armor' || selectedItem.type === 'accessory') && (
            <div style={{ fontSize: 10, color: '#667', marginTop: 4 }}>Select a character to see stat impact</div>
          )}
          {selectedItem.type === 'consumable' && (
            <div style={{ fontSize: 11, color: '#aaccff', marginTop: 4 }}>
              {selectedItem.healAmount && `Heals ${selectedItem.healAmount} HP`}
              {selectedItem.manaAmount && ` · Restores ${selectedItem.manaAmount} MP`}
              {selectedItem.reviveAmount && ` · Revives with ${Math.round((selectedItem.reviveAmount ?? 0) * 100)}% HP`}
            </div>
          )}
        </div>
      )}
    </>
  );

  const selectedCharStatsBlock = selectedChar && (
    <div style={{ padding: 8, background: '#1a1a2e', borderRadius: 4, border: '1px solid #3a3a5a', marginTop: 4 }}>
      <div style={{ fontSize: 12, color: '#aaccff', marginBottom: 6 }}>{selectedChar.name} — Stats</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: 11, color: '#ccc' }}>
        <span>ATK <strong style={{ color: '#fff' }}>{getEffectiveAttack(selectedChar)}</strong></span>
        <span>DEF <strong style={{ color: '#fff' }}>{getEffectiveDefense(selectedChar)}</strong></span>
        <span>STR {selectedChar.stats.strength}</span>
        <span>AGI {selectedChar.stats.agility}</span>
        <span>VIT {selectedChar.stats.vitality}</span>
        <span>INT {selectedChar.stats.intelligence}</span>
      </div>
      <div style={{ fontSize: 10, color: '#888', marginTop: 6 }}>
        {selectedChar.equipment.weapon ? `Weapon: ${selectedChar.equipment.weapon.name}` : 'Weapon: —'}
        {selectedChar.equipment.armor ? ` · Armor: ${selectedChar.equipment.armor.name}` : ' · Armor: —'}
        {selectedChar.equipment.accessory ? ` · Accessory: ${selectedChar.equipment.accessory.name}` : ' · Accessory: —'}
      </div>
    </div>
  );

  const partySection = (
    <div style={{ flex: 1, minWidth: isMobile ? undefined : 200 }}>
      {!isMobile && <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 8 }}>Party</div>}
      <div style={{ maxHeight: isMobile ? undefined : undefined, overflow: 'auto' }}>
        {party.map(char => (
          <div
            key={char.id}
            onClick={() => setSelectedCharId(char.id)}
            style={{
              padding: 8, marginBottom: 4, borderRadius: 4, cursor: 'pointer',
              background: selectedCharId === char.id ? '#2a3a5a' : '#1a1a2e',
              border: `1px solid ${selectedCharId === char.id ? '#4a6aaa' : '#2a2a3a'}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CharacterPortrait characterClass={char.characterClass} size={28} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: char.alive ? '#ddd' : '#aa4444' }}>
                  {char.name}{!char.alive && ' (Dead)'}
                </div>
                <div style={{ fontSize: 10, color: '#888' }}>
                  Lv{char.stats.level} {char.characterClass.charAt(0).toUpperCase() + char.characterClass.slice(1)}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 4 }}>
              <StatBar value={char.stats.hp} max={char.stats.maxHp} height={6} color="#44aa44" label="HP" />
              {char.stats.maxMp > 0 && (
                <StatBar value={char.stats.mp} max={char.stats.maxMp} height={6} color="#4488cc" label="MP" />
              )}
            </div>
            <div style={{ fontSize: 9, color: '#667', marginTop: 2 }}>
              VIT:{char.stats.vitality} INT:{char.stats.intelligence} STR:{char.stats.strength} DEF:{getBaseDefense(char)} AGI:{char.stats.agility}
            </div>
            <div style={{ fontSize: 9, color: '#667' }}>
              {char.equipment.weapon && `W: ${char.equipment.weapon.name}`}
              {char.equipment.armor && ` | A: ${char.equipment.armor.name}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const itemsSection = (
    <div style={{ flex: 1, minWidth: isMobile ? undefined : 200, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, flexWrap: 'wrap' }}>
        {!isMobile && 'Items'}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          <GoldIcon size={14} /> <span style={{ color: '#daa520', fontSize: 12 }}>{gold}</span>
        </span>
        <span style={{ display: 'inline-flex', gap: 4, marginLeft: 'auto' }}>
          <span style={{ fontSize: 10, color: '#667', alignSelf: 'center' }}>Sort:</span>
          {(['type', 'name', 'value'] as const).map(mode => (
            <button
              key={mode}
              type="button"
              onClick={() => setSortBy(mode)}
              style={{
                fontSize: 10, padding: '2px 6px', border: `1px solid ${sortBy === mode ? '#4a6aaa' : '#3a3a5a'}`,
                borderRadius: 3, background: sortBy === mode ? '#2a3a5a' : '#1a1a2e', color: sortBy === mode ? '#aaccff' : '#888',
                cursor: 'pointer', fontFamily: 'monospace',
              }}
            >
              {mode === 'type' ? 'Type' : mode === 'name' ? 'Name' : 'Value'}
            </button>
          ))}
        </span>
      </div>
      <div style={{
        overflow: 'auto',
        ...(isMobile ? { flex: 1, minHeight: 0 } : { maxHeight: 300 }),
      }}>
        {displayInventory.length === 0 && (
          <div style={{ color: '#555', fontSize: 11 }}>Empty</div>
        )}
        {displayInventory.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            onClick={() => setSelectedItem(item)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px',
              marginBottom: 2, borderRadius: 3, cursor: 'pointer',
              background: selectedItem === item ? '#2a3a5a' : 'transparent',
              border: `1px solid ${selectedItem === item ? '#4a6aaa' : 'transparent'}`,
            }}
          >
            <ItemIcon icon={item.icon} size={18} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#ddd' }}>{item.name}</div>
              <div style={{ fontSize: 9, color: '#888' }}>{item.description}</div>
              {getItemStatNote(item) && (
                <div style={{ fontSize: 9, color: '#aaccff', marginTop: 2 }}>{getItemStatNote(item)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        display: 'flex', flexDirection: 'column',
        zIndex: 100, fontFamily: 'monospace', color: '#ddd',
      }} onClick={onClose}>
        <div
          style={{
            display: 'flex', flexDirection: 'column', height: '100%',
            background: '#0f0f1a',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderBottom: '1px solid #3a3a5a',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 'bold', color: '#aaccff' }}>Inventory</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <GoldIcon size={14} /> <span style={{ color: '#daa520', fontSize: 12 }}>{gold}</span>
              </span>
            </div>
            <Button size="sm" variant="secondary" onClick={onClose} style={{ minHeight: 32, padding: '4px 12px' }}>Close</Button>
          </div>

          {/* Party selector row */}
          <div style={{
            display: 'flex', gap: 4, padding: '6px 8px',
            borderBottom: '1px solid #2a2a3a', flexShrink: 0,
          }}>
            {party.map(char => (
              <div
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                style={{
                  flex: 1, padding: '6px 4px', borderRadius: 4, cursor: 'pointer',
                  background: selectedCharId === char.id ? '#2a3a5a' : '#1a1a2e',
                  border: `1px solid ${selectedCharId === char.id ? '#4a6aaa' : '#2a2a3a'}`,
                  textAlign: 'center', opacity: char.alive ? 1 : 0.5,
                }}
              >
                <CharacterPortrait characterClass={char.characterClass} size={24} />
                <div style={{ fontSize: 10, color: selectedCharId === char.id ? '#aaccff' : '#999', marginTop: 2 }}>
                  {char.name}
                </div>
                <StatBar value={char.stats.hp} max={char.stats.maxHp} height={4} color={char.alive ? '#44aa44' : '#aa4444'} showText={false} />
                {char.stats.maxMp > 0 && (
                  <StatBar value={char.stats.mp} max={char.stats.maxMp} height={3} color="#4488cc" showText={false} />
                )}
              </div>
            ))}
          </div>

          {/* Selected character stats */}
          {selectedCharStatsBlock}

          {/* Action area under party */}
          {actionArea}

          {/* Items list - flex so it fills remaining height and scrolls */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 8 }}>
            {itemsSection}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }} onClick={onClose}>
      <div
        style={{
          background: '#1a1a2e', border: '2px solid #3a3a5a', borderRadius: 8,
          padding: 20, minWidth: 300, maxWidth: '90vw', maxHeight: '80vh',
          overflow: 'auto', color: '#ddd', fontFamily: 'monospace',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          fontSize: 18, fontWeight: 'bold', color: '#aaccff', marginBottom: 16,
          borderBottom: '1px solid #3a3a5a', paddingBottom: 8,
        }}>
          Inventory & Equipment
        </div>
        {selectedCharStatsBlock}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {partySection}
          {itemsSection}
        </div>
        {actionArea}
      </div>
    </div>
  );
}
