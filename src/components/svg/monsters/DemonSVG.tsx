export default function DemonSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="demonSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a1a1a" />
          <stop offset="100%" stopColor="#4a0a0a" />
        </linearGradient>
        <radialGradient id="hellGlow" cx="50%" cy="60%">
          <stop offset="0%" stopColor="#ff4400" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Hell glow */}
      <circle cx="60" cy="60" r="50" fill="url(#hellGlow)" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Wings */}
      <path d="M15 30 L0 0 L5 20 L2 5 L10 25 L4 10 L15 28 Q20 35 28 40" fill="#5a0a0a" stroke="#3a0505" strokeWidth="1" />
      <path d="M105 30 L120 0 L115 20 L118 5 L110 25 L116 10 L105 28 Q100 35 92 40" fill="#5a0a0a" stroke="#3a0505" strokeWidth="1" />
      {/* Body - muscular */}
      <path d="M32 40 Q26 60 30 95 L90 95 Q94 60 88 40 Q78 28 60 26 Q42 28 32 40 Z" fill="url(#demonSkin)" stroke="#3a0505" strokeWidth="1.5" />
      {/* Chest muscles */}
      <path d="M45 45 Q52 42 58 48" fill="none" stroke="#6a1a1a" strokeWidth="1.5" />
      <path d="M62 48 Q68 42 75 45" fill="none" stroke="#6a1a1a" strokeWidth="1.5" />
      <line x1="60" y1="48" x2="60" y2="75" stroke="#6a1a1a" strokeWidth="1" />
      {/* Abs */}
      <path d="M50 60 Q60 58 70 60" fill="none" stroke="#6a1a1a" strokeWidth="0.8" />
      <path d="M50 68 Q60 66 70 68" fill="none" stroke="#6a1a1a" strokeWidth="0.8" />
      <path d="M50 76 Q60 74 70 76" fill="none" stroke="#6a1a1a" strokeWidth="0.8" />
      {/* Arms */}
      <path d="M32 45 Q18 55 10 70 L14 74 L16 68 L12 76 L18 70" fill="#7a1515" stroke="#3a0505" strokeWidth="1" />
      <path d="M88 45 Q102 55 110 70 L106 74 L104 68 L108 76 L102 70" fill="#7a1515" stroke="#3a0505" strokeWidth="1" />
      {/* Neck */}
      <path d="M50 32 Q55 24 55 18 Q58 16 60 16 Q62 16 65 18 Q65 24 70 32" fill="url(#demonSkin)" stroke="#3a0505" strokeWidth="1" />
      {/* Head */}
      <path d="M42 20 Q38 12 40 6 Q50 0 60 0 Q70 0 80 6 Q82 12 78 20 Q68 26 60 26 Q52 26 42 20 Z" fill="url(#demonSkin)" stroke="#3a0505" strokeWidth="1.5" />
      {/* Horns - large curved */}
      <path d="M42 8 Q35 -2 28 -8 Q30 -4 34 0 Q38 4 40 6" fill="#2a0a0a" stroke="#1a0505" strokeWidth="1.5" />
      <path d="M78 8 Q85 -2 92 -8 Q90 -4 86 0 Q82 4 80 6" fill="#2a0a0a" stroke="#1a0505" strokeWidth="1.5" />
      {/* Eyes */}
      <ellipse cx="52" cy="12" rx="4" ry="3" fill="#ff3300" stroke="#aa1100" strokeWidth="0.5" />
      <ellipse cx="68" cy="12" rx="4" ry="3" fill="#ff3300" stroke="#aa1100" strokeWidth="0.5" />
      <ellipse cx="52" cy="12" rx="2" ry="3" fill="#ffcc00" />
      <ellipse cx="68" cy="12" rx="2" ry="3" fill="#ffcc00" />
      {/* Mouth with fangs */}
      <path d="M48 20 Q60 24 72 20" fill="#2a0000" stroke="#1a0000" strokeWidth="0.5" />
      <path d="M50 19 L52 24" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M70 19 L68 24" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
      {/* Legs */}
      <path d="M38 90 L32 108 L28 112 L32 108 L36 113 L40 108 L42 92" fill="#7a1515" stroke="#3a0505" strokeWidth="1" />
      <path d="M82 90 L88 108 L84 112 L88 108 L92 113 L96 108 L82 92" fill="#7a1515" stroke="#3a0505" strokeWidth="1" />
      {/* Tail */}
      <path d="M60 95 Q45 100 35 108 Q25 115 20 110" fill="none" stroke="#6a1010" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 110 L16 106 L18 114 Z" fill="#8a1a1a" />
      {/* Flames on hands */}
      <ellipse cx="12" cy="68" rx="4" ry="6" fill="#ff6600" opacity="0.6">
        <animate attributeName="ry" values="6;8;6" dur="0.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="108" cy="68" rx="4" ry="6" fill="#ff6600" opacity="0.6">
        <animate attributeName="ry" values="6;8;6" dur="0.9s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}
