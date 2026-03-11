export default function DragonMatriarchSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="dmScale" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a6a3a" />
          <stop offset="100%" stopColor="#0a3a1a" />
        </linearGradient>
        <linearGradient id="dmBelly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8a832" />
          <stop offset="100%" stopColor="#8a7422" />
        </linearGradient>
        <radialGradient id="dmGlow" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#ffcc44" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#aa8800" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Golden aura */}
      <circle cx="60" cy="45" r="48" fill="url(#dmGlow)" opacity="0.25">
        <animate attributeName="r" values="48;53;48" dur="4s" repeatCount="indefinite" />
      </circle>
      {/* Wings - massive, ornate */}
      <path d="M24 34 L0 -4 L8 18 L2 0 L14 24 L4 6 L18 28 L6 12 L22 32 Q26 38 32 44" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      <path d="M96 34 L120 -4 L112 18 L118 0 L106 24 L116 6 L102 28 L114 12 L98 32 Q94 38 88 44" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      {/* Wing gold trim */}
      <path d="M0 -4 L8 18" fill="none" stroke="#c8a832" strokeWidth="0.6" opacity="0.6" />
      <path d="M2 0 L14 24" fill="none" stroke="#c8a832" strokeWidth="0.6" opacity="0.6" />
      <path d="M120 -4 L112 18" fill="none" stroke="#c8a832" strokeWidth="0.6" opacity="0.6" />
      <path d="M118 0 L106 24" fill="none" stroke="#c8a832" strokeWidth="0.6" opacity="0.6" />
      {/* Body */}
      <path d="M30 44 Q24 62 28 92 L92 92 Q96 62 90 44 Q78 30 60 28 Q42 30 30 44 Z" fill="url(#dmScale)" stroke="#063a1a" strokeWidth="1.5" />
      {/* Belly / chest scales - gold */}
      <path d="M42 50 Q60 46 78 50 L76 90 L44 90 Z" fill="url(#dmBelly)" opacity="0.4" />
      {/* Scale pattern lines */}
      <path d="M48 56 Q60 54 72 56" fill="none" stroke="#8a7422" strokeWidth="0.5" />
      <path d="M46 64 Q60 62 74 64" fill="none" stroke="#8a7422" strokeWidth="0.5" />
      <path d="M46 72 Q60 70 74 72" fill="none" stroke="#8a7422" strokeWidth="0.5" />
      <path d="M46 80 Q60 78 74 80" fill="none" stroke="#8a7422" strokeWidth="0.5" />
      {/* Neck - long, graceful */}
      <path d="M46 36 Q50 20 52 12 Q56 8 60 8 Q64 8 68 12 Q70 20 74 36" fill="url(#dmScale)" stroke="#063a1a" strokeWidth="1" />
      {/* Head */}
      <path d="M38 14 Q32 6 34 -2 Q44 -10 60 -12 Q76 -10 86 -2 Q88 6 82 14 Q70 20 60 20 Q50 20 38 14 Z" fill="url(#dmScale)" stroke="#063a1a" strokeWidth="1.5" />
      {/* Crown-like horn crest - multiple horns */}
      <path d="M40 -4 L34 -18 L42 -6" fill="#c8a832" stroke="#8a7422" strokeWidth="0.8" />
      <path d="M80 -4 L86 -18 L78 -6" fill="#c8a832" stroke="#8a7422" strokeWidth="0.8" />
      <path d="M48 -8 L46 -20 L50 -9" fill="#c8a832" stroke="#8a7422" strokeWidth="0.8" />
      <path d="M72 -8 L74 -20 L70 -9" fill="#c8a832" stroke="#8a7422" strokeWidth="0.8" />
      <path d="M60 -12 L60 -24 L60 -12" fill="#c8a832" stroke="#8a7422" strokeWidth="0.8" />
      {/* Crown connecting band */}
      <path d="M40 -4 Q50 -8 60 -10 Q70 -8 80 -4" fill="none" stroke="#c8a832" strokeWidth="1.2" />
      {/* Crown gems */}
      <circle cx="60" cy="-14" r="2" fill="#ff4444" stroke="#cc2222" strokeWidth="0.5">
        <animate attributeName="fill" values="#ff4444;#ff8844;#ff4444" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="47" cy="-10" r="1.5" fill="#44ddff" />
      <circle cx="73" cy="-10" r="1.5" fill="#44ddff" />
      {/* Eyes - emerald with gold slit */}
      <ellipse cx="50" cy="4" rx="5" ry="4" fill="#22cc66" stroke="#116633" strokeWidth="0.5" />
      <ellipse cx="70" cy="4" rx="5" ry="4" fill="#22cc66" stroke="#116633" strokeWidth="0.5" />
      <ellipse cx="50" cy="4" rx="1.5" ry="4" fill="#ffcc00" />
      <ellipse cx="70" cy="4" rx="1.5" ry="4" fill="#ffcc00" />
      {/* Nostrils */}
      <circle cx="55" cy="-4" r="1.5" fill="#063a1a" />
      <circle cx="65" cy="-4" r="1.5" fill="#063a1a" />
      {/* Fire breath */}
      <ellipse cx="60" cy="-6" rx="6" ry="3" fill="#ff6600" opacity="0.3">
        <animate attributeName="ry" values="3;6;3" dur="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="60" cy="-8" rx="4" ry="2" fill="#ffcc00" opacity="0.2">
        <animate attributeName="ry" values="2;4;2" dur="1s" repeatCount="indefinite" />
      </ellipse>
      {/* Mouth with teeth */}
      <path d="M42 12 Q60 18 78 12" fill="#0a1a0a" stroke="#063a1a" strokeWidth="0.5" />
      <path d="M44 12 L46 16" stroke="#e8e0d0" strokeWidth="0.8" />
      <path d="M52 13 L53 17" stroke="#e8e0d0" strokeWidth="0.8" />
      <path d="M60 14 L60 18" stroke="#e8e0d0" strokeWidth="0.8" />
      <path d="M68 13 L67 17" stroke="#e8e0d0" strokeWidth="0.8" />
      <path d="M76 12 L74 16" stroke="#e8e0d0" strokeWidth="0.8" />
      {/* Arms / forelegs with claws */}
      <path d="M30 50 Q16 58 8 74 L12 78 L14 72 L10 80 L16 74 L12 82 L18 76" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      <path d="M90 50 Q104 58 112 74 L108 78 L106 72 L110 80 L104 74 L108 82 L102 76" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      {/* Gold claw tips */}
      <path d="M8 74 L4 70" stroke="#c8a832" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 80 L6 82" stroke="#c8a832" strokeWidth="1" strokeLinecap="round" />
      <path d="M112 74 L116 70" stroke="#c8a832" strokeWidth="1" strokeLinecap="round" />
      <path d="M110 80 L114 82" stroke="#c8a832" strokeWidth="1" strokeLinecap="round" />
      {/* Legs */}
      <path d="M36 86 L30 104 L26 110 L30 106 L34 110 L38 106 L40 90" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      <path d="M84 86 L90 104 L86 110 L90 106 L94 110 L98 106 L84 90" fill="#0a4a2a" stroke="#063a1a" strokeWidth="1" />
      {/* Tail - thick, powerful */}
      <path d="M60 92 Q74 98 88 102 Q100 106 110 98 Q114 92 120 96" fill="none" stroke="#0a4a2a" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M120 96 L120 90 L120 102 Z" fill="#1a6a3a" />
      {/* Gold scale accents on shoulders */}
      <circle cx="34" cy="48" r="2" fill="#c8a832" opacity="0.5" />
      <circle cx="86" cy="48" r="2" fill="#c8a832" opacity="0.5" />
      <circle cx="38" cy="54" r="1.5" fill="#c8a832" opacity="0.4" />
      <circle cx="82" cy="54" r="1.5" fill="#c8a832" opacity="0.4" />
    </svg>
  );
}
