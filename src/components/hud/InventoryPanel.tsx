import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { Character, Item } from '../../types';
import { ItemIcon, GoldIcon } from '../svg/items/ItemIcons';
import { CharacterPortrait } from '../svg/characters';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
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

  return (
    <Modal onClose={onClose} title="Inventory & Equipment">
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Party section */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 8 }}>Party</div>
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
                <CharacterPortrait characterClass={char.characterClass} size={32} />
                <div>
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

        {/* Inventory section */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 13, color: '#aaccff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            Items
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <GoldIcon size={14} /> <span style={{ color: '#daa520', fontSize: 12 }}>{gold}</span>
            </span>
          </div>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
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

          {/* Actions for selected item */}
          {selectedItem && selectedItem.restAll && (
            <div style={{ marginTop: 8, padding: 8, background: '#1a1a2e', borderRadius: 4 }}>
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
            <div style={{ marginTop: 8, padding: 8, background: '#1a1a2e', borderRadius: 4 }}>
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
        </div>
      </div>
    </Modal>
  );
}
