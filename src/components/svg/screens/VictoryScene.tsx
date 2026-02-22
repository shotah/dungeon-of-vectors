export default function VictoryScene() {
  return (
    <svg width="400" height="250" viewBox="0 0 400 250">
      {/* Clear sky gradient */}
      <defs>
        <linearGradient id="victSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a3a6a" />
          <stop offset="100%" stopColor="#4a8abb" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="180" fill="url(#victSky)" />
      {/* Sun */}
      <circle cx="320" cy="50" r="25" fill="#ffdd44" opacity="0.9" />
      <circle cx="320" cy="50" r="35" fill="#ffdd44" opacity="0.15">
        <animate attributeName="r" values="35;40;35" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Clouds */}
      <ellipse cx="80" cy="45" rx="30" ry="10" fill="#fff" opacity="0.3" />
      <ellipse cx="95" cy="40" rx="20" ry="8" fill="#fff" opacity="0.25" />
      <ellipse cx="220" cy="55" rx="25" ry="8" fill="#fff" opacity="0.2" />
      {/* Rolling green hills */}
      <path d="M0 180 Q60 155 140 170 Q220 150 300 165 Q360 145 400 160 L400 250 L0 250 Z" fill="#2a6a2a" />
      <path d="M0 190 Q80 175 160 185 Q250 170 350 180 Q380 175 400 178 L400 250 L0 250 Z" fill="#3a8a3a" />
      {/* Village houses (restored) */}
      <rect x="70" y="178" width="24" height="18" fill="#8B6914" stroke="#6a5010" strokeWidth="0.8" />
      <polygon points="66,178 82,167 98,178" fill="#aa4422" />
      <rect x="78" y="186" width="8" height="10" fill="#5C2E0A" />
      <rect x="155" y="175" width="20" height="16" fill="#8B6914" stroke="#6a5010" strokeWidth="0.8" />
      <polygon points="151,175 165,165 179,175" fill="#aa4422" />
      <rect x="162" y="182" width="6" height="9" fill="#5C2E0A" />
      <rect x="250" y="176" width="22" height="17" fill="#8B6914" stroke="#6a5010" strokeWidth="0.8" />
      <polygon points="246,176 261,166 276,176" fill="#aa4422" />
      <rect x="258" y="184" width="7" height="9" fill="#5C2E0A" />
      {/* Happy townspeople */}
      {[[110,188],[135,186],[190,185],[215,187],[290,184],[310,186]].map(([px,py], i) => (
        <g key={`person-${i}`}>
          <circle cx={px} cy={py - 5} r={3.5} fill="#c4956a" />
          <rect x={px - 3} y={py - 1} width={6} height={10} rx={1}
            fill={['#4466aa','#aa4444','#44aa44','#8844aa','#aa8844','#4488aa'][i]}
          />
          {/* Arms raised in celebration */}
          <line x1={px - 3} y1={py + 2} x2={px - 6} y2={py - 4} stroke={['#4466aa','#aa4444','#44aa44','#8844aa','#aa8844','#4488aa'][i]} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={px + 3} y1={py + 2} x2={px + 6} y2={py - 4} stroke={['#4466aa','#aa4444','#44aa44','#8844aa','#aa8844','#4488aa'][i]} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Confetti / celebration particles */}
      {[
        [50,60,'#ff4444'],[100,40,'#44ff44'],[150,55,'#4444ff'],[200,35,'#ffff44'],
        [250,50,'#ff44ff'],[300,45,'#44ffff'],[350,60,'#ff8844'],[80,70,'#88ff44'],
        [180,65,'#ff4488'],[270,30,'#44ff88'],[330,75,'#8844ff'],[120,50,'#ffaa44'],
      ].map(([cx,cy,fill], i) => (
        <rect
          key={`confetti-${i}`}
          x={cx as number} y={cy as number}
          width="4" height="4" rx="1"
          fill={fill as string}
          opacity="0.8"
          transform={`rotate(${i * 30} ${cx} ${cy})`}
        >
          <animate attributeName="y" values={`${cy};${(cy as number) + 120}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" values={`${i * 30} ${cx} ${cy};${i * 30 + 360} ${cx} ${(cy as number) + 120}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}
      {/* Banner */}
      <rect x="130" y="100" width="140" height="30" rx="3" fill="#8B6914" stroke="#5C4A0A" strokeWidth="1" opacity="0.9" />
      <text x="200" y="120" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="monospace" fontWeight="bold">
        THE WIZARD IS DEFEATED!
      </text>
    </svg>
  );
}
