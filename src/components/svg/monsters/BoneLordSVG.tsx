export default function BoneLordSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="boneLordArmor" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#555566" />
          <stop offset="50%" stopColor="#3a3a4a" />
          <stop offset="100%" stopColor="#2a2a3a" />
        </linearGradient>
        <linearGradient id="boneLordBlade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#99ccff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4488cc" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Bone crown */}
      <polygon points="42,12 44,2 48,10 52,0 56,10 60,1 64,10 68,0 72,10 76,2 78,12" fill="#e8dcc8" stroke="#8a8070" strokeWidth="1" />
      <rect x="42" y="12" width="36" height="5" fill="#d8cbb8" stroke="#8a8070" strokeWidth="0.5" rx="1" />
      <circle cx="52" cy="14" r="1.5" fill="#4488cc" opacity="0.7" />
      <circle cx="60" cy="13" r="2" fill="#66aaff" opacity="0.8" />
      <circle cx="68" cy="14" r="1.5" fill="#4488cc" opacity="0.7" />

      {/* Skull */}
      <ellipse cx="60" cy="24" rx="17" ry="16" fill="#e0d8c8" stroke="#8a8070" strokeWidth="1.5" />

      {/* Cheekbones */}
      <path d="M44 26 Q46 22 50 24" fill="none" stroke="#c8b8a8" strokeWidth="1.5" />
      <path d="M76 26 Q74 22 70 24" fill="none" stroke="#c8b8a8" strokeWidth="1.5" />

      {/* Eye sockets */}
      <ellipse cx="52" cy="22" rx="5.5" ry="6.5" fill="#0a0a1e" />
      <ellipse cx="68" cy="22" rx="5.5" ry="6.5" fill="#0a0a1e" />

      {/* Glowing blue eyes */}
      <circle cx="52" cy="22" r="3" fill="#4499ff">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="22" r="3" fill="#4499ff">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="52" cy="21" r="1.5" fill="#ccddff" opacity="0.9" />
      <circle cx="68" cy="21" r="1.5" fill="#ccddff" opacity="0.9" />

      {/* Nose */}
      <path d="M58 28 L60 33 L62 28" fill="none" stroke="#8a8070" strokeWidth="1" />

      {/* Teeth/jaw */}
      <path d="M48 34 L52 37 L56 34 L60 37 L64 34 L68 37 L72 34" fill="none" stroke="#e0d8c8" strokeWidth="1.5" />

      {/* Neck vertebrae */}
      <rect x="56" y="38" width="8" height="4" fill="#d0c8b8" stroke="#8a8070" strokeWidth="0.5" rx="1" />
      <rect x="55" y="41" width="10" height="3" fill="#d0c8b8" stroke="#8a8070" strokeWidth="0.5" rx="1" />

      {/* Ornate shoulder armor - left */}
      <path d="M22 40 Q16 48 20 60 Q28 64 38 56 Q42 48 38 40 Z" fill="url(#boneLordArmor)" stroke="#555" strokeWidth="1.5" />
      <circle cx="28" cy="50" r="4" fill="#444" stroke="#666" strokeWidth="0.5" />
      <circle cx="28" cy="50" r="2" fill="#e0d8c8" />
      <path d="M22 44 L36 44" stroke="#666" strokeWidth="0.8" />
      <path d="M21 54 L37 54" stroke="#666" strokeWidth="0.8" />

      {/* Ornate shoulder armor - right */}
      <path d="M98 40 Q104 48 100 60 Q92 64 82 56 Q78 48 82 40 Z" fill="url(#boneLordArmor)" stroke="#555" strokeWidth="1.5" />
      <circle cx="92" cy="50" r="4" fill="#444" stroke="#666" strokeWidth="0.5" />
      <circle cx="92" cy="50" r="2" fill="#e0d8c8" />
      <path d="M84 44 L98 44" stroke="#666" strokeWidth="0.8" />
      <path d="M83 54 L99 54" stroke="#666" strokeWidth="0.8" />

      {/* Chest armor */}
      <path d="M38 44 L60 40 L82 44 L80 80 Q60 84 40 80 Z" fill="url(#boneLordArmor)" stroke="#555" strokeWidth="1.5" />
      {/* Armor details - ribcage pattern on armor */}
      <path d="M44 52 Q60 48 76 52" fill="none" stroke="#666" strokeWidth="1" />
      <path d="M43 58 Q60 54 77 58" fill="none" stroke="#666" strokeWidth="1" />
      <path d="M44 64 Q60 60 76 64" fill="none" stroke="#666" strokeWidth="1" />
      <line x1="60" y1="42" x2="60" y2="78" stroke="#666" strokeWidth="1" />
      {/* Skull emblem on chest */}
      <circle cx="60" cy="54" r="5" fill="#3a3a4a" stroke="#888" strokeWidth="0.5" />
      <ellipse cx="58" cy="53" rx="1.5" ry="1.5" fill="#e0d8c8" />
      <ellipse cx="62" cy="53" rx="1.5" ry="1.5" fill="#e0d8c8" />
      <path d="M58 56 L60 57 L62 56" fill="none" stroke="#e0d8c8" strokeWidth="0.5" />

      {/* Bone arms */}
      <line x1="36" y1="48" x2="18" y2="68" stroke="#d0c8b8" strokeWidth="3" />
      <line x1="18" y1="68" x2="10" y2="56" stroke="#d0c8b8" strokeWidth="2.5" />
      <line x1="84" y1="48" x2="100" y2="65" stroke="#d0c8b8" strokeWidth="3" />
      <line x1="100" y1="65" x2="104" y2="50" stroke="#d0c8b8" strokeWidth="2.5" />

      {/* Spectral sword in right hand */}
      <rect x="102" y="18" width="4" height="34" fill="url(#boneLordBlade)" stroke="#6699cc" strokeWidth="0.5" rx="1">
        <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
      </rect>
      <polygon points="104,16 101,20 107,20" fill="#aaddff" opacity="0.8" />
      <rect x="99" y="50" width="10" height="3" fill="#444" stroke="#333" strokeWidth="0.5" rx="1" />
      <rect x="101" y="52" width="6" height="5" fill="#5c3a0a" stroke="#3a2a0a" strokeWidth="0.5" rx="1" />
      {/* Sword glow */}
      <rect x="103" y="20" width="2" height="30" fill="#ccddff" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
      </rect>

      {/* Bone hand on left (skeletal fingers) */}
      <path d="M10 56 L5 50 M10 56 L4 54 M10 56 L6 58" stroke="#d0c8b8" strokeWidth="1.5" />

      {/* Belt with bone buckle */}
      <rect x="36" y="78" width="48" height="5" fill="#444" stroke="#333" strokeWidth="1" rx="1" />
      <ellipse cx="60" cy="80" rx="4" ry="2.5" fill="#e0d8c8" stroke="#8a8070" strokeWidth="0.5" />

      {/* Leg armor */}
      <rect x="40" y="82" width="14" height="22" fill="#3a3a4a" stroke="#555" strokeWidth="1" rx="3" />
      <rect x="66" y="82" width="14" height="22" fill="#3a3a4a" stroke="#555" strokeWidth="1" rx="3" />
      <path d="M42 90 L52 90" stroke="#666" strokeWidth="0.8" />
      <path d="M68 90 L78 90" stroke="#666" strokeWidth="0.8" />
      <path d="M42 96 L52 96" stroke="#666" strokeWidth="0.8" />
      <path d="M68 96 L78 96" stroke="#666" strokeWidth="0.8" />

      {/* Bone feet */}
      <path d="M40 104 L36 110 L42 108 L46 112 L50 108 L54 110" stroke="#d0c8b8" strokeWidth="1.5" fill="none" />
      <path d="M66 104 L62 110 L68 108 L72 112 L76 108 L80 110" stroke="#d0c8b8" strokeWidth="1.5" fill="none" />

      {/* Spectral aura particles */}
      <circle cx="20" cy="40" r="1.5" fill="#66aaff" opacity="0.4">
        <animate attributeName="cy" values="40;32;40" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="100" cy="35" r="1" fill="#66aaff" opacity="0.3">
        <animate attributeName="cy" values="35;28;35" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="8" r="1" fill="#88ccff" opacity="0.5">
        <animate attributeName="cy" values="8;3;8" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
