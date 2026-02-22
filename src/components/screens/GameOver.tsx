import { useGameStore } from '../../stores/gameStore';
import Button from '../ui/Button';
import GameOverTitle from '../svg/screens/GameOverTitle';
import SkullIcon from '../svg/screens/SkullIcon';

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
      <GameOverTitle floor={currentFloor} />
      <SkullIcon />

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
