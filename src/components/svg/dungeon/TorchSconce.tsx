export default function TorchSconce({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <g>
      <rect x={x - size * 0.15} y={y} width={size * 0.3} height={size * 0.8} fill="#5a3a1a" />
      <ellipse cx={x} cy={y - size * 0.1} rx={size * 0.25} ry={size * 0.35} fill="#ff6600" opacity="0.8">
        <animate attributeName="ry" values={`${size * 0.35};${size * 0.45};${size * 0.35}`} dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;1;0.7;0.9;0.8" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx={x} cy={y - size * 0.2} rx={size * 0.12} ry={size * 0.2} fill="#ffcc00" opacity="0.9">
        <animate attributeName="ry" values={`${size * 0.2};${size * 0.28};${size * 0.2}`} dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      <circle cx={x} cy={y} r={size * 1.5} fill="url(#torchGlow)" />
    </g>
  );
}
