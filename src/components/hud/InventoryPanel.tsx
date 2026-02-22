import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { Character, Item } from '../../types';
import { ItemIcon, GoldIcon } from '../svg/items/ItemIcons';
import { CharacterPortrait } from '../svg/characters';
import Button from '../ui/Button';
import StatBar from '../ui/StatBar';

export default function InventoryPanel({ onClose }: { onClose: () => void }) {
  const party = useGameStore(s => s.party);
  const inventory = useGameStore(s => s.inventory);
  const gold = useGameStore(s => s.gold);
  const equipItem = useGameStore(s => s.equipItem);
  const applyItemOutOfCombat = useGameStore(s => s.applyItemOutOfCombat);
  const restWithTent = useGameStore(s => s.restWithTent);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const isMobile = useIsMobile();

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
          <div style={{ display: 'flex', gap: 4 }}>
            {(selectedItem.type === 'weapon' || selectedItem.type === 'armor' || selectedItem.type === 'accessory') && (
              <Button size="sm" onClick={() => {
                equipItem(selectedChar.id, selectedItem);
                setSelectedItem(null);
              }}>
                Equip
              </Button>
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
        </div>
      )}
    </>
  );

  const partySection = (
    <div style={{ flex: 1, minWidth: isMobile ? undefined : 200 }}>
      {!isMobile && <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 8 }}>Party</div>}
      <div style={{ maxHeight: isMobile ? undefined : undefined, overflow: 'auto' }}>
        {party.map(char => (
          <div
            key={char.id}
            onClick={() => setSelectedChar(char)}
            style={{
              padding: 8, marginBottom: 4, borderRadius: 4, cursor: 'pointer',
              background: selectedChar?.id === char.id ? '#2a3a5a' : '#1a1a2e',
              border: `1px solid ${selectedChar?.id === char.id ? '#4a6aaa' : '#2a2a3a'}`,
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
              ATK:{char.stats.attack} DEF:{char.stats.defense} SPD:{char.stats.speed}
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
    <div style={{ flex: 1, minWidth: isMobile ? undefined : 200 }}>
      <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        {!isMobile && 'Items'}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          <GoldIcon size={14} /> <span style={{ color: '#daa520', fontSize: 12 }}>{gold}</span>
        </span>
      </div>
      <div style={{ maxHeight: isMobile ? 180 : 300, overflow: 'auto' }}>
        {inventory.length === 0 && (
          <div style={{ color: '#555', fontSize: 11 }}>Empty</div>
        )}
        {inventory.map((item, i) => (
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
                onClick={() => setSelectedChar(char)}
                style={{
                  flex: 1, padding: '6px 4px', borderRadius: 4, cursor: 'pointer',
                  background: selectedChar?.id === char.id ? '#2a3a5a' : '#1a1a2e',
                  border: `1px solid ${selectedChar?.id === char.id ? '#4a6aaa' : '#2a2a3a'}`,
                  textAlign: 'center', opacity: char.alive ? 1 : 0.5,
                }}
              >
                <CharacterPortrait characterClass={char.characterClass} size={24} />
                <div style={{ fontSize: 10, color: selectedChar?.id === char.id ? '#aaccff' : '#999', marginTop: 2 }}>
                  {char.name}
                </div>
                <StatBar value={char.stats.hp} max={char.stats.maxHp} height={4} color={char.alive ? '#44aa44' : '#aa4444'} showText={false} />
                {char.stats.maxMp > 0 && (
                  <StatBar value={char.stats.mp} max={char.stats.maxMp} height={3} color="#4488cc" showText={false} />
                )}
              </div>
            ))}
          </div>

          {/* Action area under party */}
          {actionArea}

          {/* Items list */}
          <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
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
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {partySection}
          {itemsSection}
        </div>
        {actionArea}
      </div>
    </div>
  );
}
