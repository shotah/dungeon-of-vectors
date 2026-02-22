import { useState, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import IntroScene from '../svg/screens/IntroScene';
import Button from '../ui/Button';

const STORY_LINES = [
  'A Mad Wizard has been terrorizing the local towns...',
  'Villages burn. People flee. None who face him return.',
  'The townsfolk have pooled their gold to hire adventurers.',
  'Hunt him down in the depths of his dungeon,',
  'and make sure he can never terrorize anyone again.',
];

export default function IntroScreen() {
  const setScreen = useGameStore(s => s.setScreen);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < STORY_LINES.length) {
      const timer = setTimeout(() => setVisibleLines(v => v + 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: 20,
      background: '#0a0a15', fontFamily: 'monospace', color: '#ddd',
    }}>
      <IntroScene />

      <div style={{
        maxWidth: 420, textAlign: 'center', minHeight: 120,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {STORY_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: 14, color: i === 0 ? '#ff8844' : '#ccc',
              animation: 'fadeIn 0.8s ease-in',
              lineHeight: 1.6,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8, opacity: visibleLines >= STORY_LINES.length ? 1 : 0.3 }}>
        <Button
          onClick={() => setScreen('character_creation')}
          size="lg"
          disabled={visibleLines < STORY_LINES.length}
        >
          Accept the Quest
        </Button>
      </div>

      {visibleLines < STORY_LINES.length && (
        <button
          onClick={() => setVisibleLines(STORY_LINES.length)}
          style={{
            background: 'none', border: 'none', color: '#555',
            fontSize: 11, fontFamily: 'monospace', cursor: 'pointer',
          }}
        >
          Skip
        </button>
      )}
    </div>
  );
}
