export default function IntroScene() {
  return (
    <svg width="400" height="250" viewBox="0 0 400 250">
      {/* Night sky */}
      <rect x="0" y="0" width="400" height="250" fill="#0a0a18" />
      {/* Stars */}
      {[
        [20,15],[60,30],[120,12],[200,25],[280,18],[340,35],[380,10],
        [40,50],[150,45],[250,40],[310,55],[90,38],[170,20],[360,48],
      ].map(([sx,sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={0.8} fill="#fff" opacity={0.5}>
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Distant hills */}
      <path d="M0 160 Q50 130 120 150 Q180 125 250 145 Q320 120 400 140 L400 250 L0 250 Z" fill="#1a1a2e" />
      {/* Burning village */}
      {/* Houses */}
      <rect x="60" y="170" width="30" height="25" fill="#3a2a1a" stroke="#2a1a0a" strokeWidth="1" />
      <polygon points="55,170 75,155 95,170" fill="#4a3020" />
      <rect x="150" y="175" width="25" height="20" fill="#3a2a1a" stroke="#2a1a0a" strokeWidth="1" />
      <polygon points="145,175 162,162 180,175" fill="#4a3020" />
      <rect x="240" y="172" width="28" height="23" fill="#3a2a1a" stroke="#2a1a0a" strokeWidth="1" />
      <polygon points="235,172 254,158 273,172" fill="#4a3020" />
      {/* Flames on houses */}
      {[[75,165],[162,158],[254,155]].map(([fx,fy], i) => (
        <g key={`fire-${i}`}>
          <ellipse cx={fx} cy={fy} rx="10" ry="15" fill="#ff4400" opacity="0.7">
            <animate attributeName="ry" values="15;20;12;18;15" dur={`${0.7 + i * 0.1}s`} repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={fx} cy={fy - 3} rx="6" ry="9" fill="#ff8800" opacity="0.8">
            <animate attributeName="ry" values="9;13;8;11;9" dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
          </ellipse>
          <ellipse cx={fx} cy={fy - 5} rx="3" ry="5" fill="#ffcc00" opacity="0.9">
            <animate attributeName="ry" values="5;8;4;7;5" dur={`${0.4 + i * 0.1}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
      {/* Fire glow */}
      <circle cx="160" cy="170" r="80" fill="#ff4400" opacity="0.06">
        <animate attributeName="opacity" values="0.06;0.1;0.06" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Smoke */}
      {[[80,140],[165,130],[258,135]].map(([sx,sy], i) => (
        <circle key={`smoke-${i}`} cx={sx} cy={sy} r="8" fill="#444" opacity="0.3">
          <animate attributeName="cy" values={`${sy};${sy - 30};${sy - 60}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.15;0" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          <animate attributeName="r" values="8;14;20" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Wizard silhouette on hill */}
      <path d="M330 160 Q340 130 355 115 Q345 120 340 112 L340 108 L343 100 L340 95 Q338 85 340 75 L342 75 Q344 85 342 95 L345 100 L342 108 L342 112 Q347 120 350 115 L348 160 Z" fill="#110011" />
      {/* Wizard hat */}
      <path d="M333 112 L340 80 L347 112" fill="#110011" />
      {/* Staff */}
      <line x1="350" y1="95" x2="355" y2="160" stroke="#110011" strokeWidth="2" />
      {/* Staff orb glow */}
      <circle cx="350" cy="93" r="5" fill="#ff3300" opacity="0.7">
        <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="350" cy="93" r="2" fill="#ff8844" opacity="0.9" />
      {/* Ground */}
      <rect x="0" y="195" width="400" height="55" fill="#1a120a" />
      <ellipse cx="200" cy="195" rx="200" ry="6" fill="#2a1a0a" />
      {/* Frightened townspeople silhouettes */}
      <circle cx="110" cy="188" r="4" fill="#1a1a2e" />
      <rect x="107" y="192" width="6" height="10" fill="#1a1a2e" rx="1" />
      <circle cx="125" cy="186" r="4" fill="#1a1a2e" />
      <rect x="122" y="190" width="6" height="12" fill="#1a1a2e" rx="1" />
      <circle cx="195" cy="187" r="3.5" fill="#1a1a2e" />
      <rect x="192.5" y="190.5" width="5" height="10" fill="#1a1a2e" rx="1" />
    </svg>
  );
}
