import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useIsMobile } from '../../hooks/useIsMobile';
import { CharacterPortrait } from '../svg/characters';
import { HP_PER_VIT, MP_PER_INT, STR_PER_PT, AGI_PER_PT } from '../../data/classes';
import { getBaseDefense, getEffectiveAttack } from '../../systems/combatEngine';
import { playLevelUp } from '../../systems/audioEngine';

type StatKey = 'vitality' | 'intelligence' | 'strength' | 'agility';
const STAT_MULTIPLIER: Record<StatKey, number> = {
  vitality: 1, intelligence: 1, strength: STR_PER_PT, agility: AGI_PER_PT,
};
const AGILITY_CLASSES = new Set(['rogue', 'ranger']);
type StatLabelDef = { key: StatKey; label: string; color: string };
const STAT_DEFS: StatLabelDef[] = [
  { key: 'vitality', label: 'VIT', color: '#44aa44' },
  { key: 'intelligence', label: 'INT', color: '#6688ff' },
  { key: 'strength', label: 'STR', color: '#cc4444' },
  { key: 'agility', label: 'AGI', color: '#44cc88' },
];

function getStatHint(key: StatKey, isAgiClass: boolean): string {
  switch (key) {
    case 'vitality': return `+${HP_PER_VIT} HP`;
    case 'intelligence': return `+${MP_PER_INT} MP`;
    case 'strength': return isAgiClass ? '+1 DEF' : `+${STR_PER_PT} dmg +1 DEF`;
    case 'agility': return isAgiClass ? `+${AGI_PER_PT} dmg +1 DEF` : '+1 DEF';
  }
}

