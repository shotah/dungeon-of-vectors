import { useGameStore } from '../../stores/gameStore';
import VictoryScene from '../svg/screens/VictoryScene';
import Button from '../ui/Button';

export default function VictoryScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const currentFloor = useGameStore(s => s.currentFloor);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: 20,
      background: 'linear-gradient(180deg, #1a3a6a 0%, #0a0a15 100%)',
      fontFamily: 'monospace', color: '#ddd',
    }}>
      <VictoryScene />

      <div style={{ maxWidth: 420, textAlign: 'center' }}>
        <div style={{ fontSize: 24, color: '#ffcc44', fontWeight: 'bold', marginBottom: 12 }}>
          Victory!
        </div>
        <div style={{ fontSize: 14, color: '#ccc', lineHeight: 1.8 }}>
          The Mad Wizard has been defeated on Floor {currentFloor}!
        </div>
        <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.8, marginTop: 8 }}>
          The towns are safe once more.
          The villagers cheer as your party emerges from the dungeon.
        </div>
        <div style={{ fontSize: 16, color: '#ffcc44', marginTop: 12, fontStyle: 'italic' }}>
          And everyone lived happily ever after.
        </div>
      </div>

      <Button onClick={() => setScreen('main_menu')} size="lg">
        Return to Menu
      </Button>
    </div>
  );
}
