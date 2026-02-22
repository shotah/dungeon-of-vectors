import { useGameStore } from '../../stores/gameStore';
import Button from '../ui/Button';

function TitleSVG() {
  return (
    <svg width="400" height="120" viewBox="0 0 400 120">
      <defs>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffcc44" />
          <stop offset="100%" stopColor="#aa7722" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x="200" y="50" textAnchor="middle" fill="url(#titleGrad)" fontSize="36" fontFamily="monospace" fontWeight="bold" filter="url(#glow)">
        DUNGEON
      </text>
      <text x="200" y="85" textAnchor="middle" fill="url(#titleGrad)" fontSize="28" fontFamily="monospace" fontWeight="bold" filter="url(#glow)">
        OF VECTORS
      </text>
      <text x="200" y="110" textAnchor="middle" fill="#667" fontSize="12" fontFamily="monospace">
        A Dungeon Crawler in Pure SVG
      </text>
      {/* Decorative swords */}
      <g transform="translate(60, 60) rotate(-30)">
        <rect x="-2" y="-30" width="4" height="40" fill="#aaa" rx="1" />
        <rect x="-6" y="8" width="12" height="4" fill="#8B4513" rx="1" />
      </g>
      <g transform="translate(340, 60) rotate(30)">
        <rect x="-2" y="-30" width="4" height="40" fill="#aaa" rx="1" />
        <rect x="-6" y="8" width="12" height="4" fill="#8B4513" rx="1" />
      </g>
    </svg>
  );
}

export default function MainMenu() {
  const setScreen = useGameStore(s => s.setScreen);
  const loadGame = useGameStore(s => s.loadGame);
  const saveSlots = useGameStore(s => s.getSaveSlots)();
  const hasSaves = saveSlots.some(s => s.exists);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: 24,
      background: 'linear-gradient(180deg, #0a0a15 0%, #1a1a2e 50%, #0a0a15 100%)',
    }}>
      <TitleSVG />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
        <Button onClick={() => setScreen('character_creation')} size="lg">
          New Adventure
        </Button>

        {hasSaves && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ color: '#667', fontSize: 12, fontFamily: 'monospace', textAlign: 'center' }}>
              Load Save
            </div>
            {saveSlots.filter(s => s.exists).map(slot => (
              <Button
                key={slot.id}
                onClick={() => loadGame(slot.id)}
                variant="secondary"
                size="md"
              >
                Slot {slot.id}: {slot.playerName} - Floor {slot.floor}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div style={{ color: '#334', fontSize: 10, fontFamily: 'monospace', marginTop: 40 }}>
        Use WASD or Arrow Keys to move | SPACE to interact
      </div>

      <div style={{
        position: 'fixed', bottom: 8, right: 12,
        color: '#333', fontSize: 10, fontFamily: 'monospace',
      }}>
        v{__APP_VERSION__}
      </div>
    </div>
  );
}
