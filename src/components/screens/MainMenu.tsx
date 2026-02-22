import { useGameStore } from '../../stores/gameStore';
import Button from '../ui/Button';
import TitleLogo from '../svg/screens/TitleLogo';

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
      <TitleLogo />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
        <Button onClick={() => setScreen('intro')} size="lg">
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
