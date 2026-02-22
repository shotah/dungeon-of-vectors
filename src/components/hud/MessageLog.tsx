import { useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';

const TYPE_COLORS: Record<string, string> = {
  info: '#aaa',
  combat: '#ff8844',
  loot: '#daa520',
  danger: '#ff4444',
  system: '#88aaff',
};

export default function MessageLog() {
  const messages = useGameStore(s => s.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      style={{
        height: 100, overflow: 'auto', padding: 8,
        background: '#0a0a15', border: '1px solid #3a3a5a',
        borderRadius: 4, fontFamily: 'monospace', fontSize: 11,
      }}
    >
      {messages.map((msg, i) => (
        <div key={i} style={{ color: TYPE_COLORS[msg.type] || '#aaa', marginBottom: 2 }}>
          &gt; {msg.text}
        </div>
      ))}
      {messages.length === 0 && (
        <div style={{ color: '#444' }}>No messages yet...</div>
      )}
    </div>
  );
}
