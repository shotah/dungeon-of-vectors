import { useGameStore } from '../../stores/gameStore';
import Button from '../ui/Button';

export default function GameOver() {
  const setScreen = useGameStore(s => s.setScreen);
  const currentFloor = useGameStore(s => s.currentFloor);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: 24,
      background: 'linear-gradient(180deg, #1a0a0a 0%, #0a0a15 50%, #1a0a0a 100%)',
      fontFamily: 'monospace', color: '#ddd',
    }}>
      <svg width="200" height="80" viewBox="0 0 200 80">
        <defs>
          <linearGradient id="deathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="100%" stopColor="#881111" />
          </linearGradient>
        </defs>
        <text x="100" y="45" textAnchor="middle" fill="url(#deathGrad)" fontSize="32" fontWeight="bold">
          GAME OVER
        </text>
        <text x="100" y="70" textAnchor="middle" fill="#667" fontSize="12">
          Your party perished on Floor {currentFloor}
        </text>
      </svg>

      {/* Skull SVG */}
      <svg width="100" height="100" viewBox="0 0 100 100">
        <ellipse cx="50" cy="40" rx="30" ry="35" fill="#d8d0c0" stroke="#8a8070" strokeWidth="2" />
        <ellipse cx="38" cy="35" rx="8" ry="10" fill="#1a1a2e" />
        <ellipse cx="62" cy="35" rx="8" ry="10" fill="#1a1a2e" />
        <path d="M45 52 L50 58 L55 52" fill="none" stroke="#8a8070" strokeWidth="1.5" />
        <path d="M35 65 L40 72 L45 65 L50 72 L55 65 L60 72 L65 65" fill="none" stroke="#d8d0c0" strokeWidth="2" />
        <line x1="50" y1="72" x2="50" y2="95" stroke="#d8d0c0" strokeWidth="3" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="#d8d0c0" strokeWidth="3" />
      </svg>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => setScreen('main_menu')} variant="secondary" size="lg">
          Return to Menu
        </Button>
        <Button onClick={() => setScreen('character_creation')} size="lg">
          Try Again
        </Button>
      </div>
    </div>
  );
}
