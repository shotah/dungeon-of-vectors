export default function SpiderQueenSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Web backdrop */}
      <line x1="0" y1="0" x2="60" y2="40" stroke="#888" strokeWidth="0.4" opacity="0.3" />
      <line x1="120" y1="0" x2="60" y2="40" stroke="#888" strokeWidth="0.4" opacity="0.3" />
      <line x1="0" y1="50" x2="38" y2="48" stroke="#888" strokeWidth="0.3" opacity="0.25" />
      <line x1="120" y1="50" x2="82" y2="48" stroke="#888" strokeWidth="0.3" opacity="0.25" />
      {/* Egg sac */}
      <ellipse cx="60" cy="102" rx="16" ry="12" fill="#4a3060" stroke="#3a2050" strokeWidth="1" opacity="0.9" />
      <ellipse cx="60" cy="102" rx="12" ry="9" fill="#5a4070" opacity="0.5" />
      {/* Tiny eggs visible inside */}
      <circle cx="53" cy="100" r="2" fill="#8a70a0" opacity="0.7" />
      <circle cx="60" cy="98" r="2.2" fill="#8a70a0" opacity="0.7" />
      <circle cx="67" cy="100" r="2" fill="#8a70a0" opacity="0.7" />
      <circle cx="56" cy="104" r="1.8" fill="#9a80b0" opacity="0.6" />
      <circle cx="64" cy="104" r="1.8" fill="#9a80b0" opacity="0.6" />
      {/* Silk connecting egg sac */}
      <path d="M48 88 Q50 95 44 102" stroke="#aaa" strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M72 88 Q70 95 76 102" stroke="#aaa" strokeWidth="0.6" fill="none" opacity="0.4" />
      {/* Abdomen - large with markings */}
      <ellipse cx="60" cy="72" rx="26" ry="22" fill="#1a0a2a" stroke="#100820" strokeWidth="1.5" />
      {/* Ornate abdomen markings */}
      <path d="M42 64 Q60 54 78 64" fill="none" stroke="#9933ff" strokeWidth="2" opacity="0.8" />
      <path d="M45 72 Q60 62 75 72" fill="none" stroke="#7722cc" strokeWidth="1.5" opacity="0.7" />
      <path d="M48 80 Q60 72 72 80" fill="none" stroke="#5511aa" strokeWidth="1.2" opacity="0.6" />
      {/* Diamond marking */}
      <polygon points="60,58 66,68 60,78 54,68" fill="none" stroke="#bb55ff" strokeWidth="1" opacity="0.7" />
      <polygon points="60,62 63,68 60,74 57,68" fill="#6622aa" opacity="0.4" />
      {/* Dot accents on abdomen */}
      <circle cx="48" cy="68" r="1.5" fill="#9933ff" opacity="0.6" />
      <circle cx="72" cy="68" r="1.5" fill="#9933ff" opacity="0.6" />
      <circle cx="45" cy="78" r="1.2" fill="#7722cc" opacity="0.5" />
      <circle cx="75" cy="78" r="1.2" fill="#7722cc" opacity="0.5" />
      {/* Cephalothorax */}
      <ellipse cx="60" cy="44" rx="18" ry="14" fill="#2a1040" stroke="#100820" strokeWidth="1.5" />
      {/* Glowing green eyes (8) */}
      <circle cx="50" cy="38" r="4" fill="#00ff00" opacity="0.25" />
      <circle cx="50" cy="38" r="3.5" fill="#00ff44" />
      <circle cx="50" cy="38" r="1.5" fill="#aaffaa" />
      <circle cx="70" cy="38" r="4" fill="#00ff00" opacity="0.25" />
      <circle cx="70" cy="38" r="3.5" fill="#00ff44" />
      <circle cx="70" cy="38" r="1.5" fill="#aaffaa" />
      <circle cx="56" cy="34" r="2.5" fill="#00dd33" />
      <circle cx="64" cy="34" r="2.5" fill="#00dd33" />
      <circle cx="52" cy="44" r="1.8" fill="#00aa22" />
      <circle cx="68" cy="44" r="1.8" fill="#00aa22" />
      <circle cx="57" cy="32" r="1.2" fill="#33ff66" />
      <circle cx="63" cy="32" r="1.2" fill="#33ff66" />
      {/* Extra large fangs - dripping venom */}
      <path d="M54 50 L50 62 L56 54" fill="#aaa" stroke="#888" strokeWidth="0.8" />
      <path d="M66 50 L70 62 L64 54" fill="#aaa" stroke="#888" strokeWidth="0.8" />
      {/* Fang tips */}
      <circle cx="50" cy="62" r="1" fill="#ccc" />
      <circle cx="70" cy="62" r="1" fill="#ccc" />
      {/* Venom drips */}
      <ellipse cx="50" cy="66" rx="1" ry="2" fill="#44ff44" opacity="0.7" />
      <circle cx="51" cy="70" r="0.8" fill="#44ff44" opacity="0.5" />
      <ellipse cx="70" cy="65" rx="1" ry="1.8" fill="#44ff44" opacity="0.7" />
      <circle cx="69" cy="69" r="0.7" fill="#44ff44" opacity="0.4" />
      {/* Chelicerae / pedipalps */}
      <path d="M55 48 Q52 50 53 54" fill="none" stroke="#2a1040" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 48 Q68 50 67 54" fill="none" stroke="#2a1040" strokeWidth="2" strokeLinecap="round" />
      {/* Legs - Left side */}
      <path d="M42 40 Q20 24 6 12" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 12 L2 20" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 44 Q18 34 4 30" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M4 30 L0 38" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 48 Q16 50 2 54" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M2 54 L0 62" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M43 54 Q22 66 6 80" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M6 80 L2 88" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Legs - Right side */}
      <path d="M78 40 Q100 24 114 12" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M114 12 L118 20" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 44 Q102 34 116 30" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M116 30 L120 38" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 48 Q104 50 118 54" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M118 54 L120 62" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M77 54 Q98 66 114 80" fill="none" stroke="#1a0a2a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M114 80 L118 88" stroke="#1a0a2a" strokeWidth="2.5" strokeLinecap="round" />
      {/* Purple highlight on leg joints */}
      <circle cx="42" cy="40" r="2" fill="#4a2070" opacity="0.6" />
      <circle cx="42" cy="44" r="2" fill="#4a2070" opacity="0.6" />
      <circle cx="78" cy="40" r="2" fill="#4a2070" opacity="0.6" />
      <circle cx="78" cy="44" r="2" fill="#4a2070" opacity="0.6" />
    </svg>
  );
}
