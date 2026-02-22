import { useGameStore } from '../../stores/gameStore';
import { CharacterPortrait } from '../svg/characters';
import StatBar from '../ui/StatBar';

export default function PartyBar() {
  const party = useGameStore(s => s.party);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {party.map(char => (
        <div
          key={char.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 8px', background: char.alive ? '#1a1a2e' : '#2a1a1a',
            border: `1px solid ${char.alive ? '#3a3a5a' : '#5a2a2a'}`,
            borderRadius: 4, opacity: char.alive ? 1 : 0.5,
          }}
        >
          <CharacterPortrait characterClass={char.characterClass} size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 11, fontFamily: 'monospace', color: '#aaccff',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {char.name} <span style={{ color: '#667' }}>Lv{char.stats.level}</span>
            </div>
            <StatBar value={char.stats.hp} max={char.stats.maxHp} color="#44aa44" height={8} label="HP" />
            {char.stats.maxMp > 0 && (
              <StatBar value={char.stats.mp} max={char.stats.maxMp} color="#4488cc" height={8} label="MP" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
