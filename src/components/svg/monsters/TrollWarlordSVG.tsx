export default function TrollWarlordSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Massive body */}
      <path d="M22 40 Q18 58 20 95 L100 95 Q102 58 98 40 Z" fill="#4a6a3a" stroke="#2a4a1a" strokeWidth="1.5" />

      {/* Chest plate armor */}
      <path d="M32 42 L60 38 L88 42 L85 78 Q60 82 35 78 Z" fill="#606060" stroke="#404040" strokeWidth="1.5" />
      <path d="M60 38 L60 78" stroke="#505050" strokeWidth="1" />
      <path d="M42 50 Q60 46 78 50" fill="none" stroke="#707070" strokeWidth="1" />
      <path d="M40 60 Q60 56 80 60" fill="none" stroke="#707070" strokeWidth="1" />
      <path d="M38 70 Q60 66 82 70" fill="none" stroke="#707070" strokeWidth="1" />

      {/* Left shoulder armor */}
      <path d="M15 35 Q10 42 15 55 Q22 58 30 50 Q32 42 28 35 Z" fill="#707070" stroke="#404040" strokeWidth="1.5" />
      <circle cx="22" cy="45" r="3" fill="#808080" stroke="#555" strokeWidth="0.5" />
      <path d="M16 38 L28 38" stroke="#555" strokeWidth="1" />
      <path d="M15 48 L29 48" stroke="#555" strokeWidth="1" />

      {/* Right shoulder armor */}
      <path d="M105 35 Q110 42 105 55 Q98 58 90 50 Q88 42 92 35 Z" fill="#707070" stroke="#404040" strokeWidth="1.5" />
      <circle cx="98" cy="45" r="3" fill="#808080" stroke="#555" strokeWidth="0.5" />
      <path d="M92 38 L104 38" stroke="#555" strokeWidth="1" />
      <path d="M91 48 L105 48" stroke="#555" strokeWidth="1" />

      {/* Head (larger than regular troll) */}
      <ellipse cx="60" cy="24" rx="24" ry="20" fill="#5a7a4a" stroke="#2a4a1a" strokeWidth="1.5" />

      {/* Heavy brow ridge */}
      <path d="M38 18 Q48 10 60 16 Q72 10 82 18" fill="#4a6a3a" stroke="#2a4a1a" strokeWidth="1.5" />

      {/* Small angry eyes */}
      <ellipse cx="49" cy="22" rx="4" ry="2.5" fill="#ff4400" />
      <ellipse cx="71" cy="22" rx="4" ry="2.5" fill="#ff4400" />
      <circle cx="50" cy="22" r="1.5" fill="#220000" />
      <circle cx="72" cy="22" r="1.5" fill="#220000" />

      {/* Battle scar across left eye */}
      <line x1="42" y1="16" x2="55" y2="28" stroke="#3a5a2a" strokeWidth="1.5" />

      {/* Big nose */}
      <ellipse cx="60" cy="30" rx="7" ry="6" fill="#4a7a3a" stroke="#2a4a1a" strokeWidth="1" />

      {/* Mouth with large tusks */}
      <path d="M42 36 Q60 44 78 36" fill="#2a1a0a" stroke="#2a4a1a" strokeWidth="1" />
      <path d="M46 37 L44 30" stroke="#eee" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M74 37 L76 30" stroke="#eee" strokeWidth="2.5" strokeLinecap="round" />

      {/* Warts and battle damage */}
      <circle cx="40" cy="28" r="2.5" fill="#3a5a2a" />
      <circle cx="82" cy="30" r="2" fill="#3a5a2a" />
      <line x1="75" y1="32" x2="82" y2="38" stroke="#3a5a2a" strokeWidth="1" />

      {/* Ears (larger, torn) */}
      <path d="M36 20 Q28 14 30 28 Q32 34 36 30" fill="#5a7a4a" stroke="#2a4a1a" strokeWidth="1" />
      <path d="M84 20 Q92 14 90 28 Q88 34 84 30" fill="#5a7a4a" stroke="#2a4a1a" strokeWidth="1" />
      <line x1="30" y1="22" x2="33" y2="20" stroke="#3a5a2a" strokeWidth="1" />

      {/* Massive arms */}
      <path d="M22 45 Q8 60 5 82 L14 86 Q15 65 28 50" fill="#4a6a3a" stroke="#2a4a1a" strokeWidth="1.5" />
      <path d="M98 45 Q112 60 115 82 L106 86 Q105 65 92 50" fill="#4a6a3a" stroke="#2a4a1a" strokeWidth="1.5" />

      {/* Arm bracers */}
      <rect x="8" y="68" width="10" height="8" fill="#606060" stroke="#404040" strokeWidth="1" rx="1" />
      <rect x="102" y="68" width="10" height="8" fill="#606060" stroke="#404040" strokeWidth="1" rx="1" />

      {/* Fists */}
      <circle cx="10" cy="85" r="8" fill="#5a7a4a" stroke="#2a4a1a" strokeWidth="1" />
      <circle cx="110" cy="85" r="8" fill="#5a7a4a" stroke="#2a4a1a" strokeWidth="1" />

      {/* Huge spiked mace in right hand */}
      <rect x="107" y="55" width="5" height="32" fill="#5c3a0a" stroke="#3a2a0a" strokeWidth="1" rx="1" />
      <circle cx="109" cy="52" r="8" fill="#555" stroke="#333" strokeWidth="1.5" />
      <polygon points="109,42 107,44 111,44" fill="#888" />
      <polygon points="101,52 103,50 103,54" fill="#888" />
      <polygon points="117,52 115,50 115,54" fill="#888" />
      <polygon points="109,62 107,60 111,60" fill="#888" />
      <polygon points="103,46 105,44 105,48" fill="#888" />
      <polygon points="115,46 113,44 113,48" fill="#888" />

      {/* Belt */}
      <rect x="28" y="82" width="64" height="6" fill="#5c3a0a" stroke="#3a2a0a" strokeWidth="1" rx="1" />
      <ellipse cx="60" cy="85" rx="5" ry="3" fill="#cc9900" stroke="#886600" strokeWidth="0.5" />

      {/* Legs (thick) */}
      <rect x="34" y="92" width="18" height="20" fill="#4a6a3a" rx="5" />
      <rect x="68" y="92" width="18" height="20" fill="#4a6a3a" rx="5" />

      {/* Leg armor */}
      <rect x="34" y="92" width="18" height="8" fill="#606060" stroke="#404040" strokeWidth="1" rx="2" />
      <rect x="68" y="92" width="18" height="8" fill="#606060" stroke="#404040" strokeWidth="1" rx="2" />

      {/* Feet */}
      <ellipse cx="43" cy="114" rx="13" ry="6" fill="#3a5a2a" />
      <ellipse cx="77" cy="114" rx="13" ry="6" fill="#3a5a2a" />
    </svg>
  );
}
