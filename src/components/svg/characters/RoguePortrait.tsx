export default function RoguePortrait({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Hood */}
      <path d="M14 30 Q12 18 20 10 Q30 4 40 10 Q48 18 46 30 Q40 32 30 33 Q20 32 14 30 Z" fill="#3a3a3a" stroke="#2a2a2a" strokeWidth="1" />
      {/* Face in shadow */}
      <ellipse cx="30" cy="32" rx="10" ry="9" fill="#c4956a" stroke="#a87a5a" strokeWidth="0.5" />
      {/* Eyes (sharp) */}
      <path d="M23 30 L26 28 L29 30 L26 31 Z" fill="#fff" />
      <path d="M31 30 L34 28 L37 30 L34 31 Z" fill="#fff" />
      <circle cx="26" cy="30" r="1" fill="#2a5a2a" />
      <circle cx="34" cy="30" r="1" fill="#2a5a2a" />
      {/* Nose */}
      <path d="M29 32 L30 35 L31 32" fill="none" stroke="#a87a5a" strokeWidth="0.5" />
      {/* Smirk */}
      <path d="M26 37 Q30 39 35 36" fill="none" stroke="#8a6a4a" strokeWidth="0.8" />
      {/* Scar */}
      <line x1="22" y1="28" x2="20" y2="35" stroke="#cc8888" strokeWidth="0.5" />
      {/* Hood shadow */}
      <path d="M14 30 Q20 26 30 28 Q40 26 46 30" fill="none" stroke="#222" strokeWidth="0.5" opacity="0.5" />
      {/* Shoulders (leather) */}
      <path d="M8 48 Q18 44 30 46 Q42 44 52 48 L52 60 L8 60 Z" fill="#4a3a2a" stroke="#3a2a1a" strokeWidth="1" />
      {/* Collar */}
      <path d="M20 44 Q30 48 40 44" fill="none" stroke="#3a2a1a" strokeWidth="1" />
      {/* Daggers (crossed behind) */}
      <line x1="10" y1="18" x2="20" y2="42" stroke="#bbb" strokeWidth="1.5" />
      <line x1="50" y1="18" x2="40" y2="42" stroke="#bbb" strokeWidth="1.5" />
      <rect x="8" y="15" width="4" height="4" fill="#8B4513" rx="1" transform="rotate(-20 10 17)" />
      <rect x="48" y="15" width="4" height="4" fill="#8B4513" rx="1" transform="rotate(20 50 17)" />
      {/* Mask/bandana */}
      <rect x="18" y="35" width="24" height="5" fill="#2a2a2a" opacity="0.6" rx="1" />
    </svg>
  );
}
