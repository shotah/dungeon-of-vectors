export default function GiantSpiderSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Web strands background */}
      <line x1="0" y1="0" x2="60" y2="45" stroke="#888" strokeWidth="0.3" opacity="0.4" />
      <line x1="120" y1="0" x2="60" y2="45" stroke="#888" strokeWidth="0.3" opacity="0.4" />
      <line x1="0" y1="60" x2="40" y2="55" stroke="#888" strokeWidth="0.3" opacity="0.4" />
      <line x1="120" y1="60" x2="80" y2="55" stroke="#888" strokeWidth="0.3" opacity="0.4" />
      {/* Abdomen */}
      <ellipse cx="60" cy="72" rx="22" ry="18" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1.5" />
      <path d="M45 65 Q60 58 75 65" fill="none" stroke="#ff3333" strokeWidth="1.5" />
      <path d="M48 72 Q60 65 72 72" fill="none" stroke="#ff3333" strokeWidth="1" />
      {/* Cephalothorax */}
      <ellipse cx="60" cy="48" rx="16" ry="12" fill="#333" stroke="#1a1a1a" strokeWidth="1.5" />
      {/* Eyes (8 of them) */}
      <circle cx="52" cy="43" r="3" fill="#ff0000" />
      <circle cx="68" cy="43" r="3" fill="#ff0000" />
      <circle cx="56" cy="39" r="2" fill="#ff3333" />
      <circle cx="64" cy="39" r="2" fill="#ff3333" />
      <circle cx="53" cy="47" r="1.5" fill="#cc0000" />
      <circle cx="67" cy="47" r="1.5" fill="#cc0000" />
      <circle cx="58" cy="37" r="1" fill="#ff6666" />
      <circle cx="62" cy="37" r="1" fill="#ff6666" />
      {/* Fangs */}
      <path d="M55 52 L53 58 L56 55" fill="#aaa" stroke="#888" strokeWidth="0.5" />
      <path d="M65 52 L67 58 L64 55" fill="#aaa" stroke="#888" strokeWidth="0.5" />
      {/* Legs - Left side */}
      <path d="M44 45 Q25 30 10 20" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 20 L5 28" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 48 Q22 40 8 38" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 38 L3 45" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 52 Q20 55 5 60" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M5 60 L2 68" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 58 Q25 68 10 82" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 82 L5 88" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      {/* Legs - Right side */}
      <path d="M76 45 Q95 30 110 20" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 20 L115 28" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 48 Q98 40 112 38" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M112 38 L117 45" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 52 Q100 55 115 60" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M115 60 L118 68" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M75 58 Q95 68 110 82" fill="none" stroke="#2a2a2a" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 82 L115 88" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
