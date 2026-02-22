export default function ClericPortrait({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="clericHalo" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffdd44" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffdd44" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Halo */}
      <circle cx="30" cy="18" r="14" fill="url(#clericHalo)" />
      <ellipse cx="30" cy="12" rx="12" ry="3" fill="none" stroke="#ffdd44" strokeWidth="1" opacity="0.6" />
      {/* Hood/coif */}
      <path d="M16 28 Q14 16 22 10 Q30 6 38 10 Q46 16 44 28 Q38 30 30 30 Q22 30 16 28 Z" fill="#f0f0e0" stroke="#ccc" strokeWidth="1" />
      {/* Face */}
      <ellipse cx="30" cy="30" rx="10" ry="9" fill="#d4a574" stroke="#b8956a" strokeWidth="0.5" />
      {/* Kind eyes */}
      <ellipse cx="25" cy="28" rx="2.5" ry="2" fill="#fff" />
      <ellipse cx="35" cy="28" rx="2.5" ry="2" fill="#fff" />
      <circle cx="26" cy="28" r="1.2" fill="#4a6aaa" />
      <circle cx="36" cy="28" r="1.2" fill="#4a6aaa" />
      {/* Gentle eyebrows */}
      <path d="M22 26 Q25 24 28 26" fill="none" stroke="#8a6a4a" strokeWidth="0.6" />
      <path d="M32 26 Q35 24 38 26" fill="none" stroke="#8a6a4a" strokeWidth="0.6" />
      {/* Gentle smile */}
      <path d="M26 34 Q30 37 34 34" fill="none" stroke="#a87a5a" strokeWidth="0.8" />
      {/* Robes */}
      <path d="M8 48 Q18 42 30 44 Q42 42 52 48 L52 60 L8 60 Z" fill="#f0f0e0" stroke="#ccc" strokeWidth="1" />
      {/* Holy symbol on chest */}
      <line x1="30" y1="48" x2="30" y2="56" stroke="#cc9933" strokeWidth="1.5" />
      <line x1="26" y1="51" x2="34" y2="51" stroke="#cc9933" strokeWidth="1.5" />
      {/* Shield peeking behind */}
      <path d="M46 40 Q52 42 52 52 Q52 58 46 60 L46 40 Z" fill="#8888bb" stroke="#6666aa" strokeWidth="1" />
      <line x1="46" y1="44" x2="52" y2="44" stroke="#6666aa" strokeWidth="0.5" />
      <line x1="46" y1="50" x2="52" y2="50" stroke="#6666aa" strokeWidth="0.5" />
    </svg>
  );
}
