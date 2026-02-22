import { lazy, Suspense } from 'react';

const SkeletonSVG = lazy(() => import('./SkeletonSVG'));
const GiantRatSVG = lazy(() => import('./GiantRatSVG'));
const SlimeSVG = lazy(() => import('./SlimeSVG'));
const GoblinSVG = lazy(() => import('./GoblinSVG'));
const GiantSpiderSVG = lazy(() => import('./GiantSpiderSVG'));
const DarkMageSVG = lazy(() => import('./DarkMageSVG'));
const TrollSVG = lazy(() => import('./TrollSVG'));
const WraithSVG = lazy(() => import('./WraithSVG'));
const MimicSVG = lazy(() => import('./MimicSVG'));
const DragonSVG = lazy(() => import('./DragonSVG'));
const WyvernSVG = lazy(() => import('./WyvernSVG'));
const LichSVG = lazy(() => import('./LichSVG'));
const DemonSVG = lazy(() => import('./DemonSVG'));
const DeathKnightSVG = lazy(() => import('./DeathKnightSVG'));
const ElderDragonSVG = lazy(() => import('./ElderDragonSVG'));

const MONSTER_MAP: Record<string, React.LazyExoticComponent<React.ComponentType<{ size?: number }>>> = {
  SkeletonSVG,
  GiantRatSVG,
  SlimeSVG,
  GoblinSVG,
  GiantSpiderSVG,
  DarkMageSVG,
  TrollSVG,
  WraithSVG,
  MimicSVG,
  DragonSVG,
  WyvernSVG,
  LichSVG,
  DemonSVG,
  DeathKnightSVG,
  ElderDragonSVG,
};

export function MonsterSprite({ name, size = 120 }: { name: string; size?: number }) {
  const Component = MONSTER_MAP[name];
  if (!Component) return <div style={{ width: size, height: size, background: '#333' }} />;
  return (
    <Suspense fallback={<div style={{ width: size, height: size }} />}>
      <Component size={size} />
    </Suspense>
  );
}
