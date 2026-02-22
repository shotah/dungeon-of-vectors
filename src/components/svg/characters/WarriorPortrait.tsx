export default function WarriorPortrait({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Helm */}
      <path d="M15 22 Q30 5 45 22 L44 32 Q30 35 16 32 Z" fill="#888" stroke="#666" strokeWidth="1" />
      <rect x="15" y="30" width="30" height="3" fill="#999" rx="1" />
      {/* Visor slit */}
      <rect x="22" y="25" width="16" height="3" fill="#1a1a2e" rx="1" />
      {/* Face visible below */}
      <path d="M18 33 Q30 35 42 33 L40 45 Q30 48 20 45 Z" fill="#d4a574" stroke="#b8956a" strokeWidth="0.5" />
      {/* Chin guard */}
      <path d="M20 42 Q30 48 40 42" fill="none" stroke="#888" strokeWidth="1.5" />
      {/* Shoulders */}
      <rect x="5" y="48" width="22" height="10" fill="#777" stroke="#555" strokeWidth="1" rx="2" />
      <rect x="33" y="48" width="22" height="10" fill="#777" stroke="#555" strokeWidth="1" rx="2" />
      {/* Shoulder rivets */}
      <circle cx="12" cy="53" r="1.5" fill="#aaa" />
      <circle cx="48" cy="53" r="1.5" fill="#aaa" />
      {/* Sword behind */}
      <rect x="48" y="8" width="3" height="25" fill="#bbb" stroke="#888" strokeWidth="0.5" rx="1" />
      <rect x="46" y="32" width="7" height="3" fill="#8B4513" rx="1" />
    </svg>
  );
}
