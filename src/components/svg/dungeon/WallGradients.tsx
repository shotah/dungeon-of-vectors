import { darkenHex, floorDarkenAmount, floorRedShift } from '../../../utils/floorGradient';

type WallGradientsProps = { floor?: number };

export default function WallGradients({ floor = 1 }: WallGradientsProps) {
  const t = floorDarkenAmount(floor);
  const rs = floorRedShift(floor);
  const wallTop = darkenHex('#5e5e72', t, rs);
  const wallBottom = darkenHex('#3a3a50', t, rs);
  const sideTop = darkenHex('#3a3a4a', t, rs);
  const sideBottom = darkenHex('#2a2a3a', t, rs);
  const floorTop = darkenHex('#1a1a2e', t, rs);
  const floorBottom = darkenHex('#16213e', t, rs);
  const ceilTop = darkenHex('#1a1a2e', t, rs);
  const ceilBottom = darkenHex('#0f0f1a', t, rs);

  return (
    <defs>
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={wallTop} />
        <stop offset="100%" stopColor={wallBottom} />
      </linearGradient>
      <linearGradient id="sideWallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={sideTop} />
        <stop offset="100%" stopColor={sideBottom} />
      </linearGradient>
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={floorTop} />
        <stop offset="100%" stopColor={floorBottom} />
      </linearGradient>
      <linearGradient id="ceilGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={ceilTop} />
        <stop offset="100%" stopColor={ceilBottom} />
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