export default function LevelUpScreen() {
  const mobile = useIsMobile();
  const pending = useGameStore(s => s.pendingLevelUps);
  const party = useGameStore(s => s.party);
  const applyLevelUp = useGameStore(s => s.applyLevelUp);

  const current = pending[0];
  const char = party.find(c => c.id === current?.characterId);

  const [alloc, setAlloc] = useState<Record<StatKey, number>>(
    { vitality: 0, intelligence: 0, strength: 0, agility: 0 },
  );

  if (!current || !char) return null;

  const isAgiClass = AGILITY_CLASSES.has(char.characterClass);
  const spent = Object.values(alloc).reduce((a, b) => a + b, 0);
  const remaining = current.pointsToSpend - spent;
  const allAssigned = remaining === 0;

  const increment = (key: StatKey) => {
    if (remaining <= 0) return;
    setAlloc(prev => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrement = (key: StatKey) => {
    if (alloc[key] <= 0) return;
    setAlloc(prev => ({ ...prev, [key]: prev[key] - 1 }));
  };

  const confirm = () => {
    if (!allAssigned) return;
    playLevelUp();
    applyLevelUp(current.characterId, alloc);
    setAlloc({ vitality: 0, intelligence: 0, strength: 0, agility: 0 });
  };

  const hpPreview = alloc.vitality * HP_PER_VIT;
  const mpPreview = alloc.intelligence * MP_PER_INT;
  const currentDef = getBaseDefense(char);
  const newDef = Math.floor((char.stats.strength + alloc.strength * STR_PER_PT + char.stats.agility + alloc.agility * AGI_PER_PT) / 2);
  const defPreview = newDef - currentDef;
  const currentAtk = getEffectiveAttack(char);
  const atkGain = isAgiClass ? alloc.agility * AGI_PER_PT : alloc.strength * STR_PER_PT;
  const currentMagic = Math.floor(char.stats.intelligence * 0.8);
  const newMagic = Math.floor((char.stats.intelligence + alloc.intelligence) * 0.8);
  const magicGain = newMagic - currentMagic;
  const cardW = mobile ? '90vw' : 380;
  const btnSize = mobile ? 44 : 34;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0a15',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: mobile ? 'flex-start' : 'center',
      paddingTop: mobile ? 24 : 0,
      overflowY: 'auto',
      fontFamily: 'monospace', color: '#ddd', zIndex: 100,
    }}>
      <div style={{
        fontSize: mobile ? 14 : 18, color: '#ffcc44', marginBottom: 8, textTransform: 'uppercase',
        letterSpacing: 2,
      }}>
        Level Up! ({pending.length} remaining)
      </div>

      <div style={{
        width: cardW, maxWidth: 400, background: '#14142a', border: '2px solid #ffcc44',
        borderRadius: 12, padding: mobile ? 14 : 24, boxSizing: 'border-box',
      }}>
        {/* Character header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <CharacterPortrait characterClass={char.characterClass} size={mobile ? 48 : 64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: mobile ? 16 : 20, fontWeight: 'bold', color: '#fff' }}>
              {char.name}
            </div>
            <div style={{ fontSize: 12, color: '#88aacc', textTransform: 'capitalize' }}>
              {char.characterClass}
            </div>
            <div style={{ fontSize: 14, color: '#ffcc44', marginTop: 2 }}>
              Level {current.newLevel}
            </div>
          </div>
        </div>

        {/* Derived stats preview */}
        <div style={{
          background: '#1a1a35', borderRadius: 8, padding: '6px 12px', marginBottom: 12,
          border: '1px solid #333', display: 'flex', flexWrap: 'wrap', gap: mobile ? '4px 12px' : '4px 16px', fontSize: 12,
        }}>
          <span style={{ color: '#44aa44' }}>
            HP {char.stats.maxHp}{hpPreview > 0 && <span style={{ fontWeight: 'bold' }}> +{hpPreview}</span>}
          </span>
          <span style={{ color: '#6688ff' }}>
            MP {char.stats.maxMp}{mpPreview > 0 && <span style={{ fontWeight: 'bold' }}> +{mpPreview}</span>}
          </span>
          <span style={{ color: '#cc4444' }}>
            ATK {currentAtk}{atkGain > 0 && <span style={{ fontWeight: 'bold' }}> +{atkGain}</span>}
          </span>
          <span style={{ color: '#bb88ff' }}>
            MAG {currentMagic}{magicGain > 0 && <span style={{ fontWeight: 'bold' }}> +{magicGain}</span>}
          </span>
          <span style={{ color: '#4488cc' }}>
            DEF {currentDef}{defPreview > 0 && <span style={{ fontWeight: 'bold' }}> +{defPreview}</span>}
          </span>
        </div>

        {/* Points remaining */}
        <div style={{
          textAlign: 'center', marginBottom: 10, fontSize: 14,
          color: allAssigned ? '#44cc44' : '#ffcc44',
        }}>
          {allAssigned
            ? 'All points assigned!'
            : `${remaining} point${remaining !== 1 ? 's' : ''} remaining`}
        </div>

        {/* Stat allocation rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {STAT_DEFS.map(({ key, label, color }) => (
            <div key={key} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#1a1a35', borderRadius: 8, padding: '5px 8px',
              border: alloc[key] > 0 ? `1px solid ${color}44` : '1px solid #2a2a3a',
            }}>
              <div style={{ width: 32, fontSize: 12, color, fontWeight: 'bold' }}>{label}</div>
              <div style={{ fontSize: 9, color: '#556', width: mobile ? 70 : 80 }}>{getStatHint(key, isAgiClass)}</div>
              <div style={{ flex: 1, fontSize: 13, color: '#aaa', textAlign: 'center' }}>
                {char.stats[key]}
                {alloc[key] > 0 && (
                  <span style={{ color, fontWeight: 'bold' }}> +{alloc[key] * STAT_MULTIPLIER[key]}</span>
                )}
              </div>
              <button
                onClick={() => decrement(key)}
                disabled={alloc[key] <= 0}
                style={{
                  width: btnSize, height: btnSize, borderRadius: 6,
                  background: alloc[key] > 0 ? '#2a1a1a' : '#1a1a1a',
                  color: alloc[key] > 0 ? '#cc6666' : '#444',
                  border: alloc[key] > 0 ? '1px solid #cc444488' : '1px solid #333',
                  fontSize: mobile ? 22 : 18, cursor: alloc[key] > 0 ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'monospace', flexShrink: 0,
                }}
              >
                −
              </button>
              <button
                onClick={() => increment(key)}
                disabled={remaining <= 0}
                style={{
                  width: btnSize, height: btnSize, borderRadius: 6,
                  background: remaining > 0 ? '#1a2a1a' : '#1a1a1a',
                  color: remaining > 0 ? '#66cc66' : '#444',
                  border: remaining > 0 ? '1px solid #44cc4488' : '1px solid #333',
                  fontSize: mobile ? 22 : 18, cursor: remaining > 0 ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'monospace', flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* Confirm button */}
        <button
          onClick={confirm}
          disabled={!allAssigned}
          style={{
            width: '100%', marginTop: 16, padding: mobile ? '14px 0' : '12px 0',
            background: allAssigned ? '#44aa44' : '#2a2a2a',
            color: allAssigned ? '#fff' : '#555',
            border: allAssigned ? '2px solid #66cc66' : '2px solid #333',
            borderRadius: 8, fontSize: 16, fontWeight: 'bold',
            cursor: allAssigned ? 'pointer' : 'default',
            fontFamily: 'monospace', letterSpacing: 1,
            transition: 'all 0.2s ease',
          }}
        >
          {pending.length > 1 && allAssigned
            ? `Confirm & Next (${pending.length - 1} more)`
            : 'Confirm'}
        </button>
      </div>
    </div>
  );
}
