import { useEffect } from 'react';
import { ConceptCard } from './ConceptCard.jsx';

export function ConceptDrawer({ conceptId, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!conceptId) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [conceptId, onClose]);

  if (!conceptId) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.18)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />
      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201,
        width: 'min(440px, 92vw)',
        background: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        overflowY: 'auto',
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Drawer label */}
        <div style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--text-dim)', marginBottom: '1rem',
        }}>
          Concept Reference
        </div>
        <ConceptCard conceptId={conceptId} onClose={onClose} />
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
            Full interactive Stats Room coming in V1.5. These reference cards are a preview.
          </p>
        </div>
      </div>
    </>
  );
}
