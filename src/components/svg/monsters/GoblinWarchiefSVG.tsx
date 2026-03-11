export default function GoblinWarchiefSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* War banner pole */}
      <line x1="92" y1="8" x2="92" y2="100" stroke="#8B7355" strokeWidth="3" />
      <line x1="92" y1="8" x2="92" y2="100" stroke="#a08060" strokeWidth="1" opacity="0.4" />
      {/* Banner */}
      <path d="M94 10 L115 14 Q112 26 115 38 L94 42 Z" fill="#8B0000" stroke="#660000" strokeWidth="1" />
      <path d="M98 18 L108 20 M98 24 L105 25 M98 30 L110 31" stroke="#aa2222" strokeWidth="0.8" opacity="0.6" />
      {/* Skull emblem on banner */}
      <circle cx="104" cy="26" r="4" fill="#ddd" stroke="#999" strokeWidth="0.5" />
      <circle cx="102" cy="25" r="1" fill="#333" />
      <circle cx="106" cy="25" r="1" fill="#333" />
      <path d="M102 28 L104 27 L106 28" fill="none" stroke="#333" strokeWidth="0.5" />
      {/* Body - large and armored */}
      <path d="M35 52 Q30 68 33 92 L82 92 Q85 68 80 52 Z" fill="#4a7a2a" stroke="#2a5a1a" strokeWidth="1.5" />
      {/* Iron chest plate */}
      <path d="M40 54 L75 54 L72 78 L43 78 Z" fill="#666" stroke="#444" strokeWidth="1.5" />
      <path d="M43 78 L72 78 L70 88 L45 88 Z" fill="#5a5a5a" stroke="#444" strokeWidth="1" />
      {/* Armor rivets */}
      <circle cx="46" cy="58" r="1.5" fill="#888" stroke="#555" strokeWidth="0.5" />
      <circle cx="69" cy="58" r="1.5" fill="#888" stroke="#555" strokeWidth="0.5" />
      <circle cx="46" cy="68" r="1.5" fill="#888" stroke="#555" strokeWidth="0.5" />
      <circle cx="69" cy="68" r="1.5" fill="#888" stroke="#555" strokeWidth="0.5" />
      <circle cx="57" cy="62" r="1.5" fill="#888" stroke="#555" strokeWidth="0.5" />
      {/* Armor scratch marks */}
      <path d="M50 60 L55 64 M62 58 L66 63" stroke="#777" strokeWidth="0.6" opacity="0.6" />
      {/* Shoulder pads */}
      <ellipse cx="36" cy="54" rx="10" ry="6" fill="#5a5a5a" stroke="#444" strokeWidth="1.2" />
      <ellipse cx="79" cy="54" rx="10" ry="6" fill="#5a5a5a" stroke="#444" strokeWidth="1.2" />
      {/* Shoulder spikes */}
      <polygon points="30,50 28,42 34,50" fill="#777" stroke="#555" strokeWidth="0.8" />
      <polygon points="36,48 36,40 40,49" fill="#777" stroke="#555" strokeWidth="0.8" />
      <polygon points="84,50 86,42 80,50" fill="#777" stroke="#555" strokeWidth="0.8" />
      <polygon points="78,48 78,40 74,49" fill="#777" stroke="#555" strokeWidth="0.8" />
      {/* Head - large */}
      <ellipse cx="57" cy="32" rx="20" ry="22" fill="#5a8a3a" stroke="#2a5a1a" strokeWidth="1.5" />
      {/* Helmet */}
      <path d="M37 28 Q57 6 77 28 L74 34 L40 34 Z" fill="#666" stroke="#444" strokeWidth="1.2" />
      <path d="M57 8 L57 34" stroke="#777" strokeWidth="1" />
      <path d="M40 28 L74 28" stroke="#555" strokeWidth="0.8" />
      {/* Helmet nose guard */}
      <rect x="55" y="28" width="4" height="14" fill="#5a5a5a" stroke="#444" strokeWidth="0.8" rx="1" />
      {/* Ears (poking out of helmet) */}
      <path d="M37 32 L18 22 L34 38" fill="#5a8a3a" stroke="#2a5a1a" strokeWidth="1.5" />
      <path d="M77 32 L96 22 L80 38" fill="#5a8a3a" stroke="#2a5a1a" strokeWidth="1.5" />
      <path d="M37 32 L22 25 L34 38" fill="#7aaa4a" opacity="0.4" />
      <path d="M77 32 L92 25 L80 38" fill="#7aaa4a" opacity="0.4" />
      {/* Eyes - fierce yellow */}
      <ellipse cx="48" cy="34" rx="6" ry="4" fill="#ffdd00" />
      <ellipse cx="66" cy="34" rx="6" ry="4" fill="#ffdd00" />
      <ellipse cx="49" cy="34" rx="3" ry="3" fill="#111" />
      <ellipse cx="67" cy="34" rx="3" ry="3" fill="#111" />
      <circle cx="48" cy="33" r="1" fill="#fff" opacity="0.6" />
      <circle cx="66" cy="33" r="1" fill="#fff" opacity="0.6" />
      {/* War paint under eyes */}
      <path d="M42 37 L44 40 L46 37" fill="#8B0000" opacity="0.7" />
      <path d="M68 37 L70 40 L72 37" fill="#8B0000" opacity="0.7" />
      {/* Nose */}
      <ellipse cx="57" cy="42" rx="5" ry="3.5" fill="#4a7a2a" stroke="#2a5a1a" strokeWidth="0.8" />
      {/* Mouth with big fangs */}
      <path d="M44 48 Q57 56 70 48" fill="none" stroke="#2a4a1a" strokeWidth="1.8" />
      <path d="M46 48 L48 55 L50 48" fill="#fff" stroke="#ddd" strokeWidth="0.3" />
      <path d="M54 49 L55 54 L57 50" fill="#fff" stroke="#ddd" strokeWidth="0.3" />
      <path d="M64 48 L66 55 L68 48" fill="#fff" stroke="#ddd" strokeWidth="0.3" />
      {/* Left arm with axe */}
      <line x1="35" y1="58" x2="14" y2="78" stroke="#4a7a2a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="14" cy="78" r="3" fill="#4a7a2a" stroke="#2a5a1a" strokeWidth="1" />
      {/* War axe */}
      <rect x="6" y="62" width="3" height="30" fill="#8B7355" stroke="#6a5a3a" strokeWidth="0.8" rx="1" />
      <path d="M1 64 Q-2 70 1 76 L9 76 Q12 70 9 64 Z" fill="#888" stroke="#555" strokeWidth="1" />
      <path d="M3 66 Q1 70 3 74" fill="none" stroke="#aaa" strokeWidth="0.5" />
      {/* Right arm */}
      <line x1="80" y1="58" x2="90" y2="80" stroke="#4a7a2a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="90" cy="80" r="3" fill="#4a7a2a" stroke="#2a5a1a" strokeWidth="1" />
      {/* Legs - armored */}
      <rect x="42" y="90" width="10" height="20" fill="#4a7a2a" rx="3" />
      <rect x="62" y="90" width="10" height="20" fill="#4a7a2a" rx="3" />
      {/* Leg armor / greaves */}
      <rect x="41" y="92" width="12" height="8" fill="#5a5a5a" stroke="#444" strokeWidth="0.8" rx="2" />
      <rect x="61" y="92" width="12" height="8" fill="#5a5a5a" stroke="#444" strokeWidth="0.8" rx="2" />
      {/* Feet */}
      <ellipse cx="47" cy="112" rx="8" ry="4" fill="#3a6a2a" stroke="#2a5a1a" strokeWidth="1" />
      <ellipse cx="67" cy="112" rx="8" ry="4" fill="#3a6a2a" stroke="#2a5a1a" strokeWidth="1" />
    </svg>
  );
}
