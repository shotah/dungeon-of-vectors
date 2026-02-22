export default function DeathKnightSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="dkArmor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a4a" />
          <stop offset="100%" stopColor="#1a1a2a" />
        </linearGradient>
        <radialGradient id="dkGlow" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#44ffaa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22aa66" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Eerie glow */}
      <circle cx="60" cy="30" r="20" fill="url(#dkGlow)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Cape */}
      <path d="M35 38 Q30 70 25 110 L95 110 Q90 70 85 38" fill="#1a0a0a" stroke="#0a0505" strokeWidth="1" />
      {/* Body armor */}
      <path d="M35 38 Q30 60 34 90 L86 90 Q90 60 85 38 Q75 28 60 26 Q45 28 35 38 Z" fill="url(#dkArmor)" stroke="#0a0a1a" strokeWidth="1.5" />
      {/* Chest plate details */}
      <path d="M45 42 L60 50 L75 42" fill="none" stroke="#4a4a5a" strokeWidth="1.5" />
      <path d="M60 50 L60 80" stroke="#4a4a5a" strokeWidth="1" />
      <path d="M42 55 L60 55" stroke="#3a3a4a" strokeWidth="0.5" />
      <path d="M60 55 L78 55" stroke="#3a3a4a" strokeWidth="0.5" />
      {/* Shoulder pauldrons */}
      <ellipse cx="36" cy="38" rx="10" ry="6" fill="#4a4a5a" stroke="#2a2a3a" strokeWidth="1" />
      <ellipse cx="84" cy="38" rx="10" ry="6" fill="#4a4a5a" stroke="#2a2a3a" strokeWidth="1" />
      {/* Spikes on pauldrons */}
      <path d="M30 36 L26 28 L32 34" fill="#3a3a4a" stroke="#2a2a3a" strokeWidth="0.5" />
      <path d="M90 36 L94 28 L88 34" fill="#3a3a4a" stroke="#2a2a3a" strokeWidth="0.5" />
      {/* Arms */}
      <path d="M28 42 Q16 55 10 72" fill="none" stroke="#3a3a4a" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 42 Q104 55 110 72" fill="none" stroke="#3a3a4a" strokeWidth="5" strokeLinecap="round" />
      {/* Gauntlets */}
      <rect x="6" y="70" width="10" height="8" rx="2" fill="#4a4a5a" stroke="#2a2a3a" strokeWidth="0.5" />
      <rect x="104" y="70" width="10" height="8" rx="2" fill="#4a4a5a" stroke="#2a2a3a" strokeWidth="0.5" />
      {/* Helmet */}
      <path d="M40 28 Q38 16 40 8 Q50 0 60 0 Q70 0 80 8 Q82 16 80 28 Q70 32 60 32 Q50 32 40 28 Z" fill="url(#dkArmor)" stroke="#0a0a1a" strokeWidth="1.5" />
      {/* Visor slit */}
      <path d="M46 18 L74 18" stroke="#000" strokeWidth="3" />
      {/* Glowing eyes behind visor */}
      <circle cx="52" cy="18" r="2" fill="#44ffaa">
        <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="18" r="2" fill="#44ffaa">
        <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Helmet crest */}
      <path d="M60 0 L60 -8 L58 0" fill="#4a4a5a" stroke="#2a2a3a" strokeWidth="0.5" />
      {/* Sword */}
      <rect x="6" y="40" width="3" height="32" rx="1" fill="#c0c8d8" />
      <rect x="1" y="38" width="13" height="3" rx="1" fill="#8a7a2a" />
      <rect x="5" y="72" width="5" height="6" rx="1" fill="#5a4a2a" />
      <circle cx="7.5" cy="80" r="2.5" fill="#8a7a2a" />
      {/* Legs */}
      <path d="M42 86 L38 105 L34 110 L38 106 L42 110 L46 105 L44 88" fill="#3a3a4a" stroke="#1a1a2a" strokeWidth="1" />
      <path d="M78 86 L82 105 L78 110 L82 106 L86 110 L90 105 L78 88" fill="#3a3a4a" stroke="#1a1a2a" strokeWidth="1" />
      {/* Shield on right arm */}
      <path d="M105 50 Q115 52 115 62 Q115 72 105 76 Q95 72 95 62 Q95 52 105 50 Z" fill="#2a2a3a" stroke="#4a4a5a" strokeWidth="1" />
      <path d="M105 54 L105 72" stroke="#44ffaa" strokeWidth="0.8" opacity="0.5" />
      <path d="M99 63 L111 63" stroke="#44ffaa" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}
