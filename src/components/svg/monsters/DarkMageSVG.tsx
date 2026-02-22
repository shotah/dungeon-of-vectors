export default function DarkMageSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <radialGradient id="darkMageOrb" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#cc33ff" />
          <stop offset="100%" stopColor="#6600aa" />
        </radialGradient>
      </defs>
      {/* Robe */}
      <path d="M35 45 L30 110 L90 110 L85 45 Z" fill="#1a0033" stroke="#330066" strokeWidth="1.5" />
      <path d="M30 110 L25 115 L95 115 L90 110 Z" fill="#110022" />
      {/* Robe folds */}
      <line x1="50" y1="55" x2="45" y2="110" stroke="#220044" strokeWidth="1" />
      <line x1="70" y1="55" x2="75" y2="110" stroke="#220044" strokeWidth="1" />
      <line x1="60" y1="50" x2="60" y2="110" stroke="#220044" strokeWidth="0.5" />
      {/* Hood */}
      <path d="M38 45 Q60 15 82 45 Q75 50 60 48 Q45 50 38 45 Z" fill="#220044" stroke="#330066" strokeWidth="1.5" />
      {/* Face in shadow */}
      <ellipse cx="60" cy="40" rx="12" ry="10" fill="#0a0015" />
      {/* Glowing eyes */}
      <circle cx="54" cy="38" r="2.5" fill="#cc33ff">
        <animate attributeName="r" values="2.5;3;2.5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="66" cy="38" r="2.5" fill="#cc33ff">
        <animate attributeName="r" values="2.5;3;2.5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Arms */}
      <path d="M38 55 L22 75 L18 70" fill="none" stroke="#1a0033" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 55 L95 70" fill="none" stroke="#1a0033" strokeWidth="4" strokeLinecap="round" />
      {/* Staff */}
      <line x1="18" y1="20" x2="18" y2="100" stroke="#4a3a2a" strokeWidth="3" />
      <circle cx="18" cy="18" r="8" fill="url(#darkMageOrb)" stroke="#9933cc" strokeWidth="1">
        <animate attributeName="r" values="8;9;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="18" cy="18" r="4" fill="#ff66ff" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1s" repeatCount="indefinite" />
      </circle>
      {/* Magic particles */}
      <circle cx="95" cy="68" r="3" fill="#cc33ff" opacity="0.7">
        <animate attributeName="cy" values="68;62;68" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="72" r="2" fill="#9933ff" opacity="0.5">
        <animate attributeName="cy" values="72;65;72" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="65" r="1.5" fill="#ff66ff" opacity="0.6">
        <animate attributeName="cy" values="65;58;65" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
