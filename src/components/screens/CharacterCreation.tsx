import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import type { CharacterClass } from '../../types';
import { CLASS_DEFINITIONS } from '../../data/classes';
import { CharacterPortrait } from '../svg/characters';
import Button from '../ui/Button';

interface PartySlot {
  name: string;
  characterClass: CharacterClass;
}

const DEFAULT_PARTY: PartySlot[] = [
  { name: 'Aldric', characterClass: 'warrior' },
  { name: 'Elara', characterClass: 'mage' },
  { name: 'Shade', characterClass: 'rogue' },
  { name: 'Mira', characterClass: 'cleric' },
];

const CLASSES: CharacterClass[] = ['warrior', 'mage', 'rogue', 'cleric'];

export default function CharacterCreation() {
  const [partySlots, setPartySlots] = useState<PartySlot[]>(DEFAULT_PARTY);
  const initNewGame = useGameStore(s => s.initNewGame);
  const setScreen = useGameStore(s => s.setScreen);

  const updateSlot = (index: number, update: Partial<PartySlot>) => {
    setPartySlots(prev => prev.map((s, i) => i === index ? { ...s, ...update } : s));
  };

  const canStart = partySlots.every(s => s.name.trim().length > 0);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: 24,
      background: 'linear-gradient(180deg, #0a0a15 0%, #1a1a2e 50%, #0a0a15 100%)',
      fontFamily: 'monospace', color: '#ddd',
    }}>
      <h2 style={{ color: '#aaccff', fontSize: 22, margin: 0 }}>Assemble Your Party</h2>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {partySlots.map((slot, i) => {
          const cls = CLASS_DEFINITIONS[slot.characterClass];
          return (
            <div
              key={i}
              style={{
                width: 180, padding: 16, background: '#1a1a2e',
                border: '1px solid #3a3a5a', borderRadius: 8,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <CharacterPortrait characterClass={slot.characterClass} size={64} />

              <input
                value={slot.name}
                onChange={e => updateSlot(i, { name: e.target.value })}
                maxLength={12}
                style={{
                  width: '100%', padding: '4px 8px', background: '#0a0a15',
                  border: '1px solid #3a3a5a', borderRadius: 4, color: '#ddd',
                  fontFamily: 'monospace', fontSize: 14, textAlign: 'center',
                }}
                placeholder="Name"
              />

              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                {CLASSES.map(c => (
                  <button
                    key={c}
                    onClick={() => updateSlot(i, { characterClass: c })}
                    style={{
                      padding: '2px 6px', fontSize: 10, fontFamily: 'monospace',
                      background: slot.characterClass === c ? '#2a4a8a' : '#2a2a3a',
                      color: slot.characterClass === c ? '#aaccff' : '#888',
                      border: `1px solid ${slot.characterClass === c ? '#4a6aaa' : '#3a3a4a'}`,
                      borderRadius: 3, cursor: 'pointer',
                    }}
                  >
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: 10, color: '#888', textAlign: 'center', lineHeight: 1.4 }}>
                {cls.description}
              </div>

              <div style={{ fontSize: 9, color: '#667' }}>
                HP:{cls.baseStats.maxHp} MP:{cls.baseStats.maxMp} ATK:{cls.baseStats.attack} DEF:{cls.baseStats.defense} SPD:{cls.baseStats.speed}
              </div>

              <div style={{
                fontSize: 9, color: cls.defaultRow === 'front' ? '#aa8844' : '#44aa88',
                background: '#0a0a15', padding: '1px 6px', borderRadius: 3,
              }}>
                {cls.defaultRow === 'front' ? 'Front Row' : 'Back Row'}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => setScreen('main_menu')} variant="secondary">Back</Button>
        <Button onClick={() => initNewGame(partySlots)} disabled={!canStart} size="lg">
          Enter the Dungeon
        </Button>
      </div>
    </div>
  );
}
