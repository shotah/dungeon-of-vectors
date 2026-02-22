export default function MimicSVG({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Chest body (opened, revealing teeth) */}
      <rect x="25" y="55" width="70" height="45" fill="#8B6914" stroke="#5C4A0A" strokeWidth="2" rx="3" />
      {/* Metal bands */}
      <rect x="25" y="65" width="70" height="4" fill="#8a7a3a" />
      <rect x="25" y="82" width="70" height="4" fill="#8a7a3a" />
      {/* Open lid */}
      <path d="M25 55 L25 25 Q60 15 95 25 L95 55" fill="#A07818" stroke="#5C4A0A" strokeWidth="2" />
      <path d="M25 25 Q60 15 95 25" fill="none" stroke="#8a7a3a" strokeWidth="1.5" />
      {/* Lid inner */}
      <path d="M28 55 L28 30 Q60 22 92 30 L92 55" fill="#6a4a0a" />
      {/* Teeth (upper) */}
      <path d="M28 55 L35 48 L42 55 L49 46 L56 55 L63 48 L70 55 L77 46 L84 55 L92 48" fill="#fff" stroke="#ddd" strokeWidth="1" />
      {/* Teeth (lower) */}
      <path d="M28 55 L35 62 L42 55 L49 64 L56 55 L63 62 L70 55 L77 64 L84 55 L92 62" fill="#fff" stroke="#ddd" strokeWidth="1" />
      {/* Tongue */}
      <path d="M55 58 Q50 72 45 78 Q50 80 55 75 Q58 72 60 78 Q62 72 65 75 Q70 80 75 78 Q70 72 65 58" fill="#cc3333" stroke="#aa2222" strokeWidth="1">
        <animate attributeName="d" values="M55 58 Q50 72 45 78 Q50 80 55 75 Q58 72 60 78 Q62 72 65 75 Q70 80 75 78 Q70 72 65 58;M55 58 Q48 74 43 80 Q48 82 53 77 Q56 74 58 80 Q60 74 63 77 Q68 82 73 80 Q68 74 65 58;M55 58 Q50 72 45 78 Q50 80 55 75 Q58 72 60 78 Q62 72 65 75 Q70 80 75 78 Q70 72 65 58" dur="1.5s" repeatCount="indefinite" />
      </path>
      {/* Eyes on lid */}
      <circle cx="42" cy="38" r="6" fill="#ffff00" stroke="#aa8800" strokeWidth="1" />
      <circle cx="78" cy="38" r="6" fill="#ffff00" stroke="#aa8800" strokeWidth="1" />
      <ellipse cx="43" cy="38" rx="3" ry="4" fill="#111" />
      <ellipse cx="79" cy="38" rx="3" ry="4" fill="#111" />
      <circle cx="44" cy="37" r="1" fill="#fff" />
      <circle cx="80" cy="37" r="1" fill="#fff" />
      {/* Drool */}
      <path d="M42 62 Q43 70 42 76" fill="none" stroke="#88ccaa" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M78 62 Q77 68 78 74" fill="none" stroke="#88ccaa" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.5s" repeatCount="indefinite" />
      </path>
      {/* Lock (fake lure) */}
      <rect x="56" y="92" width="8" height="6" fill="#c0a030" stroke="#8a7a3a" strokeWidth="1" rx="1" />
      <circle cx="60" cy="95" r="1.5" fill="#8a7a3a" />
    </svg>
  );
}
