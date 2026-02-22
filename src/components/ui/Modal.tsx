import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  title?: string;
}

export default function Modal({ children, onClose, title }: ModalProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }} onClick={onClose}>
      <div
        style={{
          background: '#1a1a2e', border: '2px solid #3a3a5a', borderRadius: 8,
          padding: 20, minWidth: 300, maxWidth: '90vw', maxHeight: '80vh',
          overflow: 'auto', color: '#ddd', fontFamily: 'monospace',
        }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div style={{
            fontSize: 18, fontWeight: 'bold', color: '#aaccff', marginBottom: 16,
            borderBottom: '1px solid #3a3a5a', paddingBottom: 8,
          }}>
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
