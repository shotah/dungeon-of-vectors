export default function TitleLogo() {
  return (
    <svg width="400" height="120" viewBox="0 0 400 120">
      <defs>
        <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffcc44" />
          <stop offset="100%" stopColor="#aa7722" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text x="200" y="50" textAnchor="middle" fill="url(#titleGrad)" fontSize="36" fontFamily="monospace" fontWeight="bold" filter="url(#glow)">
        DUNGEON
      </text>
      <text x="200" y="85" textAnchor="middle" fill="url(#titleGrad)" fontSize="28" fontFamily="monospace" fontWeight="bold" filter="url(#glow)">
        OF VECTORS
      </text>
      <text x="200" y="110" textAnchor="middle" fill="#667" fontSize="12" fontFamily="monospace">
        A Dungeon Crawler in Pure SVG
      </text>
      {/* Decorative swords */}
      <g transform="translate(60, 60) rotate(-30)">
        <rect x="-2" y="-30" width="4" height="40" fill="#aaa" rx="1" />
        <rect x="-6" y="8" width="12" height="4" fill="#8B4513" rx="1" />
      </g>
      <g transform="translate(340, 60) rotate(30)">
        <rect x="-2" y="-30" width="4" height="40" fill="#aaa" rx="1" />
        <rect x="-6" y="8" width="12" height="4" fill="#8B4513" rx="1" />
      </g>
    </svg>
  );
}
