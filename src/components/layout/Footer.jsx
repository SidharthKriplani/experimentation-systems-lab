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
          Product Analytics Lab — V4.17 · 150+ Playable Items
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            Also by the same author:{' '}
            <a href="https://genai-systems-lab-ivory.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>GenAI Systems Lab</a>
            {' · '}
            <a href="https://ml-systems-lab-v9xe.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}>ML Systems Lab</a>
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            Works offline · Private by design · No account required
          </span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('qa')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--border)', fontSize: '0.68rem',
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
