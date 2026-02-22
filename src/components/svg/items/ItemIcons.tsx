export function SwordIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="11" y="2" width="2" height="14" fill="#bbb" stroke="#888" strokeWidth="0.5" rx="0.5" />
      <polygon points="10,2 12,0 14,2" fill="#ccc" />
      <rect x="8" y="15" width="8" height="2" fill="#8B4513" rx="0.5" />
      <rect x="10.5" y="17" width="3" height="4" fill="#654321" rx="0.5" />
      <circle cx="12" cy="19" r="0.8" fill="#c0a030" />
    </svg>
  );
}

export function StaffIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="11" y="6" width="2" height="16" fill="#8B6914" rx="0.5" />
      <circle cx="12" cy="5" r="3.5" fill="#6688cc" stroke="#4466aa" strokeWidth="0.5" />
      <circle cx="12" cy="5" r="1.5" fill="#aaccff" opacity="0.7" />
    </svg>
  );
}

export function ShieldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M4 4 L12 2 L20 4 L20 14 Q16 20 12 22 Q8 20 4 14 Z" fill="#8888bb" stroke="#6666aa" strokeWidth="1" />
      <path d="M8 6 L12 5 L16 6 L16 12 Q14 16 12 18 Q10 16 8 12 Z" fill="#9999cc" opacity="0.5" />
      <line x1="12" y1="5" x2="12" y2="18" stroke="#6666aa" strokeWidth="0.5" />
      <line x1="8" y1="10" x2="16" y2="10" stroke="#6666aa" strokeWidth="0.5" />
    </svg>
  );
}

export function ArmorIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M6 8 Q12 4 18 8 L17 20 L7 20 Z" fill="#888" stroke="#666" strokeWidth="0.8" />
      <path d="M2 10 L6 8 L6 14 L2 12 Z" fill="#777" stroke="#666" strokeWidth="0.5" />
      <path d="M22 10 L18 8 L18 14 L22 12 Z" fill="#777" stroke="#666" strokeWidth="0.5" />
      <rect x="10" y="10" width="4" height="6" fill="#999" opacity="0.4" rx="1" />
    </svg>
  );
}

export function PotionRedIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="4" fill="#aaa" rx="1" />
      <path d="M9 7 Q6 10 6 16 Q6 21 12 22 Q18 21 18 16 Q18 10 15 7 Z" fill="#cc3333" stroke="#aa2222" strokeWidth="0.8" />
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="#ff4444" opacity="0.4" />
      <rect x="10" y="2" width="4" height="2" fill="#8B4513" rx="0.5" />
    </svg>
  );
}

export function PotionBlueIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="4" fill="#aaa" rx="1" />
      <path d="M9 7 Q6 10 6 16 Q6 21 12 22 Q18 21 18 16 Q18 10 15 7 Z" fill="#3355cc" stroke="#2244aa" strokeWidth="0.8" />
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="#4488ff" opacity="0.4" />
      <rect x="10" y="2" width="4" height="2" fill="#8B4513" rx="0.5" />
    </svg>
  );
}

export function PotionGreenIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="4" fill="#aaa" rx="1" />
      <path d="M9 7 Q6 10 6 16 Q6 21 12 22 Q18 21 18 16 Q18 10 15 7 Z" fill="#33aa33" stroke="#228822" strokeWidth="0.8" />
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="#44cc44" opacity="0.4" />
      <rect x="10" y="2" width="4" height="2" fill="#8B4513" rx="0.5" />
    </svg>
  );
}

export function PotionGoldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="9" y="3" width="6" height="4" fill="#aaa" rx="1" />
      <path d="M9 7 Q6 10 6 16 Q6 21 12 22 Q18 21 18 16 Q18 10 15 7 Z" fill="#daa520" stroke="#b8860b" strokeWidth="0.8" />
      <ellipse cx="12" cy="14" rx="4" ry="5" fill="#ffdd55" opacity="0.4" />
      <rect x="10" y="2" width="4" height="2" fill="#8B4513" rx="0.5" />
      <path d="M10 12 L14 12 M11 10 L13 10 M11 14 L13 14" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function TentIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <polygon points="12,3 2,20 22,20" fill="#8B6914" stroke="#5C4A0A" strokeWidth="1" />
      <polygon points="12,3 7,20 17,20" fill="#A07818" stroke="#5C4A0A" strokeWidth="0.5" />
      <rect x="10" y="13" width="4" height="7" fill="#5C4A0A" rx="1" />
      <line x1="12" y1="3" x2="12" y2="1" stroke="#888" strokeWidth="1" strokeLinecap="round" />
      <polygon points="11,1 12,0 13,1" fill="#cc3333" />
    </svg>
  );
}

export function KeyIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="8" cy="8" r="5" fill="none" stroke="#c0a030" strokeWidth="2" />
      <rect x="12" y="6.5" width="10" height="3" fill="#c0a030" rx="1" />
      <rect x="19" y="9" width="2" height="4" fill="#c0a030" />
      <rect x="16" y="9" width="2" height="3" fill="#c0a030" />
    </svg>
  );
}

export function RingIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <ellipse cx="12" cy="14" rx="7" ry="6" fill="none" stroke="#c0c0c0" strokeWidth="2.5" />
      <circle cx="12" cy="8" r="3" fill="#88aaff" stroke="#c0c0c0" strokeWidth="1" />
      <circle cx="12" cy="8" r="1.2" fill="#bbddff" />
    </svg>
  );
}

export function GoldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="#daa520" stroke="#b8860b" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="#b8860b" strokeWidth="0.5" />
      <text x="12" y="16" textAnchor="middle" fill="#8B6914" fontSize="10" fontWeight="bold">G</text>
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  sword: SwordIcon,
  staff: StaffIcon,
  shield: ShieldIcon,
  armor: ArmorIcon,
  potion_red: PotionRedIcon,
  potion_blue: PotionBlueIcon,
  potion_green: PotionGreenIcon,
  potion_gold: PotionGoldIcon,
  tent: TentIcon,
  key: KeyIcon,
  ring: RingIcon,
  gold: GoldIcon,
};

export function ItemIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const Component = ICON_MAP[icon] || SwordIcon;
  return <Component size={size} />;
}
