import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { CharacterClass } from '../../types';
import { CLASS_DEFINITIONS } from '../../data/classes';
import { useIsMobile } from '../../hooks/useIsMobile';
import { CharacterPortrait } from '../svg/characters';
import Button from '../ui/Button';

interface PartySlot {
  name: string;
  characterClass: CharacterClass;
}

const ALL_CLASSES: CharacterClass[] = ['warrior', 'mage', 'rogue', 'cleric', 'ranger'];
const MAX_PARTY_SIZE = 4;

const DEFAULT_NAMES: Record<CharacterClass, string> = {
  warrior: 'Anna',
  mage: 'Elara',
  rogue: 'Shade',
  cleric: 'Mira',
  ranger: 'Fenris',
};

export default function CharacterCreation() {
  const [selected, setSelected] = useState<CharacterClass[]>(['warrior', 'mage', 'rogue', 'cleric']);
  const [names, setNames] = useState<Record<CharacterClass, string>>({ ...DEFAULT_NAMES });
  const [maxFloor, setMaxFloor] = useState(10);
  const initNewGame = useGameStore(s => s.initNewGame);
  const setScreen = useGameStore(s => s.setScreen);
  const isMobile = useIsMobile();

  const toggleClass = (c: CharacterClass) => {
    setSelected(prev => {
      if (prev.includes(c)) {
        return prev.filter(s => s !== c);
      }
      if (prev.length >= MAX_PARTY_SIZE) return prev;
      return [...prev, c];
    });
  };

  const updateName = (c: CharacterClass, name: string) => {
    setNames(prev => ({ ...prev, [c]: name }));
  };

  const partySlots: PartySlot[] = selected.map(c => ({ name: names[c], characterClass: c }));
  const canStart = selected.length === MAX_PARTY_SIZE && partySlots.every(s => s.name.trim().length > 0);

  const cardWidth = isMobile ? 155 : 170;
  const cardPad = isMobile ? 8 : 16;
  const cardGap = isMobile ? 6 : 16;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', gap: isMobile ? 10 : 24,
      padding: isMobile ? '12px 8px' : '24px 16px',
      background: 'linear-gradient(180deg, #0a0a15 0%, #1a1a2e 50%, #0a0a15 100%)',
      fontFamily: 'monospace', color: '#ddd',
    }}>
      <h2 style={{ color: '#aaccff', fontSize: isMobile ? 18 : 22, margin: 0 }}>Assemble Your Party</h2>
      <p style={{ color: '#888', fontSize: isMobile ? 11 : 12, margin: 0 }}>
        Choose {MAX_PARTY_SIZE} of {ALL_CLASSES.length} classes
      </p>

      <div style={{
        display: 'flex', gap: cardGap, flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: isMobile ? 330 : undefined,
      }}>
        {ALL_CLASSES.map(c => {
          const cls = CLASS_DEFINITIONS[c];
          const isSelected = selected.includes(c);
          const isFull = selected.length >= MAX_PARTY_SIZE && !isSelected;
          return (
            <div
              key={c}
              onClick={() => !isFull && toggleClass(c)}
              style={{
                width: cardWidth, padding: cardPad, boxSizing: 'border-box',
                background: isSelected ? '#1a1a2e' : '#111118',
                border: `2px solid ${isSelected ? '#4a6aaa' : isFull ? '#2a2a2a' : '#3a3a5a'}`,
                borderRadius: 8,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 3 : 8,
                opacity: isFull ? 0.45 : 1,
                cursor: isFull ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 4,
                  border: `2px solid ${isSelected ? '#4a8a4a' : '#555'}`,
                  background: isSelected ? '#2a5a2a' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: '#8f8',
                }}>
                  {isSelected ? '✓' : ''}
                </div>
                <div style={{
                  fontSize: 9, color: cls.defaultRow === 'front' ? '#aa8844' : '#44aa88',
                  background: '#0a0a15', padding: '1px 6px', borderRadius: 3,
                }}>
                  {cls.defaultRow === 'front' ? 'Front' : 'Back'}
                </div>
              </div>

              <CharacterPortrait characterClass={c} size={isMobile ? 40 : 64} />

              <input
                value={names[c]}
                onChange={e => { e.stopPropagation(); updateName(c, e.target.value); }}
                onClick={e => e.stopPropagation()}
                maxLength={12}
                style={{
                  width: '100%', padding: '4px 8px', background: '#0a0a15',
                  border: `1px solid ${isSelected ? '#4a6aaa' : '#3a3a5a'}`, borderRadius: 4, color: '#ddd',
                  fontFamily: 'monospace', fontSize: isMobile ? 12 : 14, textAlign: 'center',
                }}
                placeholder="Name"
              />

              <div style={{ fontSize: isMobile ? 12 : 13, color: isSelected ? '#aaccff' : '#777', fontWeight: 'bold' }}>
                {cls.name}
              </div>

              {!isMobile && (
                <div style={{ fontSize: 10, color: '#888', textAlign: 'center', lineHeight: 1.4 }}>
                  {cls.description}
                </div>
              )}

              <div style={{ fontSize: 9, color: '#667' }}>
                HP:{cls.baseStats.maxHp} MP:{cls.baseStats.maxMp} ATK:{cls.baseStats.attack} DEF:{cls.baseStats.defense} SPD:{cls.baseStats.speed}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'flex', gap: isMobile ? 6 : 12, alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 12, color: '#888' }}>Dungeon Length:</span>
        <Button
          size="sm"
          variant={maxFloor === 5 ? 'gold' : 'secondary'}
          onClick={() => setMaxFloor(5)}
        >Short (5)</Button>
        <Button
          size="sm"
          variant={maxFloor === 10 ? 'gold' : 'secondary'}
          onClick={() => setMaxFloor(10)}
        >Standard (10)</Button>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button onClick={() => setScreen('intro')} variant="secondary">Back</Button>
        <Button onClick={() => initNewGame(partySlots, maxFloor)} disabled={!canStart} size={isMobile ? 'md' : 'lg'}>
          Enter the Dungeon
        </Button>
        {selected.length < MAX_PARTY_SIZE && (
          <span style={{ fontSize: 12, color: '#aa6644' }}>
            Pick {MAX_PARTY_SIZE - selected.length} more
          </span>
        )}
      </div>
    </div>
  );
}
