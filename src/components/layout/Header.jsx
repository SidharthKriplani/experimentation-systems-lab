export function Header({ currentPage, onNavigate, unlockedStatus, theme, onToggleTheme }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'design', label: 'Design' },
    { id: 'browser', label: 'Review' },
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
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 1.5rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '54px',
      }}>
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.55rem', padding: 0,
          }}
        >
          <div style={{
            width: '26px', height: '26px',
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', flexShrink: 0,
          }}>⚗</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Product Analytics Lab
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
              Analytics judgment gym · V1.2
            </span>
          </div>
        </button>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
          {navItems.map(item => {
            const isActive = currentPage === item.id
              || (item.id === 'design' && currentPage === 'design-runner')
              || (item.id === 'browser' && currentPage === 'runner');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background: isActive ? 'var(--surface-2)' : 'none',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0.35rem 0.7rem',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.83rem',
                  cursor: 'pointer',
                  transition: 'color 0.12s, background 0.12s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {item.label}
              </button>
            );
          })}

          <div style={{ width: '1px', height: '18px', background: 'var(--border)', margin: '0 0.35rem' }} />

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '5px',
              padding: '0.3rem 0.5rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              lineHeight: 1,
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
                padding: '0.3rem 0.65rem',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                marginLeft: '0.15rem',
              }}
            >
              🔒 Beta
            </button>
          )}
          {unlockedStatus && (
            <span style={{
              fontSize: '0.72rem', fontWeight: 600,
              padding: '0.3rem 0.65rem',
              color: 'var(--green)',
              background: 'var(--green-bg)',
              border: '1px solid var(--green-border)',
              borderRadius: '5px',
              marginLeft: '0.15rem',
            }}>✓ Beta</span>
          )}
        </nav>
      </div>
    </header>
  );
}
