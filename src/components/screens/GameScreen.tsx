import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useGameStore } from '../../stores/gameStore';
import DungeonView from '../dungeon/DungeonView';
import PartyBar from '../hud/PartyBar';
import MiniMap from '../hud/MiniMap';
import MessageLog from '../hud/MessageLog';
import Button from '../ui/Button';

const CombatScreen = lazy(() => import('../combat/CombatScreen'));
const InventoryPanel = lazy(() => import('../hud/InventoryPanel'));

function SaveLoadPanel({ onClose }: { onClose: () => void }) {
  const saveGame = useGameStore(s => s.saveGame);
  const loadGame = useGameStore(s => s.loadGame);
  const deleteSave = useGameStore(s => s.deleteSave);
  const slots = useGameStore(s => s.getSaveSlots)();

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60,
    }} onClick={onClose}>
      <div
        style={{
          background: '#1a1a2e', border: '2px solid #3a3a5a', borderRadius: 8,
          padding: 20, minWidth: 320, color: '#ddd', fontFamily: 'monospace',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 16, color: '#aaccff', marginBottom: 16 }}>Load / Manage Saves</div>
        {slots.map(slot => (
          <div key={slot.id} style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
            padding: 8, background: '#0f0f1a', borderRadius: 4,
          }}>
            <div style={{ flex: 1, fontSize: 12 }}>
              <div>Slot {slot.id}</div>
              {slot.exists ? (
                <div style={{ fontSize: 10, color: '#888' }}>
                  {slot.playerName} - Floor {slot.floor}
                </div>
              ) : (
                <div style={{ fontSize: 10, color: '#555' }}>Empty</div>
              )}
            </div>
            <Button size="sm" onClick={() => { saveGame(slot.id); onClose(); }}>Save</Button>
            {slot.exists && (
              <>
                <Button size="sm" variant="secondary" onClick={() => { loadGame(slot.id); onClose(); }}>Load</Button>
                <Button size="sm" variant="danger" onClick={() => deleteSave(slot.id)}>Del</Button>
              </>
            )}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <Button variant="secondary" onClick={onClose}>Close (Esc)</Button>
        </div>
      </div>
    </div>
  );
}

export default function GameScreen() {
  const moveForward = useGameStore(s => s.moveForward);
  const moveBackward = useGameStore(s => s.moveBackward);
  const turnPlayerLeft = useGameStore(s => s.turnPlayerLeft);
  const turnPlayerRight = useGameStore(s => s.turnPlayerRight);
  const goDownstairs = useGameStore(s => s.goDownstairs);
  const combat = useGameStore(s => s.combat);
  const currentFloor = useGameStore(s => s.currentFloor);
  const facing = useGameStore(s => s.facing);
  const position = useGameStore(s => s.position);
  const setScreen = useGameStore(s => s.setScreen);

  const saveGame = useGameStore(s => s.saveGame);

  const [showInventory, setShowInventory] = useState(false);
  const [showSaveLoad, setShowSaveLoad] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);

  const handleQuickSave = useCallback(() => {
    saveGame(1);
  }, [saveGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowInventory(false);
      setShowSaveLoad(false);
      setShowStartOver(false);
      return;
    }

    if (combat.active || showInventory || showSaveLoad || showStartOver) return;

    switch (e.key) {
      case 'F5': e.preventDefault(); handleQuickSave(); break;
      case 'F9': e.preventDefault(); setShowSaveLoad(true); break;
      default:
        switch (e.key.toLowerCase()) {
          case 'w': case 'arrowup': moveForward(); break;
          case 's': case 'arrowdown': moveBackward(); break;
          case 'a': case 'arrowleft': turnPlayerLeft(); break;
          case 'd': case 'arrowright': turnPlayerRight(); break;
          case ' ': e.preventDefault(); goDownstairs(); break;
          case 'i': setShowInventory(true); break;
        }
    }
  }, [combat.active, showInventory, showSaveLoad, showStartOver, moveForward, moveBackward, turnPlayerLeft, turnPlayerRight, goDownstairs, handleQuickSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#0a0a15', fontFamily: 'monospace', color: '#ddd',
    }}>
      {/* Main dungeon view */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 12, gap: 8 }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '4px 8px', background: '#1a1a2e', borderRadius: 4,
        }}>
          <span style={{ fontSize: 12, color: '#667' }}>
            Floor {currentFloor} | {facing === 'N' ? 'North' : facing === 'S' ? 'South' : facing === 'E' ? 'East' : 'West'} | ({position.x}, {position.y})
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button size="sm" variant="secondary" onClick={() => setShowInventory(true)}>
              Inventory (I)
            </Button>
            <Button size="sm" onClick={handleQuickSave}>
              Save (F5)
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowSaveLoad(true)}>
              Load (F9)
            </Button>
            <Button size="sm" variant="danger" onClick={() => setShowStartOver(true)}>
              Start Over
            </Button>
          </div>
        </div>

        {/* Dungeon viewport */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 600 }}>
            <DungeonView />
          </div>
        </div>

        {/* Movement controls for touch/click */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Button size="sm" variant="secondary" onClick={turnPlayerLeft}>← Turn</Button>
          <Button size="sm" onClick={moveForward}>↑ Forward</Button>
          <Button size="sm" variant="secondary" onClick={moveBackward}>↓ Back</Button>
          <Button size="sm" variant="secondary" onClick={turnPlayerRight}>Turn →</Button>
        </div>

        {/* Message log */}
        <MessageLog />
      </div>

      {/* Right sidebar */}
      <div style={{
        width: 220, padding: 12, background: '#0f0f1a',
        borderLeft: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', gap: 12,
        overflow: 'auto',
      }}>
        <MiniMap />
        <PartyBar />
      </div>

      {/* Overlays */}
      <Suspense fallback={null}>
        {combat.active && <CombatScreen />}
        {showInventory && <InventoryPanel onClose={() => setShowInventory(false)} />}
      </Suspense>
      {showSaveLoad && <SaveLoadPanel onClose={() => setShowSaveLoad(false)} />}

      {showStartOver && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60,
        }} onClick={() => setShowStartOver(false)}>
          <div
            style={{
              background: '#1a1a2e', border: '2px solid #3a3a5a', borderRadius: 8,
              padding: 24, minWidth: 280, color: '#ddd', fontFamily: 'monospace',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 16, color: '#ff8888', marginBottom: 12 }}>Start Over?</div>
            <div style={{ fontSize: 12, color: '#999', marginBottom: 20 }}>
              Unsaved progress will be lost. Make sure to save first!
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Button variant="danger" onClick={() => { setShowStartOver(false); setScreen('main_menu'); }}>
                Yes, Start Over
              </Button>
              <Button variant="secondary" onClick={() => setShowStartOver(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
