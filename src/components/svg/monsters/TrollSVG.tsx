export default function TrollSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Body (massive) */}
      <path d="M30 45 Q25 60 28 95 L92 95 Q95 60 90 45 Z" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="1.5" />
      {/* Head */}
      <ellipse cx="60" cy="30" rx="22" ry="18" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="1.5" />
      {/* Brow ridge */}
      <path d="M40 24 Q50 18 60 22 Q70 18 80 24" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="1" />
      {/* Eyes (small, angry) */}
      <ellipse cx="50" cy="28" rx="4" ry="3" fill="#ffcc00" />
      <ellipse cx="70" cy="28" rx="4" ry="3" fill="#ffcc00" />
      <circle cx="51" cy="28" r="2" fill="#111" />
      <circle cx="71" cy="28" r="2" fill="#111" />
      {/* Nose (big bulbous) */}
      <ellipse cx="60" cy="36" rx="6" ry="5" fill="#5a8a4a" stroke="#3a5a2a" strokeWidth="1" />
      {/* Mouth with underbite */}
      <path d="M45 42 Q60 48 75 42" fill="#3a2a1a" stroke="#3a5a2a" strokeWidth="1" />
      <path d="M48 42 L50 38" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
      <path d="M72 42 L70 38" fill="#fff" stroke="#ddd" strokeWidth="1.5" />
      {/* Warts */}
      <circle cx="44" cy="32" r="2" fill="#4a6a3a" />
      <circle cx="78" cy="34" r="1.5" fill="#4a6a3a" />
      {/* Ears */}
      <ellipse cx="38" cy="28" rx="5" ry="8" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="1" />
      <ellipse cx="82" cy="28" rx="5" ry="8" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="1" />
      {/* Arms (huge) */}
      <path d="M30 50 Q15 65 12 85 L20 88 Q22 70 35 55" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="1.5" />
      <path d="M90 50 Q105 65 108 85 L100 88 Q98 70 85 55" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="1.5" />
      {/* Fists */}
      <circle cx="16" cy="87" r="7" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="1" />
      <circle cx="104" cy="87" r="7" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="1" />
      {/* Club in left hand */}
      <rect x="2" y="70" width="6" height="30" fill="#5C3A0A" stroke="#3a2a0a" strokeWidth="1" rx="2" transform="rotate(-15 5 85)" />
      <ellipse cx="5" cy="68" rx="6" ry="4" fill="#5C3A0A" stroke="#3a2a0a" strokeWidth="1" transform="rotate(-15 5 68)" />
      {/* Legs (short, thick) */}
      <rect x="38" y="92" width="16" height="20" fill="#5a7a4a" rx="5" />
      <rect x="66" y="92" width="16" height="20" fill="#5a7a4a" rx="5" />
      {/* Feet */}
      <ellipse cx="46" cy="114" rx="12" ry="5" fill="#4a6a3a" />
      <ellipse cx="74" cy="114" rx="12" ry="5" fill="#4a6a3a" />
      {/* Belly */}
      <ellipse cx="60" cy="72" rx="20" ry="15" fill="#6a9a5a" opacity="0.4" />
    </svg>
  );
}
