export default function WyvernSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <linearGradient id="wyvernBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a6a3a" />
          <stop offset="100%" stopColor="#2a3a1a" />
        </linearGradient>
      </defs>
      {/* Wings */}
      <path d="M20 35 L0 5 L8 25 L3 8 L12 28 L6 12 L18 32 Q22 38 28 42" fill="#3a5a2a" stroke="#2a4a1a" strokeWidth="1" />
      <path d="M100 35 L120 5 L112 25 L117 8 L108 28 L114 12 L102 32 Q98 38 92 42" fill="#3a5a2a" stroke="#2a4a1a" strokeWidth="1" />
      {/* Wing membranes */}
      <path d="M20 35 L5 15 L15 33" fill="#5a7a4a" opacity="0.4" />
      <path d="M100 35 L115 15 L105 33" fill="#5a7a4a" opacity="0.4" />
      {/* Body */}
      <path d="M40 45 Q35 60 38 85 L82 85 Q85 60 80 45 Q70 35 60 33 Q50 35 40 45 Z" fill="url(#wyvernBody)" stroke="#1a2a0a" strokeWidth="1.5" />
      {/* Belly */}
      <path d="M48 52 Q60 50 72 52 L70 85 L50 85 Z" fill="#6a8a5a" opacity="0.4" />
      {/* Neck */}
      <path d="M52 38 Q56 26 58 18 Q60 16 62 18 Q64 26 68 38" fill="url(#wyvernBody)" stroke="#1a2a0a" strokeWidth="1" />
      {/* Head */}
      <path d="M46 20 Q42 14 40 6 Q50 0 60 0 Q70 0 80 6 Q78 14 74 20 Q67 24 60 24 Q53 24 46 20 Z" fill="url(#wyvernBody)" stroke="#1a2a0a" strokeWidth="1.5" />
      {/* Beak/snout */}
      <path d="M50 6 Q60 -2 70 6" fill="#3a4a2a" stroke="#2a3a1a" strokeWidth="1" />
      {/* Eyes */}
      <ellipse cx="52" cy="12" rx="3" ry="2.5" fill="#ffaa00" stroke="#885500" strokeWidth="0.5" />
      <ellipse cx="68" cy="12" rx="3" ry="2.5" fill="#ffaa00" stroke="#885500" strokeWidth="0.5" />
      <circle cx="53" cy="12" r="1.5" fill="#111" />
      <circle cx="69" cy="12" r="1.5" fill="#111" />
      {/* Crest/horn */}
      <path d="M56 2 L54 -6 L58 0" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="0.5" />
      <path d="M64 2 L66 -6 L62 0" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="0.5" />
      {/* Legs with talons */}
      <path d="M42 80 L36 100 L30 104 L35 100 L38 105 L42 100 L44 85" fill="#3a5a2a" stroke="#1a2a0a" strokeWidth="1" />
      <path d="M78 80 L84 100 L80 104 L84 100 L88 105 L92 100 L78 85" fill="#3a5a2a" stroke="#1a2a0a" strokeWidth="1" />
      {/* Tail with stinger */}
      <path d="M60 85 Q72 92 85 98 Q100 102 110 95" fill="none" stroke="#3a5a2a" strokeWidth="4" strokeLinecap="round" />
      <path d="M110 95 L115 90 L113 100 Z" fill="#6a3a1a" stroke="#4a2a0a" strokeWidth="0.5" />
      {/* Wing flap animation */}
      <animateTransform attributeName="transform" type="rotate" values="0 60 60;-2 60 60;0 60 60;2 60 60;0 60 60" dur="2s" repeatCount="indefinite" />
    </svg>
  );
}
