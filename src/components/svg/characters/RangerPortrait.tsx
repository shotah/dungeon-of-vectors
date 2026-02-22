export default function RangerPortrait({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Hood (forest green) */}
      <path d="M15 30 Q13 18 21 11 Q30 5 39 11 Q47 18 45 30 Q39 32 30 33 Q21 32 15 30 Z" fill="#2d5a27" stroke="#1e3d1a" strokeWidth="1" />
      {/* Face */}
      <ellipse cx="30" cy="32" rx="10" ry="9" fill="#c4956a" stroke="#a87a5a" strokeWidth="0.5" />
      {/* Eyes (focused) */}
      <ellipse cx="26" cy="30" rx="3" ry="2" fill="#fff" />
      <ellipse cx="34" cy="30" rx="3" ry="2" fill="#fff" />
      <circle cx="26" cy="30" r="1.2" fill="#4a7a32" />
      <circle cx="34" cy="30" r="1.2" fill="#4a7a32" />
      {/* Brow (determined) */}
      <line x1="22" y1="27" x2="28" y2="27.5" stroke="#8a6a4a" strokeWidth="0.8" />
      <line x1="32" y1="27.5" x2="38" y2="27" stroke="#8a6a4a" strokeWidth="0.8" />
      {/* Nose */}
      <path d="M29 32 L30 35 L31 32" fill="none" stroke="#a87a5a" strokeWidth="0.5" />
      {/* Mouth */}
      <path d="M27 37 Q30 38 33 37" fill="none" stroke="#8a6a4a" strokeWidth="0.7" />
      {/* Hood shadow */}
      <path d="M15 30 Q21 26 30 28 Q39 26 45 30" fill="none" stroke="#1a3a14" strokeWidth="0.5" opacity="0.6" />
      {/* Cloak / shoulders (forest green) */}
      <path d="M6 48 Q18 44 30 46 Q42 44 54 48 L54 60 L6 60 Z" fill="#2d5a27" stroke="#1e3d1a" strokeWidth="1" />
      {/* Leather vest detail */}
      <path d="M22 48 L22 60" stroke="#4a3a2a" strokeWidth="0.5" />
      <path d="M38 48 L38 60" stroke="#4a3a2a" strokeWidth="0.5" />
      <path d="M24 50 Q30 52 36 50" fill="none" stroke="#4a3a2a" strokeWidth="0.6" />
      {/* Bow (over shoulder) */}
      <path d="M8 12 Q4 30 8 48" fill="none" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="8" y2="48" stroke="#c4a86a" strokeWidth="0.7" />
      {/* Arrow quiver (behind) */}
      <rect x="44" y="14" width="6" height="22" rx="2" fill="#5a3a1a" stroke="#4a2a0a" strokeWidth="0.5" />
      <line x1="45" y1="10" x2="45" y2="16" stroke="#bbb" strokeWidth="0.8" />
      <line x1="47" y1="9" x2="47" y2="16" stroke="#bbb" strokeWidth="0.8" />
      <line x1="49" y1="11" x2="49" y2="16" stroke="#bbb" strokeWidth="0.8" />
      {/* Feather on hood */}
      <path d="M38 10 Q42 6 44 8 Q42 10 40 12" fill="#8B6914" stroke="#6a5010" strokeWidth="0.3" />
    </svg>
  );
}
