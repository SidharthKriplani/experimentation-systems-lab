export function Footer({ onNavigate }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '1.5rem',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          Product Analytics Lab — V2.2 · 44 Playable Items
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            Static · No backend · No API calls · localStorage only
          </span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('qa')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--border)', fontSize: '0.65rem',
                fontFamily: 'monospace', padding: '0',
                transition: 'color 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dim)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--border)'}
              title="QA Dashboard"
            >qa</button>
          )}
        </div>
      </div>
    </footer>
  );
}
