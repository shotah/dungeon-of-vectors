import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useGameStore } from '../../stores/gameStore';
import DungeonView from '../dungeon/DungeonView';
import PartyBar from '../hud/PartyBar';
import MiniMap from '../hud/MiniMap';
import MessageLog from '../hud/MessageLog';
import Button from '../ui/Button';

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
          case ' ': e.preventDefault(); goDownstairs(); break;
          case 'i': setShowInventory(true); break;
        }
    }
  }, [combat.active, showInventory, showSaveLoad, showStartOver, showTrader, resting, setShowTrader, moveForward, moveBackward, turnPlayerLeft, turnPlayerRight, goDownstairs, handleQuickSave]);

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
          <svg width="300" height="250" viewBox="0 0 300 250">
            {/* Stars */}
            {[
              [30,20],[80,40],[150,15],[220,35],[270,25],[50,60],[180,55],[250,50],
              [40,80],[120,70],[200,30],[260,65],[100,45],[160,75],[90,30],
            ].map(([sx,sy], i) => (
              <circle key={i} cx={sx} cy={sy} r={1} fill="#fff" opacity={0.6}>
                <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* Moon */}
            <circle cx="240" cy="50" r="18" fill="#eee8aa" opacity="0.8" />
            <circle cx="248" cy="46" r="15" fill="#000" />
            {/* Ground */}
            <rect x="0" y="200" width="300" height="50" fill="#2a1a0a" />
            <ellipse cx="150" cy="200" rx="140" ry="8" fill="#3a2a1a" />
            {/* Tent */}
            <polygon points="50,200 100,130 150,200" fill="#8B6914" stroke="#5C4A0A" strokeWidth="1.5" />
            <polygon points="75,200 100,140 125,200" fill="#A07818" />
            <rect x="88" y="170" width="24" height="30" fill="#5C4A0A" rx="2" />
            <line x1="100" y1="130" x2="100" y2="125" stroke="#888" strokeWidth="1.5" />
            {/* Campfire logs */}
            <rect x="180" y="192" width="40" height="6" rx="2" fill="#5C2E0A" transform="rotate(-15 200 195)" />
            <rect x="185" y="190" width="35" height="6" rx="2" fill="#6B3410" transform="rotate(10 200 193)" />
            {/* Fire */}
            <ellipse cx="200" cy="180" rx="18" ry="25" fill="#ff4400" opacity="0.7">
              <animate attributeName="ry" values="25;30;22;28;25" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.9;0.6;0.8;0.7" dur="1s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="200" cy="178" rx="12" ry="18" fill="#ff8800" opacity="0.8">
              <animate attributeName="ry" values="18;22;16;20;18" dur="0.6s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="200" cy="175" rx="6" ry="10" fill="#ffcc00" opacity="0.9">
              <animate attributeName="ry" values="10;13;9;12;10" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            {/* Fire glow */}
            <circle cx="200" cy="185" r="50" fill="#ff6600" opacity="0.08">
              <animate attributeName="opacity" values="0.08;0.14;0.06;0.12;0.08" dur="1.2s" repeatCount="indefinite" />
            </circle>
            {/* Sparks */}
            <circle cx="195" cy="155" r="1.5" fill="#ffaa00" opacity="0.8">
              <animate attributeName="cy" values="155;140;125" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.4;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="207" cy="150" r="1" fill="#ffcc33" opacity="0.7">
              <animate attributeName="cy" values="150;132;115" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.3;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="148" r="1.2" fill="#ff8800" opacity="0.6">
              <animate attributeName="cy" values="148;128;108" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.2;0" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
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
