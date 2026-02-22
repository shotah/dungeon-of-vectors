export default function DragonSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="dragonScale" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#4a0000" />
        </linearGradient>
        <radialGradient id="fireGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Wings */}
      <path d="M25 40 L2 10 L8 30 L0 15 L10 35 L5 20 L15 38 Q20 42 25 45" fill="#6a0000" stroke="#4a0000" strokeWidth="1" />
      <path d="M95 40 L118 10 L112 30 L120 15 L110 35 L115 20 L105 38 Q100 42 95 45" fill="#6a0000" stroke="#4a0000" strokeWidth="1" />
      {/* Body */}
      <path d="M35 50 Q30 65 35 90 L85 90 Q90 65 85 50 Q75 40 60 38 Q45 40 35 50 Z" fill="url(#dragonScale)" stroke="#3a0000" strokeWidth="1.5" />
      {/* Belly scales */}
      <path d="M45 55 Q60 52 75 55 L73 90 L47 90 Z" fill="#aa4444" opacity="0.5" />
      <line x1="50" y1="60" x2="50" y2="88" stroke="#7a2222" strokeWidth="0.5" />
      <line x1="60" y1="58" x2="60" y2="88" stroke="#7a2222" strokeWidth="0.5" />
      <line x1="70" y1="60" x2="70" y2="88" stroke="#7a2222" strokeWidth="0.5" />
      {/* Neck */}
      <path d="M50 42 Q55 30 55 22 Q58 18 60 18 Q62 18 65 22 Q65 30 70 42" fill="url(#dragonScale)" stroke="#3a0000" strokeWidth="1" />
      {/* Head */}
      <path d="M45 22 Q40 15 38 8 Q45 2 60 0 Q75 2 82 8 Q80 15 75 22 Q68 26 60 26 Q52 26 45 22 Z" fill="url(#dragonScale)" stroke="#3a0000" strokeWidth="1.5" />
      {/* Horns */}
      <path d="M44 8 L38 -5 L42 5" fill="#5a2a00" stroke="#3a1a00" strokeWidth="0.8" />
      <path d="M76 8 L82 -5 L78 5" fill="#5a2a00" stroke="#3a1a00" strokeWidth="0.8" />
      {/* Eyes */}
      <ellipse cx="50" cy="12" rx="4" ry="3" fill="#ffcc00" stroke="#aa6600" strokeWidth="0.5" />
      <ellipse cx="70" cy="12" rx="4" ry="3" fill="#ffcc00" stroke="#aa6600" strokeWidth="0.5" />
      <ellipse cx="51" cy="12" rx="2" ry="3" fill="#111" />
      <ellipse cx="71" cy="12" rx="2" ry="3" fill="#111" />
      {/* Nostrils */}
      <circle cx="55" cy="6" r="1.5" fill="#3a0000" />
      <circle cx="65" cy="6" r="1.5" fill="#3a0000" />
      {/* Smoke from nostrils */}
      <circle cx="54" cy="3" r="2" fill="#666" opacity="0.3">
        <animate attributeName="cy" values="3;-2;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="66" cy="3" r="2" fill="#666" opacity="0.3">
        <animate attributeName="cy" values="3;-2;3" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      {/* Mouth (with teeth) */}
      <path d="M48 20 Q60 24 72 20" fill="#2a0000" stroke="#3a0000" strokeWidth="0.5" />
      <path d="M50 20 L52 23" fill="#fff" stroke="#ddd" strokeWidth="0.8" />
      <path d="M58 21 L59 24" fill="#fff" stroke="#ddd" strokeWidth="0.8" />
      <path d="M66 21 L65 24" fill="#fff" stroke="#ddd" strokeWidth="0.8" />
      <path d="M72 20 L70 23" fill="#fff" stroke="#ddd" strokeWidth="0.8" />
      {/* Arms/Claws */}
      <path d="M35 55 Q22 60 15 72 L18 75 L22 70 L20 76 L24 72" fill="#7a0000" stroke="#3a0000" strokeWidth="1" />
      <path d="M85 55 Q98 60 105 72 L102 75 L98 70 L100 76 L96 72" fill="#7a0000" stroke="#3a0000" strokeWidth="1" />
      {/* Legs */}
      <path d="M40 85 L35 105 L30 108 L34 105 L38 108 L42 105 L40 90" fill="#7a0000" stroke="#3a0000" strokeWidth="1" />
      <path d="M80 85 L85 105 L80 108 L84 105 L88 108 L92 105 L80 90" fill="#7a0000" stroke="#3a0000" strokeWidth="1" />
      {/* Tail */}
      <path d="M60 90 Q70 95 80 100 Q95 105 105 95 Q110 88 115 92" fill="none" stroke="#7a0000" strokeWidth="4" strokeLinecap="round" />
      <path d="M115 92 L118 88 L117 96 Z" fill="#7a0000" />
      {/* Fire glow */}
      <circle cx="60" cy="22" r="10" fill="url(#fireGlow)" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.6;0.4" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
