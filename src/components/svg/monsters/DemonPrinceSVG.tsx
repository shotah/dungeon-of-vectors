export default function DemonPrinceSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="dpSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#aa2020" />
          <stop offset="100%" stopColor="#5a0808" />
        </linearGradient>
        <radialGradient id="dpAura" cx="50%" cy="55%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dpHorn" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2a0a0a" />
          <stop offset="100%" stopColor="#0a0000" />
        </linearGradient>
      </defs>
      {/* Fiery aura */}
      <circle cx="60" cy="55" r="55" fill="url(#dpAura)" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.55;0.35" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Outer flame ring */}
      <ellipse cx="60" cy="100" rx="40" ry="10" fill="#ff4400" opacity="0.15">
        <animate attributeName="rx" values="40;44;40" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Wings - massive bat-like, spread wide */}
      <path d="M26 34 L0 -2 L8 18 L2 2 L12 22 L4 8 L16 26 L6 14 L20 30 Q24 36 30 42" fill="#5a0808" stroke="#3a0404" strokeWidth="1" />
      <path d="M94 34 L120 -2 L112 18 L118 2 L108 22 L116 8 L104 26 L114 14 L100 30 Q96 36 90 42" fill="#5a0808" stroke="#3a0404" strokeWidth="1" />
      {/* Wing membrane veins */}
      <path d="M8 18 L20 30" fill="none" stroke="#7a2020" strokeWidth="0.5" opacity="0.5" />
      <path d="M12 22 L22 32" fill="none" stroke="#7a2020" strokeWidth="0.5" opacity="0.5" />
      <path d="M112 18 L100 30" fill="none" stroke="#7a2020" strokeWidth="0.5" opacity="0.5" />
      <path d="M108 22 L98 32" fill="none" stroke="#7a2020" strokeWidth="0.5" opacity="0.5" />
      {/* Body - muscular torso */}
      <path d="M30 40 Q24 58 28 92 L92 92 Q96 58 90 40 Q78 26 60 24 Q42 26 30 40 Z" fill="url(#dpSkin)" stroke="#3a0505" strokeWidth="1.5" />
      {/* Chest plate / pectoral muscles */}
      <path d="M42 42 Q52 38 58 46" fill="none" stroke="#8a2a2a" strokeWidth="1.8" />
      <path d="M62 46 Q68 38 78 42" fill="none" stroke="#8a2a2a" strokeWidth="1.8" />
      <line x1="60" y1="46" x2="60" y2="72" stroke="#8a2a2a" strokeWidth="1.2" />
      {/* Abs */}
      <path d="M48 56 Q60 54 72 56" fill="none" stroke="#8a2a2a" strokeWidth="0.9" />
      <path d="M48 63 Q60 61 72 63" fill="none" stroke="#8a2a2a" strokeWidth="0.9" />
      <path d="M48 70 Q60 68 72 70" fill="none" stroke="#8a2a2a" strokeWidth="0.9" />
      {/* Regal belt / sash */}
      <rect x="34" y="78" width="52" height="4" rx="1" fill="#8B7332" stroke="#6B5322" strokeWidth="0.5" />
      <circle cx="60" cy="80" r="2.5" fill="#ff4444" stroke="#aa2222" strokeWidth="0.5">
        <animate attributeName="fill" values="#ff4444;#ffaa44;#ff4444" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="48" cy="80" r="1.5" fill="#ffcc00" />
      <circle cx="72" cy="80" r="1.5" fill="#ffcc00" />
      {/* Arms - powerful, clawed */}
      <path d="M30 44 Q16 54 6 72 L10 76 L12 70 L8 78 L14 72" fill="#9a2020" stroke="#3a0505" strokeWidth="1" />
      <path d="M90 44 Q104 54 114 72 L110 76 L108 70 L112 78 L106 72" fill="#9a2020" stroke="#3a0505" strokeWidth="1" />
      {/* Clawed fingers */}
      <path d="M6 72 L1 68" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 78 L3 80" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 76 L5 74" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M114 72 L119 68" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M112 78 L117 80" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M110 76 L115 74" stroke="#2a0a0a" strokeWidth="1.2" strokeLinecap="round" />
      {/* Neck */}
      <path d="M48 30 Q52 20 54 14 Q58 12 60 12 Q62 12 66 14 Q68 20 72 30" fill="url(#dpSkin)" stroke="#3a0505" strokeWidth="1" />
      {/* Head */}
      <path d="M40 18 Q36 10 38 4 Q48 -4 60 -6 Q72 -4 82 4 Q84 10 80 18 Q70 24 60 24 Q50 24 40 18 Z" fill="url(#dpSkin)" stroke="#3a0505" strokeWidth="1.5" />
      {/* Large curved horns - regal */}
      <path d="M40 4 Q32 -6 22 -14 Q18 -18 16 -16 Q20 -10 26 -4 Q32 2 38 6" fill="url(#dpHorn)" stroke="#1a0505" strokeWidth="1.2" />
      <path d="M80 4 Q88 -6 98 -14 Q102 -18 104 -16 Q100 -10 94 -4 Q88 2 82 6" fill="url(#dpHorn)" stroke="#1a0505" strokeWidth="1.2" />
      {/* Secondary smaller horns */}
      <path d="M44 0 Q40 -6 38 -10" fill="none" stroke="#2a0a0a" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M76 0 Q80 -6 82 -10" fill="none" stroke="#2a0a0a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Eyes - glowing yellow/orange */}
      <ellipse cx="51" cy="10" rx="5" ry="3.5" fill="#ff4400" stroke="#aa2200" strokeWidth="0.5" />
      <ellipse cx="69" cy="10" rx="5" ry="3.5" fill="#ff4400" stroke="#aa2200" strokeWidth="0.5" />
      <ellipse cx="51" cy="10" rx="2.5" ry="3.5" fill="#ffdd00">
        <animate attributeName="fill" values="#ffdd00;#ffaa00;#ffdd00" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="69" cy="10" rx="2.5" ry="3.5" fill="#ffdd00">
        <animate attributeName="fill" values="#ffdd00;#ffaa00;#ffdd00" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Brow ridge */}
      <path d="M44 7 Q51 4 56 7" fill="none" stroke="#5a0808" strokeWidth="1.5" />
      <path d="M64 7 Q69 4 76 7" fill="none" stroke="#5a0808" strokeWidth="1.5" />
      {/* Mouth with fangs */}
      <path d="M46 18 Q60 22 74 18" fill="#2a0000" stroke="#1a0000" strokeWidth="0.5" />
      <path d="M48 17 L50 22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M72 17 L70 22" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M54 18 L55 21" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M66 18 L65 21" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
      {/* Legs */}
      <path d="M36 88 L30 106 L26 112 L30 107 L34 112 L38 107 L40 90" fill="#9a2020" stroke="#3a0505" strokeWidth="1" />
      <path d="M84 88 L90 106 L86 112 L90 107 L94 112 L98 107 L84 90" fill="#9a2020" stroke="#3a0505" strokeWidth="1" />
      {/* Tail */}
      <path d="M60 92 Q44 98 32 106 Q22 112 16 108" fill="none" stroke="#7a1515" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 108 L12 104 L14 112 Z" fill="#aa2020" />
      {/* Flames on hands */}
      <ellipse cx="6" cy="66" rx="5" ry="8" fill="#ff6600" opacity="0.6">
        <animate attributeName="ry" values="8;11;8" dur="0.7s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="6" cy="62" rx="3" ry="5" fill="#ffcc00" opacity="0.4">
        <animate attributeName="ry" values="5;7;5" dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="114" cy="66" rx="5" ry="8" fill="#ff6600" opacity="0.6">
        <animate attributeName="ry" values="8;11;8" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="114" cy="62" rx="3" ry="5" fill="#ffcc00" opacity="0.4">
        <animate attributeName="ry" values="5;7;5" dur="0.65s" repeatCount="indefinite" />
      </ellipse>
      {/* Shoulder spikes */}
      <polygon points="30,40 24,30 34,38" fill="#4a0808" stroke="#3a0505" strokeWidth="0.5" />
      <polygon points="90,40 96,30 86,38" fill="#4a0808" stroke="#3a0505" strokeWidth="0.5" />
    </svg>
  );
}
