export default function ShadowWraithSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <defs>
        <radialGradient id="shadowWraithAura" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#7733cc" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#440088" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#220044" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shadowWraithBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a0a2e" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#0d0520" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0a0015" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="shadowWraithFlame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6622aa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#9944ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer dark aura */}
      <circle cx="60" cy="50" r="55" fill="url(#shadowWraithAura)">
        <animate attributeName="r" values="55;58;55" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Shadow flame tendrils - left */}
      <path d="M25 70 Q18 50 22 30 Q25 20 28 25 Q24 45 30 65 Z" fill="#5511aa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="1.8s" repeatCount="indefinite" />
      </path>
      <path d="M20 80 Q12 55 18 35 Q20 28 22 33 Q17 50 24 75 Z" fill="#440088" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.15;0.3" dur="2.2s" repeatCount="indefinite" />
      </path>

      {/* Shadow flame tendrils - right */}
      <path d="M95 70 Q102 50 98 30 Q95 20 92 25 Q96 45 90 65 Z" fill="#5511aa" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M100 80 Q108 55 102 35 Q100 28 98 33 Q103 50 96 75 Z" fill="#440088" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.15;0.3" dur="1.6s" repeatCount="indefinite" />
      </path>

      {/* Shadow flame top */}
      <path d="M50 18 Q48 5 52 8 Q55 2 58 10 Q60 0 62 10 Q65 2 68 8 Q72 5 70 18 Z" fill="url(#shadowWraithFlame)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* Large tattered robe body */}
      <path d="M28 25 Q22 55 15 100 Q20 115 35 112 Q40 100 48 115 Q55 118 60 115 Q65 118 72 115 Q80 100 85 112 Q100 115 105 100 Q98 55 92 25 Q80 12 60 10 Q40 12 28 25 Z" fill="url(#shadowWraithBody)" stroke="#2a1040" strokeWidth="1" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.75;0.9" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Inner robe folds */}
      <path d="M40 40 Q38 70 35 100" fill="none" stroke="#1a0a2e" strokeWidth="1" opacity="0.5" />
      <path d="M80 40 Q82 70 85 100" fill="none" stroke="#1a0a2e" strokeWidth="1" opacity="0.5" />
      <path d="M55 50 Q53 80 50 110" fill="none" stroke="#1a0a2e" strokeWidth="0.8" opacity="0.3" />

      {/* Large hood */}
      <path d="M32 28 Q60 4 88 28 Q80 38 60 35 Q40 38 32 28 Z" fill="#1a0a2e" stroke="#2a1040" strokeWidth="1" />

      {/* Deep face void */}
      <ellipse cx="60" cy="32" rx="15" ry="10" fill="#05000d" />

      {/* Glowing purple eyes - larger than regular wraith */}
      <ellipse cx="52" cy="30" rx="4" ry="3.5" fill="#bb44ff">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="68" cy="30" rx="4" ry="3.5" fill="#bb44ff">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="52" cy="30" r="2" fill="#eeccff" opacity="0.9" />
      <circle cx="68" cy="30" r="2" fill="#eeccff" opacity="0.9" />

      {/* Eye trails */}
      <path d="M52 33 Q50 40 48 48" fill="none" stroke="#bb44ff" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
      </path>
      <path d="M68 33 Q70 40 72 48" fill="none" stroke="#bb44ff" strokeWidth="1.5" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* Spectral clawed arms */}
      <path d="M32 45 Q14 55 8 72 Q5 80 10 78 Q8 82 14 80" fill="none" stroke="#2a1040" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M88 45 Q106 55 112 72 Q115 80 110 78 Q112 82 106 80" fill="none" stroke="#2a1040" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Clawed fingers */}
      <path d="M8 72 L2 66 M10 78 L4 76 M14 80 L10 84" stroke="#3a1850" strokeWidth="1.5" opacity="0.6" />
      <path d="M112 72 L118 66 M110 78 L116 76 M106 80 L110 84" stroke="#3a1850" strokeWidth="1.5" opacity="0.6" />

      {/* Dark soul particles */}
      <circle cx="25" cy="50" r="2" fill="#9944ff" opacity="0.5">
        <animate attributeName="cy" values="50;38;50" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="45" r="1.5" fill="#9944ff" opacity="0.4">
        <animate attributeName="cy" values="45;33;45" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="75" r="1.5" fill="#bb66ff" opacity="0.6">
        <animate attributeName="cy" values="75;65;75" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="68" r="1" fill="#bb66ff" opacity="0.5">
        <animate attributeName="cy" values="68;58;68" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="85" r="2" fill="#7733cc" opacity="0.3">
        <animate attributeName="cy" values="85;75;85" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
