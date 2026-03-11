export default function RatKingSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Tail coiled behind */}
      <path d="M95 80 Q110 60 105 45 Q100 30 112 20" fill="none" stroke="#6a5a4e" strokeWidth="4" strokeLinecap="round" />
      <path d="M88 90 Q108 85 115 95 Q118 105 108 110" fill="none" stroke="#6a5a4e" strokeWidth="3.5" strokeLinecap="round" />
      {/* Body - oversized */}
      <ellipse cx="60" cy="78" rx="38" ry="24" fill="#4a3a2e" stroke="#3a2a1e" strokeWidth="1.5" />
      {/* Belly lighter patch */}
      <ellipse cx="58" cy="82" rx="22" ry="13" fill="#5a4a3e" opacity="0.6" />
      {/* Fur texture on body */}
      <path d="M30 72 L32 68 M40 68 L42 64 M52 66 L54 62 M65 67 L67 63 M76 70 L78 66 M85 74 L87 70" stroke="#3a2a1e" strokeWidth="0.8" />
      <path d="M35 82 L33 86 M50 85 L48 89 M68 84 L70 88 M80 80 L82 84" stroke="#3a2a1e" strokeWidth="0.6" />
      {/* Scars on body */}
      <path d="M42 74 L52 70 L48 76" fill="none" stroke="#8a6a6a" strokeWidth="1.2" opacity="0.7" />
      <path d="M72 78 L80 73" fill="none" stroke="#8a6a6a" strokeWidth="1" opacity="0.6" />
      {/* Head - large and menacing */}
      <ellipse cx="30" cy="58" rx="22" ry="18" fill="#5a4a3e" stroke="#3a2a1e" strokeWidth="1.5" />
      {/* Scar across face */}
      <path d="M18 50 L38 62" fill="none" stroke="#9a6a6a" strokeWidth="1.5" opacity="0.8" />
      {/* Snout */}
      <ellipse cx="12" cy="62" rx="10" ry="7" fill="#6a5a4e" stroke="#3a2a1e" strokeWidth="1" />
      {/* Nose */}
      <circle cx="4" cy="60" r="3.5" fill="#cc5566" />
      {/* Glowing red eyes */}
      <circle cx="22" cy="50" r="5" fill="#ff0000" opacity="0.3" />
      <circle cx="22" cy="50" r="4" fill="#ff2200" />
      <circle cx="22" cy="50" r="2" fill="#ffaa00" />
      <circle cx="36" cy="48" r="4" fill="#ff0000" opacity="0.3" />
      <circle cx="36" cy="48" r="3.5" fill="#ff2200" />
      <circle cx="36" cy="48" r="1.8" fill="#ffaa00" />
      {/* Ears - tattered */}
      <path d="M38 42 L44 28 L48 44" fill="#5a4a3e" stroke="#3a2a1e" strokeWidth="1.2" />
      <path d="M40 40 L44 32 L46 42" fill="#aa6666" opacity="0.5" />
      <path d="M44 32 L46 30" fill="none" stroke="#3a2a1e" strokeWidth="1" />
      <path d="M22 42 L16 28 L12 40" fill="#5a4a3e" stroke="#3a2a1e" strokeWidth="1.2" />
      <path d="M20 40 L17 32 L14 39" fill="#aa6666" opacity="0.5" />
      {/* Whiskers - thick */}
      <line x1="8" y1="56" x2="-4" y2="50" stroke="#999" strokeWidth="0.7" />
      <line x1="8" y1="59" x2="-4" y2="58" stroke="#999" strokeWidth="0.7" />
      <line x1="8" y1="62" x2="-4" y2="66" stroke="#999" strokeWidth="0.7" />
      {/* Teeth - large fangs */}
      <path d="M8 66 L6 74 L10 68" fill="#eee" stroke="#ccc" strokeWidth="0.5" />
      <path d="M14 67 L13 73 L16 68" fill="#eee" stroke="#ccc" strokeWidth="0.5" />
      <path d="M18 67 L18 72 L21 68" fill="#ddd" stroke="#ccc" strokeWidth="0.5" />
      {/* Crown */}
      <polygon points="20,42 24,24 30,36 36,22 42,36 48,26 50,42" fill="#daa520" stroke="#b8860b" strokeWidth="1.2" />
      <polygon points="20,42 50,42 48,46 22,46" fill="#c99a18" stroke="#b8860b" strokeWidth="0.8" />
      {/* Crown jewels */}
      <circle cx="36" cy="28" r="2" fill="#ff2222" stroke="#cc0000" strokeWidth="0.5" />
      <circle cx="24" cy="30" r="1.5" fill="#4444ff" stroke="#2222cc" strokeWidth="0.5" />
      <circle cx="48" cy="32" r="1.5" fill="#22ff22" stroke="#00cc00" strokeWidth="0.5" />
      {/* Crown gold shine */}
      <line x1="30" y1="36" x2="30" y2="43" stroke="#f0d060" strokeWidth="0.4" opacity="0.5" />
      <line x1="42" y1="36" x2="42" y2="43" stroke="#f0d060" strokeWidth="0.4" opacity="0.5" />
      {/* Front legs - thick and clawed */}
      <rect x="32" y="94" width="10" height="16" fill="#4a3a2e" rx="4" />
      <rect x="52" y="96" width="10" height="14" fill="#4a3a2e" rx="4" />
      {/* Back legs */}
      <rect x="68" y="94" width="10" height="16" fill="#4a3a2e" rx="4" />
      <rect x="82" y="92" width="9" height="14" fill="#4a3a2e" rx="4" />
      {/* Claws - bigger */}
      <path d="M32 110 L28 116 M37 110 L37 116 M42 110 L46 116" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M68 110 L64 116 M73 110 L73 116 M78 110 L82 116" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M52 110 L50 115 M57 110 L57 115 M62 110 L64 115" stroke="#bbb" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
