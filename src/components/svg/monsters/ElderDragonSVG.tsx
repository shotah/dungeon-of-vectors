export default function ElderDragonSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="elderScale" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1a4a" />
          <stop offset="100%" stopColor="#1a0a2a" />
        </linearGradient>
        <radialGradient id="elderGlow" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#aa66ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6633aa" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Arcane aura */}
      <circle cx="60" cy="45" r="45" fill="url(#elderGlow)" opacity="0.25">
        <animate attributeName="r" values="45;50;45" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Wings - massive */}
      <path d="M22 32 L0 -5 L6 18 L2 0 L10 22 L4 5 L14 26 L6 12 L18 30 Q22 36 28 40" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      <path d="M98 32 L120 -5 L114 18 L118 0 L110 22 L116 5 L106 26 L114 12 L102 30 Q98 36 92 40" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      {/* Wing membrane glow */}
      <path d="M22 32 L4 5 L14 26" fill="#6a3aaa" opacity="0.2" />
      <path d="M98 32 L116 5 L106 26" fill="#6a3aaa" opacity="0.2" />
      {/* Body */}
      <path d="M32 42 Q26 60 30 90 L90 90 Q94 60 88 42 Q76 30 60 28 Q44 30 32 42 Z" fill="url(#elderScale)" stroke="#0a0a1a" strokeWidth="1.5" />
      {/* Belly scales */}
      <path d="M44 50 Q60 47 76 50 L74 90 L46 90 Z" fill="#5a3a8a" opacity="0.35" />
      <line x1="52" y1="55" x2="52" y2="88" stroke="#4a2a7a" strokeWidth="0.5" />
      <line x1="60" y1="53" x2="60" y2="88" stroke="#4a2a7a" strokeWidth="0.5" />
      <line x1="68" y1="55" x2="68" y2="88" stroke="#4a2a7a" strokeWidth="0.5" />
      {/* Neck */}
      <path d="M48 36 Q52 22 54 14 Q58 10 60 10 Q62 10 66 14 Q68 22 72 36" fill="url(#elderScale)" stroke="#0a0a1a" strokeWidth="1" />
      {/* Head - larger than regular dragon */}
      <path d="M40 16 Q34 8 32 0 Q42 -8 60 -10 Q78 -8 88 0 Q86 8 80 16 Q70 22 60 22 Q50 22 40 16 Z" fill="url(#elderScale)" stroke="#0a0a1a" strokeWidth="1.5" />
      {/* Multiple horns */}
      <path d="M38 2 L30 -14 L36 0" fill="#3a1a3a" stroke="#2a0a2a" strokeWidth="1" />
      <path d="M82 2 L90 -14 L84 0" fill="#3a1a3a" stroke="#2a0a2a" strokeWidth="1" />
      <path d="M44 -2 L40 -10 L46 -1" fill="#3a1a3a" stroke="#2a0a2a" strokeWidth="0.8" />
      <path d="M76 -2 L80 -10 L74 -1" fill="#3a1a3a" stroke="#2a0a2a" strokeWidth="0.8" />
      {/* Eyes - glowing purple */}
      <ellipse cx="50" cy="6" rx="5" ry="4" fill="#cc66ff" stroke="#8833bb" strokeWidth="0.5">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="70" cy="6" rx="5" ry="4" fill="#cc66ff" stroke="#8833bb" strokeWidth="0.5">
        <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="51" cy="6" rx="2.5" ry="4" fill="#fff" opacity="0.7" />
      <ellipse cx="71" cy="6" rx="2.5" ry="4" fill="#fff" opacity="0.7" />
      {/* Nostrils with energy */}
      <circle cx="55" cy="-2" r="2" fill="#1a0a2a" />
      <circle cx="65" cy="-2" r="2" fill="#1a0a2a" />
      <circle cx="55" cy="-5" r="2.5" fill="#aa66ff" opacity="0.3">
        <animate attributeName="cy" values="-5;-10;-5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="65" cy="-5" r="2.5" fill="#aa66ff" opacity="0.3">
        <animate attributeName="cy" values="-5;-10;-5" dur="2.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2.3s" repeatCount="indefinite" />
      </circle>
      {/* Mouth with many teeth */}
      <path d="M44 14 Q60 20 76 14" fill="#0a0a1a" stroke="#1a0a2a" strokeWidth="0.5" />
      <path d="M46 14 L48 18" stroke="#e0d8f0" strokeWidth="0.8" />
      <path d="M52 15 L53 19" stroke="#e0d8f0" strokeWidth="0.8" />
      <path d="M58 16 L59 20" stroke="#e0d8f0" strokeWidth="0.8" />
      <path d="M64 16 L63 20" stroke="#e0d8f0" strokeWidth="0.8" />
      <path d="M70 15 L69 19" stroke="#e0d8f0" strokeWidth="0.8" />
      <path d="M76 14 L74 18" stroke="#e0d8f0" strokeWidth="0.8" />
      {/* Arms/Claws */}
      <path d="M32 50 Q18 58 10 72 L14 76 L16 70 L13 78 L18 73 L15 80 L20 74" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      <path d="M88 50 Q102 58 110 72 L106 76 L104 70 L107 78 L102 73 L105 80 L100 74" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      {/* Legs */}
      <path d="M38 85 L32 105 L27 110 L32 106 L36 110 L40 106 L38 88" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      <path d="M82 85 L88 105 L83 110 L88 106 L92 110 L96 106 L82 88" fill="#3a1a5a" stroke="#2a0a4a" strokeWidth="1" />
      {/* Tail */}
      <path d="M60 90 Q72 96 85 100 Q98 104 108 96 Q112 90 118 94" fill="none" stroke="#3a1a5a" strokeWidth="5" strokeLinecap="round" />
      <path d="M118 94 L120 88 L120 100 Z" fill="#5a2a8a" />
      {/* Arcane runes on body */}
      <circle cx="55" cy="65" r="3" fill="none" stroke="#aa66ff" strokeWidth="0.5" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="65" cy="60" r="2.5" fill="none" stroke="#aa66ff" strokeWidth="0.5" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
