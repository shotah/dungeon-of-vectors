export default function GoblinSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Body */}
      <path d="M45 55 Q40 70 42 90 L78 90 Q80 70 75 55 Z" fill="#5a8a3a" stroke="#3a6a2a" strokeWidth="1.5" />
      {/* Tattered tunic */}
      <path d="M44 60 L76 60 L74 88 L46 88 Z" fill="#8B7355" stroke="#6a5a3a" strokeWidth="1" />
      <path d="M46 88 L44 92 M52 88 L51 93 M58 88 L58 94 M64 88 L65 93 M70 88 L72 92 M74 88 L76 91" stroke="#6a5a3a" strokeWidth="1" />
      {/* Head */}
      <ellipse cx="60" cy="38" rx="18" ry="20" fill="#6a9a4a" stroke="#3a6a2a" strokeWidth="1.5" />
      {/* Ears (big pointy) */}
      <path d="M42 35 L22 25 L38 42" fill="#6a9a4a" stroke="#3a6a2a" strokeWidth="1.5" />
      <path d="M78 35 L98 25 L82 42" fill="#6a9a4a" stroke="#3a6a2a" strokeWidth="1.5" />
      <path d="M42 35 L26 28 L38 42" fill="#8aaa5a" opacity="0.5" />
      <path d="M78 35 L94 28 L82 42" fill="#8aaa5a" opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="52" cy="34" rx="5" ry="4" fill="#ffff00" />
      <ellipse cx="68" cy="34" rx="5" ry="4" fill="#ffff00" />
      <circle cx="53" cy="34" r="2.5" fill="#111" />
      <circle cx="69" cy="34" r="2.5" fill="#111" />
      {/* Nose */}
      <ellipse cx="60" cy="42" rx="4" ry="3" fill="#5a8a3a" stroke="#3a6a2a" strokeWidth="0.8" />
      {/* Mouth with fangs */}
      <path d="M50 48 Q60 55 70 48" fill="none" stroke="#3a5a2a" strokeWidth="1.5" />
      <path d="M52 48 L54 53 L56 48" fill="#fff" />
      <path d="M64 48 L66 53 L68 48" fill="#fff" />
      {/* Arms */}
      <line x1="44" y1="60" x2="30" y2="78" stroke="#5a8a3a" strokeWidth="4" strokeLinecap="round" />
      <line x1="76" y1="60" x2="92" y2="72" stroke="#5a8a3a" strokeWidth="4" strokeLinecap="round" />
      {/* Dagger in right hand */}
      <rect x="90" y="58" width="2" height="18" fill="#bbb" stroke="#888" strokeWidth="0.5" transform="rotate(15 91 67)" />
      <rect x="87" y="72" width="8" height="3" fill="#8B4513" rx="1" transform="rotate(15 91 73)" />
      {/* Legs */}
      <rect x="48" y="88" width="8" height="18" fill="#5a8a3a" rx="3" />
      <rect x="64" y="88" width="8" height="18" fill="#5a8a3a" rx="3" />
      {/* Feet */}
      <ellipse cx="52" cy="108" rx="7" ry="4" fill="#4a7a3a" />
      <ellipse cx="68" cy="108" rx="7" ry="4" fill="#4a7a3a" />
    </svg>
  );
}
