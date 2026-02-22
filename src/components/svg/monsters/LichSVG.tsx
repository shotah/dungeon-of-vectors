export default function LichSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="lichRobe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1a3a" />
          <stop offset="100%" stopColor="#0a0a1a" />
        </linearGradient>
        <radialGradient id="soulGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#aa44ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6622aa" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Soul glow */}
      <circle cx="60" cy="50" r="35" fill="url(#soulGlow)" opacity="0.3">
        <animate attributeName="r" values="35;40;35" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Robe */}
      <path d="M30 45 Q25 70 20 110 L100 110 Q95 70 90 45 Q80 35 60 32 Q40 35 30 45 Z" fill="url(#lichRobe)" stroke="#1a0a2a" strokeWidth="1.5" />
      {/* Robe trim */}
      <path d="M20 108 Q60 100 100 108" fill="none" stroke="#6a4a8a" strokeWidth="1" />
      <path d="M25 105 Q60 97 95 105" fill="none" stroke="#5a3a7a" strokeWidth="0.5" />
      {/* Arms */}
      <path d="M32 55 Q18 65 12 80 L15 82 L16 78" fill="#1a0a2a" stroke="#2a1a3a" strokeWidth="1" />
      <path d="M88 55 Q102 65 108 80 L105 82 L104 78" fill="#1a0a2a" stroke="#2a1a3a" strokeWidth="1" />
      {/* Skeleton hands */}
      <path d="M12 80 L8 84 M12 80 L10 86 M12 80 L14 85" stroke="#d0c8b0" strokeWidth="1" strokeLinecap="round" />
      <path d="M108 80 L112 84 M108 80 L110 86 M108 80 L106 85" stroke="#d0c8b0" strokeWidth="1" strokeLinecap="round" />
      {/* Skull */}
      <ellipse cx="60" cy="28" rx="16" ry="18" fill="#d0c8b0" stroke="#a09880" strokeWidth="1.5" />
      {/* Skull features */}
      <ellipse cx="53" cy="24" rx="4" ry="5" fill="#1a0a2a" />
      <ellipse cx="67" cy="24" rx="4" ry="5" fill="#1a0a2a" />
      {/* Glowing eyes */}
      <ellipse cx="53" cy="24" rx="2.5" ry="3" fill="#aa44ff">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="67" cy="24" rx="2.5" ry="3" fill="#aa44ff">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </ellipse>
      {/* Nose hole */}
      <path d="M58 30 L60 33 L62 30" fill="#a09880" stroke="#8a8070" strokeWidth="0.5" />
      {/* Teeth */}
      <path d="M52 36 L54 39 L56 36 L58 39 L60 36 L62 39 L64 36 L66 39 L68 36" fill="none" stroke="#d0c8b0" strokeWidth="1" />
      {/* Crown */}
      <path d="M44 14 L42 4 L48 10 L52 2 L56 10 L60 0 L64 10 L68 2 L72 10 L78 4 L76 14" fill="#4a2a6a" stroke="#6a4a8a" strokeWidth="1" />
      {/* Crown gems */}
      <circle cx="52" cy="8" r="1.5" fill="#ff44ff" />
      <circle cx="60" cy="5" r="2" fill="#44ffaa" />
      <circle cx="68" cy="8" r="1.5" fill="#ff44ff" />
      {/* Staff */}
      <line x1="105" y1="82" x2="100" y2="110" stroke="#5a4a3a" strokeWidth="2.5" />
      <circle cx="105" cy="78" r="5" fill="#6622aa" stroke="#4a1a8a" strokeWidth="1">
        <animate attributeName="fill" values="#6622aa;#aa44ff;#6622aa" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Floating particles */}
      <circle cx="40" cy="60" r="1.5" fill="#aa44ff" opacity="0.5">
        <animate attributeName="cy" values="60;50;60" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="55" r="1" fill="#aa44ff" opacity="0.4">
        <animate attributeName="cy" values="55;45;55" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
