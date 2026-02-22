export default function WallGradients() {
  return (
    <defs>
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#5e5e72" />
        <stop offset="100%" stopColor="#3a3a50" />
      </linearGradient>
      <linearGradient id="sideWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#3a3a4a" />
        <stop offset="100%" stopColor="#2a2a3a" />
      </linearGradient>
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#16213e" />
      </linearGradient>
      <linearGradient id="ceilGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#1a1a2e" />
        <stop offset="100%" stopColor="#0f0f1a" />
      </linearGradient>
      <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#5C2E0A" />
      </linearGradient>
      <linearGradient id="stairsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#555577" />
        <stop offset="100%" stopColor="#333355" />
      </linearGradient>
      <pattern id="brickPattern" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
        <rect width="20" height="10" fill="#4a4a5a" />
        <line x1="0" y1="0" x2="20" y2="0" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="10" y1="0" x2="10" y2="5" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="20" y2="5" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="0" y1="5" x2="0" y2="10" stroke="#3a3a4a" strokeWidth="0.5" />
        <line x1="20" y1="5" x2="20" y2="10" stroke="#3a3a4a" strokeWidth="0.5" />
      </pattern>
      <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff9933" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ff9933" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
