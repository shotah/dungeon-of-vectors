export default function SlimeSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <radialGradient id="slimeGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#66ff66" />
          <stop offset="60%" stopColor="#33cc33" />
          <stop offset="100%" stopColor="#228822" />
        </radialGradient>
        <radialGradient id="slimeHighlight" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Slime puddle */}
      <ellipse cx="60" cy="108" rx="40" ry="8" fill="#228822" opacity="0.5" />
      {/* Main body */}
      <path d="M20 100 Q15 70 25 55 Q35 35 60 30 Q85 35 95 55 Q105 70 100 100 Z" fill="url(#slimeGrad)" stroke="#1a7a1a" strokeWidth="1.5">
        <animate attributeName="d" values="M20 100 Q15 70 25 55 Q35 35 60 30 Q85 35 95 55 Q105 70 100 100 Z;M22 100 Q17 72 27 57 Q37 38 60 33 Q83 38 93 57 Q103 72 98 100 Z;M20 100 Q15 70 25 55 Q35 35 60 30 Q85 35 95 55 Q105 70 100 100 Z" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Highlight */}
      <ellipse cx="45" cy="55" rx="15" ry="20" fill="url(#slimeHighlight)" />
      {/* Eyes */}
      <ellipse cx="45" cy="60" rx="8" ry="10" fill="#fff" />
      <ellipse cx="70" cy="60" rx="8" ry="10" fill="#fff" />
      <circle cx="47" cy="62" r="4" fill="#111" />
      <circle cx="72" cy="62" r="4" fill="#111" />
      <circle cx="48" cy="60" r="1.5" fill="#fff" />
      <circle cx="73" cy="60" r="1.5" fill="#fff" />
      {/* Mouth */}
      <path d="M45 78 Q57 85 70 78" fill="none" stroke="#1a5a1a" strokeWidth="2" strokeLinecap="round" />
      {/* Drips */}
      <ellipse cx="30" cy="98" rx="4" ry="6" fill="#33cc33" opacity="0.6">
        <animate attributeName="cy" values="98;102;98" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="85" cy="96" rx="3" ry="5" fill="#33cc33" opacity="0.5">
        <animate attributeName="cy" values="96;100;96" dur="1.8s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}
