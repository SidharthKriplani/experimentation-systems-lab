export function Header({ currentPage, onNavigate, unlockedStatus, theme, onToggleTheme }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browser', label: 'Scenarios' },
    { id: 'bank', label: 'Judgment Bank' },
    { id: 'progress', label: 'Progress' },
    { id: 'about', label: 'Methodology' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--header-bg)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 1.5rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: 0,
          }}
        >
          <div style={{
            width: '28px', height: '28px',
            background: 'linear-gradient(135deg, var(--accent), var(--purple))',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
          }}>⚗</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
            Experimentation Systems Lab
          </span>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: currentPage === item.id ? 'var(--surface-2)' : 'none',
                border: 'none',
                borderRadius: '5px',
                padding: '0.4rem 0.75rem',
                color: currentPage === item.id ? 'var(--text)' : 'var(--text-muted)',
                fontWeight: currentPage === item.id ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              padding: '0.35rem 0.55rem',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '0.25rem',
            }}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          {!unlockedStatus && (
            <button
              onClick={() => onNavigate('unlock')}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '5px',
                padding: '0.35rem 0.75rem',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              🔒 Private Beta
            </button>
          )}
          {unlockedStatus && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--green)',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              background: 'var(--green-bg)',
              border: '1px solid var(--green-border)',
              borderRadius: '5px',
            }}>✓ Beta Access</span>
          )}
        </nav>
      </div>
    </header>
  );
}
