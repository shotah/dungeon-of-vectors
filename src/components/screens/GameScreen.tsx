import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { moveInDirection } from '../../utils/direction';
import DungeonView from '../dungeon/DungeonView';
import PartyBar from '../hud/PartyBar';
import MiniMap from '../hud/MiniMap';
import MessageLog from '../hud/MessageLog';
import Button from '../ui/Button';
import RestingScene from '../svg/screens/RestingScene';

const CombatScreen = lazy(() => import('../combat/CombatScreen'));
const InventoryPanel = lazy(() => import('../hud/InventoryPanel'));
const TraderPanel = lazy(() => import('../hud/TraderPanel'));

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
  const interact = useGameStore(s => s.interact);
  const combat = useGameStore(s => s.combat);
  const currentFloor = useGameStore(s => s.currentFloor);
  const facing = useGameStore(s => s.facing);
  const position = useGameStore(s => s.position);
  const dungeon = useGameStore(s => s.dungeon);
  const setScreen = useGameStore(s => s.setScreen);
  const showTrader = useGameStore(s => s.showTrader);
  const setShowTrader = useGameStore(s => s.setShowTrader);
  const resting = useGameStore(s => s.resting);

  const onStairs = dungeon ? dungeon.grid[position.y]?.[position.x]?.type === 'stairs_down' : false;
  const onTrader = dungeon ? dungeon.grid[position.y]?.[position.x]?.type === 'trader' : false;
  const onBoss = dungeon ? dungeon.grid[position.y]?.[position.x]?.type === 'boss' : false;

  const facingCellType = (() => {
    if (!dungeon) return null;
    const ahead = moveInDirection(position, facing);
    if (ahead.x < 0 || ahead.x >= dungeon.width || ahead.y < 0 || ahead.y >= dungeon.height) return null;
    return dungeon.grid[ahead.y][ahead.x].type;
  })();

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
      setShowTrader(false);
      return;
    }

    if (combat.active || showInventory || showSaveLoad || showStartOver || showTrader || resting) return;

    switch (e.key) {
      case 'F5': e.preventDefault(); handleQuickSave(); break;
      case 'F9': e.preventDefault(); setShowSaveLoad(true); break;
      default:
        switch (e.key.toLowerCase()) {
          case 'w': case 'arrowup': moveForward(); break;
          case 's': case 'arrowdown': moveBackward(); break;
          case 'a': case 'arrowleft': turnPlayerLeft(); break;
          case 'd': case 'arrowright': turnPlayerRight(); break;
          case ' ': e.preventDefault(); interact(); break;
          case 'i': setShowInventory(true); break;
        }
    }
  }, [combat.active, showInventory, showSaveLoad, showStartOver, showTrader, resting, setShowTrader, moveForward, moveBackward, turnPlayerLeft, turnPlayerRight, interact, handleQuickSave]);

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="sm" variant="secondary" onClick={turnPlayerLeft}>← Turn</Button>
            <Button size="sm" onClick={moveForward}>↑ Forward</Button>
            <Button size="sm" variant="secondary" onClick={turnPlayerRight}>Turn →</Button>
          </div>
          <Button size="sm" variant="secondary" onClick={moveBackward}>↓ Back</Button>
          {onStairs && (
            <Button size="sm" variant="gold" onClick={goDownstairs}>⬇ Descend</Button>
          )}
          {onTrader && (
            <Button size="sm" variant="gold" onClick={() => setShowTrader(true)}>💰 Trade</Button>
          )}
          {!onStairs && !onTrader && facingCellType === 'chest' && (
            <Button size="sm" variant="gold" onClick={interact}>🗝 Open Chest</Button>
          )}
          {!onStairs && !onTrader && facingCellType === 'trader' && (
            <Button size="sm" variant="gold" onClick={interact}>💰 Trade</Button>
          )}
          {(onBoss || facingCellType === 'boss') && (
            <Button size="sm" variant="danger" onClick={interact}>⚔ Confront the Wizard</Button>
          )}
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
        {showTrader && <TraderPanel onClose={() => setShowTrader(false)} />}
      </Suspense>
      {showSaveLoad && <SaveLoadPanel onClose={() => setShowSaveLoad(false)} />}

      {resting && (
        <div style={{
          position: 'fixed', inset: 0, background: '#000',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', zIndex: 70,
          animation: 'fadeIn 0.8s ease-in',
        }}>
          <RestingScene />
          <div style={{
            color: '#daa520', fontSize: 18, fontFamily: 'monospace',
            marginTop: 16, textAlign: 'center',
          }}>
            Resting...
            <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
              The party recovers their strength.
            </div>
          </div>
        </div>
      )}

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
