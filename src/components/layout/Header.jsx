export function Header({ currentPage, onNavigate, unlockedStatus, theme, onToggleTheme }) {
  const navItems = [
    { id: 'stats', label: 'Stats' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'design', label: 'Design' },
    { id: 'browser', label: 'Review' },
    { id: 'rca', label: 'RCA' },
    { id: 'cases', label: 'Cases' },
    { id: 'code', label: 'Code' },
    { id: 'product-design', label: 'PM Design' },
    { id: 'prioritization', label: 'Prioritize' },
    { id: 'blog', label: 'Playbook' },
    { id: 'progress', label: 'Progress' },
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
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: 0, flexShrink: 0,
          }}
        >
          <div style={{
            width: '24px', height: '24px',
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', flexShrink: 0,
          }}>⚗</div>
          <span style={{
            fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)',
            letterSpacing: '-0.02em', whiteSpace: 'nowrap',
          }}>
            Analytics Lab
          </span>
        </button>

        {/* Nav */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '0.05rem',
          overflowX: 'auto', flexShrink: 1, minWidth: 0,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          marginLeft: '1.5rem',
        }}>
          {navItems.map(item => {
            const isActive = currentPage === item.id
              || (item.id === 'stats' && currentPage === 'stats-runner')
              || (item.id === 'metrics' && currentPage === 'metrics-runner')
              || (item.id === 'design' && currentPage === 'design-runner')
              || (item.id === 'browser' && currentPage === 'runner')
              || (item.id === 'rca' && currentPage === 'rca-runner')
              || (item.id === 'cases' && currentPage === 'cases-runner')
              || (item.id === 'code' && currentPage === 'code-runner')
              || (item.id === 'product-design' && currentPage === 'product-design-runner')
              || (item.id === 'prioritization' && currentPage === 'prioritization-runner');
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  background: isActive ? 'var(--surface-2)' : 'none',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0.3rem 0.55rem',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.8rem',
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

          <div style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 0.4rem', flexShrink: 0 }} />

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
