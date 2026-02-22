import type { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'gold';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}

const VARIANTS = {
  primary: { bg: '#2a4a8a', hover: '#3a5a9a', border: '#4a6aaa', text: '#ddeeff' },
  secondary: { bg: '#3a3a4a', hover: '#4a4a5a', border: '#5a5a6a', text: '#ccccdd' },
  danger: { bg: '#8a2a2a', hover: '#aa3a3a', border: '#aa4a4a', text: '#ffcccc' },
  gold: { bg: '#6a5a1a', hover: '#8a7a2a', border: '#aa9a3a', text: '#ffeeaa' },
};

const SIZES = {
  sm: { padding: '4px 10px', fontSize: '12px' },
  md: { padding: '8px 16px', fontSize: '14px' },
  lg: { padding: '12px 24px', fontSize: '16px' },
};

export default function Button({ children, onClick, variant = 'primary', disabled, size = 'md', style }: ButtonProps) {
  const v = VARIANTS[variant];
  const s = SIZES[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? '#2a2a2a' : v.bg,
        color: disabled ? '#666' : v.text,
        border: `1px solid ${disabled ? '#333' : v.border}`,
        borderRadius: 4,
        padding: s.padding,
        fontSize: s.fontSize,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'monospace',
        transition: 'background 0.15s',
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) (e.target as HTMLElement).style.background = v.hover; }}
      onMouseLeave={e => { if (!disabled) (e.target as HTMLElement).style.background = v.bg; }}
    >
      {children}
    </button>
  );
}
