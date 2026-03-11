import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { moveInDirection } from '../../utils/direction';
import { useIsMobile } from '../../hooks/useIsMobile';
import DungeonView from '../dungeon/DungeonView';
import PartyBar from '../hud/PartyBar';
import MiniMap from '../hud/MiniMap';
import MessageLog from '../hud/MessageLog';
import Button from '../ui/Button';
import RestingScene from '../svg/screens/RestingScene';
import { getGameBackground } from '../../utils/floorGradient';
import { isMusicEnabled, setMusicEnabled, startFloorMusic } from '../../systems/audioEngine';

const CombatScreen = lazy(() => import('../combat/CombatScreen'));
const InventoryPanel = lazy(() => import('../hud/InventoryPanel'));
const TraderPanel = lazy(() => import('../hud/TraderPanel'));

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [musicOn, setMusicOn] = useState(isMusicEnabled());
  const currentFloor = useGameStore(s => s.currentFloor);
  const saveGame = useGameStore(s => s.saveGame);
  const loadGame = useGameStore(s => s.loadGame);
  const deleteSave = useGameStore(s => s.deleteSave);
  const slots = useGameStore(s => s.getSaveSlots)();

  const toggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    setMusicEnabled(next);
    if (next) startFloorMusic(currentFloor, () => useGameStore.getState().currentFloor);
  };

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
        <div style={{ fontSize: 16, color: '#aaccff', marginBottom: 16 }}>Settings</div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 8, background: '#0f0f1a', borderRadius: 4, marginBottom: 12,
        }}>
          <span style={{ fontSize: 13 }}>Music</span>
          <Button size="sm" variant={musicOn ? 'secondary' : 'danger'} onClick={toggleMusic}>
            {musicOn ? 'On' : 'Off'}
          </Button>
        </div>

        <div style={{ fontSize: 14, color: '#aaccff', marginBottom: 8 }}>Save Slots</div>
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
  const goUpstairs = useGameStore(s => s.goUpstairs);
  const stairsUpPosition = useGameStore(s => s.stairsUpPosition);
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
  const descentFlavorPopup = useGameStore(s => s.descentFlavorPopup);
  const dismissDescentFlavor = useGameStore(s => s.dismissDescentFlavor);
  const isMobile = useIsMobile();

  const onStairs = dungeon ? dungeon.grid[position.y]?.[position.x]?.type === 'stairs_down' : false;
  const onStairsUp = currentFloor > 1 && !!stairsUpPosition && position.x === stairsUpPosition.x && position.y === stairsUpPosition.y;
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
  const [showSettings, setShowSettings] = useState(false);
  const [showStartOver, setShowStartOver] = useState(false);
  const [mobileTab, setMobileTab] = useState<'map' | 'party'>('map');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [minimapHidden, setMinimapHidden] = useState(true);
  const [mobilePanelHidden, setMobilePanelHidden] = useState(true);

  const handleQuickSave = useCallback(() => {
    saveGame(1);
  }, [saveGame]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (descentFlavorPopup) {
        dismissDescentFlavor();
        return;
      }
      setShowInventory(false);
      setShowSettings(false);
      setShowStartOver(false);
      setShowTrader(false);
      return;
    }

    if (descentFlavorPopup) {
      dismissDescentFlavor();
      return;
    }
    if (combat.active || showInventory || showSettings || showStartOver || showTrader || resting) return;

    switch (e.key) {
      case 'F5': e.preventDefault(); handleQuickSave(); break;
      case 'F9': e.preventDefault(); setShowSettings(true); break;
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
  }, [descentFlavorPopup, dismissDescentFlavor, combat.active, showInventory, showSettings, showStartOver, showTrader, resting, setShowTrader, moveForward, moveBackward, turnPlayerLeft, turnPlayerRight, interact, handleQuickSave]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const actionButton = onStairsUp ? (
    <Button size="sm" variant="secondary" onClick={goUpstairs} style={isMobile ? { flex: 1 } : undefined}>⬆ Ascend</Button>
  ) : onStairs ? (
    <Button size="sm" variant="gold" onClick={goDownstairs} style={isMobile ? { flex: 1 } : undefined}>⬇ Descend</Button>
  ) : onTrader ? (
    <Button size="sm" variant="gold" onClick={() => setShowTrader(true)} style={isMobile ? { flex: 1 } : undefined}>💰 Trade</Button>
  ) : !onStairs && !onStairsUp && !onTrader && facingCellType === 'chest' ? (
    <Button size="sm" variant="gold" onClick={interact} style={isMobile ? { flex: 1 } : undefined}>🗝 Open Chest</Button>
  ) : !onStairs && !onStairsUp && !onTrader && facingCellType === 'trader' ? (
    <Button size="sm" variant="gold" onClick={interact} style={isMobile ? { flex: 1 } : undefined}>💰 Trade</Button>
  ) : (onBoss || facingCellType === 'boss') ? (
    <Button size="sm" variant="danger" onClick={interact} style={isMobile ? { flex: 1 } : undefined}>⚔ Confront</Button>
  ) : null;

  const btnStyle = isMobile
    ? { minHeight: 44, fontSize: 15 } as const
    : { minHeight: 40 } as const;

  return (
    <div style={{
      display: 'flex', flexDirection: isMobile ? 'column' : 'row',
      height: '100vh',
      background: getGameBackground(currentFloor), fontFamily: 'monospace', color: '#ddd',
      overflow: 'hidden',
    }}>
      {/* Descent flavor popup */}
      {descentFlavorPopup && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.75)',
            animation: 'fadeIn 0.4s ease-out',
          }}
          onClick={dismissDescentFlavor}
        >
          <div
            style={{
              maxWidth: 320, padding: '24px 28px',
              background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)',
              border: '2px solid #4a5a8a',
              borderRadius: 8,
              boxShadow: '0 0 24px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 15, color: '#ccddff', lineHeight: 1.5, marginBottom: 20 }}>
              {descentFlavorPopup}
            </div>
            <Button size="sm" variant="secondary" onClick={dismissDescentFlavor}>
              Continue
            </Button>
            <div style={{ fontSize: 9, color: '#556', marginTop: 10 }}>Esc or any key</div>
          </div>
        </div>
      )}

      {/* Desktop: sidebar (left) — collapsible, minimap hideable */}
      {!isMobile && (
        <>
          {sidebarCollapsed ? (
            <div style={{
              width: 48, padding: 6, background: '#0f0f1a',
              borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              flexShrink: 0,
            }}>
              <Button size="sm" variant="secondary" onClick={() => setSidebarCollapsed(false)}
                style={{ padding: '6px 8px', minHeight: 32 }}>◀</Button>
              <Button size="sm" variant="secondary" onClick={() => setShowInventory(true)}
                style={{ padding: '6px 8px', fontSize: 16, minHeight: 36 }}>📦</Button>
              <Button size="sm" onClick={handleQuickSave}
                style={{ padding: '6px 8px', fontSize: 16, minHeight: 36 }}>💾</Button>
              <Button size="sm" variant="secondary" onClick={() => setShowSettings(true)}
                style={{ padding: '6px 8px', fontSize: 16, minHeight: 36 }}>⚙</Button>
              <Button size="sm" variant="danger" onClick={() => setShowStartOver(true)}
                style={{ padding: '6px 8px', fontSize: 16, minHeight: 36 }}>✕</Button>
            </div>
          ) : (
            <div style={{
              width: 220, padding: '8px 10px', background: '#0f0f1a',
              borderRight: '1px solid #2a2a3a', display: 'flex', flexDirection: 'column', gap: 8,
              overflow: 'auto', flexShrink: 0,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                <div style={{
                  flex: 1, padding: '4px 8px', background: '#1a1a2e', borderRadius: 4,
                  fontSize: 11, color: '#667', textAlign: 'center',
                }}>
                  Floor {currentFloor} &middot; {facing === 'N' ? 'North' : facing === 'S' ? 'South' : facing === 'E' ? 'East' : 'West'} &middot; ({position.x}, {position.y})
                </div>
                <Button size="sm" variant="secondary" onClick={() => setSidebarCollapsed(true)}
                  style={{ padding: '2px 6px', minHeight: 28 }}>▶</Button>
              </div>

              {!minimapHidden && <MiniMap />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                <button type="button" onClick={() => setMinimapHidden(!minimapHidden)} style={{
                  background: 'none', border: 'none', color: '#667', cursor: 'pointer', fontFamily: 'monospace',
                }}>{minimapHidden ? 'Show map' : 'Hide map'}</button>
              </div>
              <PartyBar />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto' }}>
                <Button size="sm" variant="secondary" onClick={() => setShowInventory(true)}
                  style={{ width: '100%' }}>Inventory (I)</Button>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Button size="sm" onClick={handleQuickSave} style={{ flex: 1 }}>Save</Button>
                  <Button size="sm" variant="secondary" onClick={() => setShowSettings(true)}
                    style={{ flex: 1 }}>Settings</Button>
                </div>
                <Button size="sm" variant="danger" onClick={() => setShowStartOver(true)}
                  style={{ width: '100%' }}>Start Over</Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: isMobile ? '2px 2px' : 8, gap: isMobile ? 2 : 6,
        minHeight: 0, minWidth: 0,
      }}>
        {/* Mobile: compact top bar (no sidebar on mobile) */}
        {isMobile && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4,
            padding: '2px 4px', background: '#1a1a2e', borderRadius: 4, flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, color: '#667' }}>
              F{currentFloor} {facing} ({position.x},{position.y})
            </span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <Button size="sm" variant="secondary" onClick={() => setShowInventory(true)}
                style={{ padding: '6px 10px', fontSize: 16, minHeight: 36 }}>📦</Button>
              <Button size="sm" onClick={handleQuickSave}
                style={{ padding: '6px 10px', fontSize: 16, minHeight: 36 }}>💾</Button>
              <Button size="sm" variant="secondary" onClick={() => setShowSettings(true)}
                style={{ padding: '6px 10px', fontSize: 16, minHeight: 36 }}>⚙</Button>
              <Button size="sm" variant="danger" onClick={() => setShowStartOver(true)}
                style={{ padding: '6px 10px', fontSize: 16, minHeight: 36 }}>✕</Button>
            </div>
          </div>
        )}

        {/* Dungeon viewport: on mobile lives in growable area so arrows stay pinned at bottom */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column', minHeight: 0,
          ...(isMobile ? {} : { alignItems: 'center', justifyContent: 'center' }),
        }}>
          <div style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 0,
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              maxHeight: '100%',
              ...(isMobile ? { minHeight: 120, aspectRatio: '3/2' } : { minHeight: 200 }),
            }}>
              <DungeonView />
            </div>
          </div>
        </div>

        {/* Desktop: movement controls here */}
        {!isMobile && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button size="sm" variant="secondary" onClick={turnPlayerLeft} style={btnStyle}>← Turn</Button>
              <Button size="sm" onClick={moveForward} style={btnStyle}>↑ Forward</Button>
              <Button size="sm" variant="secondary" onClick={turnPlayerRight} style={btnStyle}>Turn →</Button>
            </div>
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button size="sm" variant="secondary" onClick={moveBackward} style={btnStyle}>↓ Back</Button>
              {actionButton}
            </div>
          </div>
        )}

        {/* Mobile: tabbed info panel (Map / Party) — third “tab” is collapse/expand */}
        {isMobile && (
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {(['map', 'party'] as const).map(tab => (
                <button key={tab} onClick={() => setMobileTab(tab)} style={{
                  flex: 1, padding: '10px 0', background: mobileTab === tab ? '#1a1a2e' : '#0f0f1a',
                  border: `1px solid ${mobileTab === tab ? '#4a6aaa' : '#2a2a3a'}`,
                  borderBottom: mobileTab === tab ? 'none' : '1px solid #2a2a3a',
                  borderRadius: '4px 4px 0 0', color: mobileTab === tab ? '#aaccff' : '#667',
                  fontSize: 13, fontFamily: 'monospace', cursor: 'pointer',
                }}>
                  {tab === 'map' ? 'Map' : 'Party'}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setMobilePanelHidden(!mobilePanelHidden)}
                style={{
                  padding: '10px 14px', background: '#0f0f1a',
                  border: '1px solid #2a2a3a',
                  borderBottom: mobilePanelHidden ? '1px solid #2a2a3a' : 'none',
                  borderRadius: '4px 4px 0 0', color: '#667',
                  fontSize: 14, fontFamily: 'monospace', cursor: 'pointer',
                }}
              >
                {mobilePanelHidden ? '▲' : '▼'}
              </button>
            </div>
            {!mobilePanelHidden && (
              <div style={{
                background: '#1a1a2e', border: '1px solid #2a2a3a', borderRadius: '0 0 4px 4px',
                padding: 4, maxHeight: 280, overflow: 'auto',
              }}>
                {mobileTab === 'map' ? <MiniMap mobile /> : <PartyBar />}
              </div>
            )}
          </div>
        )}

        {/* Message log */}
        <div style={{ flexShrink: 0 }}>
          <MessageLog />
        </div>

        {/* Mobile: movement controls at the bottom */}
        {isMobile && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 3, flexShrink: 0,
          }}>
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center', width: '100%' }}>
              <Button size="sm" variant="secondary" onClick={turnPlayerLeft}
                style={{ ...btnStyle, flex: 1 }}>← Turn</Button>
              <Button size="sm" onClick={moveForward}
                style={{ ...btnStyle, flex: 1 }}>↑ Forward</Button>
              <Button size="sm" variant="secondary" onClick={turnPlayerRight}
                style={{ ...btnStyle, flex: 1 }}>Turn →</Button>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, width: '100%',
            }}>
              <Button size="sm" variant="secondary" onClick={moveBackward} style={btnStyle}>↓ Back</Button>
              {actionButton}
            </div>
          </div>
        )}
      </div>

      {/* Overlays */}
      <Suspense fallback={null}>
        {combat.active && <CombatScreen />}
        {showInventory && <InventoryPanel onClose={() => setShowInventory(false)} />}
        {showTrader && <TraderPanel onClose={() => setShowTrader(false)} />}
      </Suspense>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

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
