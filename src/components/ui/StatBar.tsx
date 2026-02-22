interface StatBarProps {
  value: number;
  max: number;
  color?: string;
  bgColor?: string;
  height?: number;
  showText?: boolean;
  label?: string;
}

export default function StatBar({
  value, max, color = '#44aa44', bgColor = '#2a2a2a',
  height = 12, showText = true, label,
}: StatBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const barColor = pct < 25 ? '#cc3333' : pct < 50 ? '#ccaa33' : color;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {label && (
        <span style={{ color: '#888', fontSize: 10, fontFamily: 'monospace', width: 20 }}>{label}</span>
      )}
      <div style={{
        flex: 1, height, background: bgColor, borderRadius: 3,
        border: '1px solid #333', position: 'relative', overflow: 'hidden', minWidth: 50,
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: barColor,
          borderRadius: 2, transition: 'width 0.3s ease',
        }} />
        {showText && (
          <span style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            fontSize: Math.max(8, height - 3), color: '#fff', fontFamily: 'monospace',
            textShadow: '1px 1px 1px #000',
          }}>
            {value}/{max}
          </span>
        )}
      </div>
    </div>
  );
}
