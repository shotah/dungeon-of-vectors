export default function RestingScene() {
  return (
    <svg width="300" height="250" viewBox="0 0 300 250">
      {/* Stars */}
      {[
        [30,20],[80,40],[150,15],[220,35],[270,25],[50,60],[180,55],[250,50],
        [40,80],[120,70],[200,30],[260,65],[100,45],[160,75],[90,30],
      ].map(([sx,sy], i) => (
        <circle key={i} cx={sx} cy={sy} r={1} fill="#fff" opacity={0.6}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {/* Moon */}
      <circle cx="240" cy="50" r="18" fill="#eee8aa" opacity="0.8" />
      <circle cx="248" cy="46" r="15" fill="#000" />
      {/* Ground */}
      <rect x="0" y="200" width="300" height="50" fill="#2a1a0a" />
      <ellipse cx="150" cy="200" rx="140" ry="8" fill="#3a2a1a" />
      {/* Tent */}
      <polygon points="50,200 100,130 150,200" fill="#8B6914" stroke="#5C4A0A" strokeWidth="1.5" />
      <polygon points="75,200 100,140 125,200" fill="#A07818" />
      <rect x="88" y="170" width="24" height="30" fill="#5C4A0A" rx="2" />
      <line x1="100" y1="130" x2="100" y2="125" stroke="#888" strokeWidth="1.5" />
      {/* Campfire logs */}
      <rect x="180" y="192" width="40" height="6" rx="2" fill="#5C2E0A" transform="rotate(-15 200 195)" />
      <rect x="185" y="190" width="35" height="6" rx="2" fill="#6B3410" transform="rotate(10 200 193)" />
      {/* Fire */}
      <ellipse cx="200" cy="180" rx="18" ry="25" fill="#ff4400" opacity="0.7">
        <animate attributeName="ry" values="25;30;22;28;25" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.9;0.6;0.8;0.7" dur="1s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="200" cy="178" rx="12" ry="18" fill="#ff8800" opacity="0.8">
        <animate attributeName="ry" values="18;22;16;20;18" dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="200" cy="175" rx="6" ry="10" fill="#ffcc00" opacity="0.9">
        <animate attributeName="ry" values="10;13;9;12;10" dur="0.5s" repeatCount="indefinite" />
      </ellipse>
      {/* Fire glow */}
      <circle cx="200" cy="185" r="50" fill="#ff6600" opacity="0.08">
        <animate attributeName="opacity" values="0.08;0.14;0.06;0.12;0.08" dur="1.2s" repeatCount="indefinite" />
      </circle>
      {/* Sparks */}
      <circle cx="195" cy="155" r="1.5" fill="#ffaa00" opacity="0.8">
        <animate attributeName="cy" values="155;140;125" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.4;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="207" cy="150" r="1" fill="#ffcc33" opacity="0.7">
        <animate attributeName="cy" values="150;132;115" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.3;0" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="148" r="1.2" fill="#ff8800" opacity="0.6">
        <animate attributeName="cy" values="148;128;108" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.2;0" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
