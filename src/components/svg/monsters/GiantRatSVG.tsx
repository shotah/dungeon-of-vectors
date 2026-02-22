export default function GiantRatSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Body */}
      <ellipse cx="60" cy="75" rx="32" ry="20" fill="#6b5b4f" stroke="#4a3a2e" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="32" cy="62" rx="18" ry="14" fill="#7a6a5e" stroke="#4a3a2e" strokeWidth="1.5" />
      {/* Snout */}
      <ellipse cx="18" cy="65" rx="8" ry="5" fill="#8a7a6e" stroke="#4a3a2e" strokeWidth="1" />
      {/* Nose */}
      <circle cx="12" cy="63" r="3" fill="#ff6688" />
      {/* Eyes */}
      <circle cx="28" cy="56" r="4" fill="#ff3333" />
      <circle cx="28" cy="56" r="2" fill="#110000" />
      {/* Ears */}
      <ellipse cx="40" cy="50" rx="6" ry="8" fill="#8a6a5e" stroke="#4a3a2e" strokeWidth="1" />
      <ellipse cx="40" cy="50" rx="4" ry="5" fill="#cc8888" />
      {/* Whiskers */}
      <line x1="14" y1="60" x2="0" y2="55" stroke="#aaa" strokeWidth="0.5" />
      <line x1="14" y1="63" x2="0" y2="63" stroke="#aaa" strokeWidth="0.5" />
      <line x1="14" y1="66" x2="0" y2="70" stroke="#aaa" strokeWidth="0.5" />
      {/* Teeth */}
      <path d="M14 68 L16 73 L18 68" fill="#fff" stroke="#ddd" strokeWidth="0.5" />
      {/* Legs */}
      <rect x="38" y="88" width="8" height="16" fill="#5a4a3e" rx="3" />
      <rect x="55" y="90" width="8" height="16" fill="#5a4a3e" rx="3" />
      <rect x="70" y="88" width="8" height="16" fill="#5a4a3e" rx="3" />
      {/* Claws */}
      <path d="M38 104 L36 108 M42 104 L42 108 M46 104 L48 108" stroke="#aaa" strokeWidth="1" />
      <path d="M70 104 L68 108 M74 104 L74 108 M78 104 L80 108" stroke="#aaa" strokeWidth="1" />
      {/* Tail */}
      <path d="M92 75 Q105 65 110 80 Q115 95 100 100" fill="none" stroke="#8a6a5e" strokeWidth="3" strokeLinecap="round" />
      {/* Fur texture */}
      <path d="M45 68 L47 64 M55 66 L57 62 M65 68 L67 64 M75 70 L77 66" stroke="#5a4a3e" strokeWidth="0.8" />
    </svg>
  );
}
