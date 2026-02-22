export default function MagePortrait({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="mageStarGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#66aaff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#66aaff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Wizard hat */}
      <path d="M18 28 L30 2 L42 28" fill="#2a1a5e" stroke="#1a0a4e" strokeWidth="1" />
      <path d="M30 2 Q35 8 33 12" fill="none" stroke="#1a0a4e" strokeWidth="0.5" />
      <ellipse cx="30" cy="28" rx="16" ry="4" fill="#3a2a6e" stroke="#1a0a4e" strokeWidth="1" />
      {/* Star on hat */}
      <circle cx="30" cy="14" r="4" fill="url(#mageStarGlow)" />
      <path d="M30 10 L31 13 L34 13 L32 15 L33 18 L30 16 L27 18 L28 15 L26 13 L29 13 Z" fill="#aaccff" />
      {/* Face */}
      <ellipse cx="30" cy="36" rx="11" ry="10" fill="#d4a574" stroke="#b8956a" strokeWidth="0.5" />
      {/* Eyes */}
      <ellipse cx="25" cy="34" rx="2.5" ry="2" fill="#fff" />
      <ellipse cx="35" cy="34" rx="2.5" ry="2" fill="#fff" />
      <circle cx="26" cy="34" r="1.2" fill="#4466aa" />
      <circle cx="36" cy="34" r="1.2" fill="#4466aa" />
      {/* Eyebrows */}
      <path d="M22 31 Q25 29 28 31" fill="none" stroke="#6a4a2a" strokeWidth="0.8" />
      <path d="M32 31 Q35 29 38 31" fill="none" stroke="#6a4a2a" strokeWidth="0.8" />
      {/* Beard */}
      <path d="M22 40 Q24 42 26 45 Q28 48 30 50 Q32 48 34 45 Q36 42 38 40" fill="#aaa" stroke="#888" strokeWidth="0.5" />
      <path d="M24 42 Q30 44 36 42" fill="none" stroke="#999" strokeWidth="0.3" />
      {/* Robe shoulders */}
      <path d="M10 50 Q20 46 30 48 Q40 46 50 50 L50 60 L10 60 Z" fill="#2a1a5e" stroke="#1a0a4e" strokeWidth="1" />
      {/* Staff */}
      <line x1="8" y1="15" x2="8" y2="58" stroke="#8B6914" strokeWidth="2.5" />
      <circle cx="8" cy="14" r="4" fill="#6688cc" stroke="#4466aa" strokeWidth="0.8" />
      <circle cx="8" cy="14" r="2" fill="#aaccff" opacity="0.7" />
    </svg>
  );
}
