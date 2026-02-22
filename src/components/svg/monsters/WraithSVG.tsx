export default function WraithSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <radialGradient id="wraithGlow" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#4466ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4466ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wraithBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a4a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a1a3a" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Ethereal glow */}
      <circle cx="60" cy="50" r="45" fill="url(#wraithGlow)">
        <animate attributeName="r" values="45;50;45" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Tattered cloak body */}
      <path d="M35 30 Q30 60 25 100 Q35 110 45 105 Q50 95 55 110 Q60 115 65 110 Q70 95 75 105 Q85 110 95 100 Q90 60 85 30 Q75 20 60 18 Q45 20 35 30 Z" fill="url(#wraithBody)" stroke="#3a3a5a" strokeWidth="1" opacity="0.85">
        <animate attributeName="opacity" values="0.85;0.7;0.85" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Hood */}
      <path d="M38 32 Q60 10 82 32 Q75 38 60 36 Q45 38 38 32 Z" fill="#2a2a4a" stroke="#3a3a5a" strokeWidth="1" />
      {/* Face void */}
      <ellipse cx="60" cy="35" rx="12" ry="8" fill="#0a0a15" />
      {/* Glowing eyes */}
      <circle cx="53" cy="33" r="3" fill="#66aaff">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="67" cy="33" r="3" fill="#66aaff">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="53" cy="33" r="1.5" fill="#ffffff" opacity="0.8" />
      <circle cx="67" cy="33" r="1.5" fill="#ffffff" opacity="0.8" />
      {/* Spectral arms */}
      <path d="M38 50 Q20 55 15 70 Q12 75 18 72" fill="none" stroke="#3a3a5a" strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M82 50 Q100 55 105 70 Q108 75 102 72" fill="none" stroke="#3a3a5a" strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Spectral hands */}
      <path d="M15 70 L10 66 M15 70 L12 72 M15 70 L14 75" stroke="#4a4a6a" strokeWidth="1.5" opacity="0.5" />
      <path d="M105 70 L110 66 M105 70 L108 72 M105 70 L106 75" stroke="#4a4a6a" strokeWidth="1.5" opacity="0.5" />
      {/* Soul particles */}
      <circle cx="30" cy="60" r="1.5" fill="#88bbff" opacity="0.6">
        <animate attributeName="cy" values="60;50;60" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="55" r="1" fill="#88bbff" opacity="0.4">
        <animate attributeName="cy" values="55;45;55" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="45" cy="70" r="1" fill="#aaccff" opacity="0.5">
        <animate attributeName="cy" values="70;62;70" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
