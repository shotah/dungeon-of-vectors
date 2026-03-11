export default function LichOverlordSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="loRobe" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0a2a" />
          <stop offset="100%" stopColor="#050510" />
        </linearGradient>
        <radialGradient id="loAura" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#8844ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4422aa" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="loEnergy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6644ff" />
          <stop offset="100%" stopColor="#22aaff" />
        </linearGradient>
      </defs>
      {/* Arcane aura */}
      <circle cx="60" cy="50" r="50" fill="url(#loAura)" opacity="0.3">
        <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Floating shadow (above ground) */}
      <ellipse cx="60" cy="116" rx="24" ry="4" fill="#1a0a2a" opacity="0.4" />
      {/* Robe - elaborate, flowing */}
      <path d="M28 42 Q22 65 16 108 L104 108 Q98 65 92 42 Q80 30 60 28 Q40 30 28 42 Z" fill="url(#loRobe)" stroke="#0a0515" strokeWidth="1.5" />
      {/* Robe tattered bottom edges */}
      <path d="M16 108 L14 114 L20 108 L18 116 L26 108 L24 113 L30 108" fill="url(#loRobe)" stroke="#0a0515" strokeWidth="0.5" />
      <path d="M90 108 L88 113 L94 108 L92 116 L100 108 L102 114 L104 108" fill="url(#loRobe)" stroke="#0a0515" strokeWidth="0.5" />
      {/* Robe trim - ornate */}
      <path d="M18 106 Q60 96 102 106" fill="none" stroke="#6a4aaa" strokeWidth="1.2" />
      <path d="M22 102 Q60 94 98 102" fill="none" stroke="#5a3a8a" strokeWidth="0.6" />
      {/* Arcane runes on robe */}
      <circle cx="45" cy="70" r="4" fill="none" stroke="#8844ff" strokeWidth="0.6" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <line x1="43" y1="68" x2="47" y2="72" stroke="#8844ff" strokeWidth="0.4" opacity="0.5" />
      <line x1="47" y1="68" x2="43" y2="72" stroke="#8844ff" strokeWidth="0.4" opacity="0.5" />
      <circle cx="75" cy="65" r="3.5" fill="none" stroke="#8844ff" strokeWidth="0.6" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <line x1="73.5" y1="63.5" x2="76.5" y2="66.5" stroke="#8844ff" strokeWidth="0.4" opacity="0.4" />
      <line x1="76.5" y1="63.5" x2="73.5" y2="66.5" stroke="#8844ff" strokeWidth="0.4" opacity="0.4" />
      <circle cx="55" cy="88" r="3" fill="none" stroke="#6644ff" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="82" r="2.5" fill="none" stroke="#6644ff" strokeWidth="0.5" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.75;0.35" dur="2.8s" repeatCount="indefinite" />
      </circle>
      {/* Shoulder pauldrons - bone */}
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="#c0b890" stroke="#a09870" strokeWidth="0.8" />
      <ellipse cx="88" cy="44" rx="8" ry="4" fill="#c0b890" stroke="#a09870" strokeWidth="0.8" />
      <polygon points="28,42 24,34 32,40" fill="#c0b890" stroke="#a09870" strokeWidth="0.5" />
      <polygon points="92,42 96,34 88,40" fill="#c0b890" stroke="#a09870" strokeWidth="0.5" />
      {/* Arms with flowing sleeves */}
      <path d="M30 50 Q16 60 8 78 L12 82 L14 76" fill="#0a0515" stroke="#1a0a2a" strokeWidth="1" />
      <path d="M90 50 Q104 60 112 78 L108 82 L106 76" fill="#0a0515" stroke="#1a0a2a" strokeWidth="1" />
      {/* Skeletal hands */}
      <path d="M8 78 L3 74 M8 78 L2 78 M8 78 L4 82 M8 78 L6 85" stroke="#d0c8b0" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M112 78 L117 74 M112 78 L118 78 M112 78 L116 82 M112 78 L114 85" stroke="#d0c8b0" strokeWidth="1.2" strokeLinecap="round" />
      {/* Energy crackling from hands */}
      <path d="M3 74 Q0 68 4 64" fill="none" stroke="url(#loEnergy)" strokeWidth="1" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.8s" repeatCount="indefinite" />
      </path>
      <path d="M2 78 Q-2 74 1 70" fill="none" stroke="url(#loEnergy)" strokeWidth="0.8" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1s" repeatCount="indefinite" />
      </path>
      <circle cx="3" cy="66" r="2" fill="#8844ff" opacity="0.4">
        <animate attributeName="r" values="2;3;2" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <path d="M117 74 Q120 68 116 64" fill="none" stroke="url(#loEnergy)" strokeWidth="1" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="0.9s" repeatCount="indefinite" />
      </path>
      <path d="M118 78 Q122 74 119 70" fill="none" stroke="url(#loEnergy)" strokeWidth="0.8" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.1s" repeatCount="indefinite" />
      </path>
      <circle cx="117" cy="66" r="2" fill="#22aaff" opacity="0.4">
        <animate attributeName="r" values="2;3;2" dur="0.7s" repeatCount="indefinite" />
      </circle>
      {/* Skull */}
      <ellipse cx="60" cy="24" rx="17" ry="19" fill="#d0c8b0" stroke="#a09880" strokeWidth="1.5" />
      {/* Skull eye sockets */}
      <ellipse cx="52" cy="20" rx="5" ry="6" fill="#0a0515" />
      <ellipse cx="68" cy="20" rx="5" ry="6" fill="#0a0515" />
      {/* Intensely glowing eyes */}
      <ellipse cx="52" cy="20" rx="3" ry="4" fill="#8844ff">
        <animate attributeName="fill" values="#8844ff;#aa66ff;#8844ff" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="68" cy="20" rx="3" ry="4" fill="#22aaff">
        <animate attributeName="fill" values="#22aaff;#44ccff;#22aaff" dur="1.8s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="52" cy="19" rx="1.5" ry="2" fill="#fff" opacity="0.5" />
      <ellipse cx="68" cy="19" rx="1.5" ry="2" fill="#fff" opacity="0.5" />
      {/* Nose hole */}
      <path d="M58 28 L60 31 L62 28" fill="#a09880" stroke="#8a8070" strokeWidth="0.5" />
      {/* Teeth - more elaborate */}
      <path d="M50 34 L52 38 L54 34 L56 38 L58 34 L60 38 L62 34 L64 38 L66 34 L68 38 L70 34" fill="none" stroke="#d0c8b0" strokeWidth="1" />
      {/* Phylactery Crown - bone crown with glowing gems */}
      <path d="M42 10 L38 -2 L46 6 L50 -6 L54 6 L57 -8 L60 -10 L63 -8 L66 6 L70 -6 L74 6 L82 -2 L78 10" fill="#c0b890" stroke="#a09870" strokeWidth="1.2" />
      {/* Crown bone texture */}
      <path d="M42 10 Q60 6 78 10" fill="none" stroke="#a09870" strokeWidth="0.6" />
      {/* Phylactery gems - large, glowing */}
      <circle cx="60" cy="-2" r="3" fill="#ff22ff" stroke="#aa00aa" strokeWidth="0.5">
        <animate attributeName="fill" values="#ff22ff;#ff88ff;#ff22ff" dur="2s" repeatCount="indefinite" />
        <animate attributeName="r" values="3;3.5;3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="2" r="2.5" fill="#22ffaa" stroke="#00aa66" strokeWidth="0.5">
        <animate attributeName="fill" values="#22ffaa;#66ffcc;#22ffaa" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="2" r="2.5" fill="#22aaff" stroke="#0066aa" strokeWidth="0.5">
        <animate attributeName="fill" values="#22aaff;#66ccff;#22aaff" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="44" cy="6" r="1.5" fill="#ff4488" stroke="#aa2266" strokeWidth="0.5">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="76" cy="6" r="1.5" fill="#ff4488" stroke="#aa2266" strokeWidth="0.5">
        <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Floating soul particles */}
      <circle cx="35" cy="55" r="1.5" fill="#8844ff" opacity="0.5">
        <animate attributeName="cy" values="55;45;55" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="50" r="1" fill="#22aaff" opacity="0.4">
        <animate attributeName="cy" values="50;40;50" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="48" r="1.2" fill="#aa44ff" opacity="0.3">
        <animate attributeName="cy" values="48;38;48" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="72" cy="58" r="1" fill="#44aaff" opacity="0.35">
        <animate attributeName="cy" values="58;48;58" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
