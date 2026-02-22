import { lazy, Suspense } from 'react';
import { useGameStore } from './stores/gameStore';
import MainMenu from './components/screens/MainMenu';

const IntroScreen = lazy(() => import('./components/screens/IntroScreen'));
const CharacterCreation = lazy(() => import('./components/screens/CharacterCreation'));
const GameScreen = lazy(() => import('./components/screens/GameScreen'));
const GameOver = lazy(() => import('./components/screens/GameOver'));
const VictoryScreen = lazy(() => import('./components/screens/VictoryScreen'));

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0a0a15', color: '#667',
      fontFamily: 'monospace', fontSize: 14,
    }}>
      Loading...
    </div>
  );
}

export default function App() {
  const screen = useGameStore(s => s.screen);

  return (
    <Suspense fallback={<LoadingScreen />}>
      {screen === 'main_menu' && <MainMenu />}
      {screen === 'intro' && <IntroScreen />}
      {screen === 'character_creation' && <CharacterCreation />}
      {screen === 'game' && <GameScreen />}
      {screen === 'game_over' && <GameOver />}
      {screen === 'victory' && <VictoryScreen />}
    </Suspense>
  );
}
