export default function GameOverTitle({ floor }: { floor: number }) {
  return (
    <svg width="200" height="80" viewBox="0 0 200 80">
      <defs>
        <linearGradient id="deathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff4444" />
          <stop offset="100%" stopColor="#881111" />
        </linearGradient>
      </defs>
      <text x="100" y="45" textAnchor="middle" fill="url(#deathGrad)" fontSize="32" fontWeight="bold">
        GAME OVER
      </text>
      <text x="100" y="70" textAnchor="middle" fill="#667" fontSize="12">
        Your party perished on Floor {floor}
      </text>
    </svg>
  );
}
