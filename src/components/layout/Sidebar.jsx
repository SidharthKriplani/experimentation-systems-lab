export function Sidebar({ currentPage, onNavigate, unlockedStatus, theme, onToggleTheme, isOpen, onClose }) {
  const navGroups = [
    {
      label: 'ROOMS',
      items: [
        { id: 'stat-foundations', label: 'Stat Foundations' },
        { id: 'stats', label: 'Stats' },
        { id: 'metrics', label: 'Metrics' },
        { id: 'design', label: 'A/B Design' },
        { id: 'browser', label: 'Review' },
        { id: 'rca', label: 'RCA' },
        { id: 'cases', label: 'Cases' },
        { id: 'code', label: 'Code' },
        { id: 'growth-analytics', label: 'Growth Analytics' },
        { id: 'bi', label: 'BI & Reporting' },
        { id: 'product-design', label: 'PM Design' },
        { id: 'prioritization', label: 'Prioritize' },
        { id: 'behavioral', label: 'Behavioral' },
        { id: 'estimation', label: 'Estimation' },
        { id: 'instrumentation', label: 'Instrumentation' },
      ],
    },
    {
      label: 'PRACTICE',
      items: [
        { id: 'challenges', label: '⚡ Challenges' },
        { id: 'spot-the-flaw', label: '🐛 Spot the Flaw' },
        { id: 'take-home', label: '📝 Take-Home' },
        { id: 'simulator', label: 'Simulator' },
        { id: 'ab-interpreter', label: 'A/B Interpreter' },
      ],
    },
    {
      label: 'TOOLS',
      items: [
        { id: 'search', label: '🔍 Search' },
        { id: 'trainer', label: '🎯 Trainer' },
        { id: 'consult', label: '💬 Consult' },
        { id: 'company-tracks', label: 'Companies' },
        { id: 'defense-doc', label: '🛡️ Defense Doc' },
        { id: 'bookmarks', label: '🔖 Saved' },
      ],
    },
    {
      label: 'LEARN',
      items: [
        { id: 'blog', label: 'Learn' },
        { id: 'playbook', label: 'Playbook' },
      ],
    },
    {
      label: 'TRACK',
      items: [
        { id: 'progress', label: 'Progress' },
        { id: 'pricing', label: 'Pricing' },
      ],
    },
  ];

  function getIsActive(itemId) {
    return currentPage === itemId
      || (itemId === 'stats' && currentPage === 'stats-runner')
      || (itemId === 'metrics' && currentPage === 'metrics-runner')
      || (itemId === 'design' && currentPage === 'design-runner')
      || (itemId === 'browser' && currentPage === 'runner')
      || (itemId === 'rca' && currentPage === 'rca-runner')
      || (itemId === 'cases' && currentPage === 'cases-runner')
      || (itemId === 'code' && currentPage === 'code-runner')
      || (itemId === 'product-design' && currentPage === 'product-design-runner')
      || (itemId === 'prioritization' && currentPage === 'prioritization-runner')
      || (itemId === 'behavioral' && currentPage === 'behavioral-runner')
      || (itemId === 'estimation' && currentPage === 'estimation-runner')
      || (itemId === 'stat-foundations' && currentPage === 'stat-foundations-runner')
      || (itemId === 'growth-analytics' && currentPage === 'growth-analytics-runner')
      || (itemId === 'simulator' && currentPage === 'simulator')
      || (itemId === 'ab-interpreter' && currentPage === 'ab-interpreter')
      || (itemId === 'search' && currentPage === 'search')
      || (itemId === 'bookmarks' && currentPage === 'bookmarks')
      || (itemId === 'consult' && currentPage === 'consult')
      || (itemId === 'trainer' && currentPage === 'trainer')
      || (itemId === 'company-tracks' && currentPage === 'company-tracks')
      || (itemId === 'challenges' && (currentPage === 'challenges' || currentPage === 'challenges-runner'))
      || (itemId === 'bi' && (currentPage === 'bi' || currentPage === 'bi-runner'))
      || (itemId === 'spot-the-flaw' && (currentPage === 'spot-the-flaw' || currentPage === 'stf-runner'))
      || (itemId === 'take-home' && (currentPage === 'take-home' || currentPage === 'takehome-runner'))
      || (itemId === 'defense-doc' && currentPage === 'defense-doc')
      || (itemId === 'instrumentation' && (currentPage === 'instrumentation' || currentPage === 'instrumentation-runner'));
  }

  function handleNav(id) {
    onNavigate(id);
    onClose();
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.35)',
            zIndex: 49,
          }}
        />
      )}

      <aside className={`app-sidebar${isOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '1rem 0.75rem 0.5rem', flexShrink: 0 }}>
          <button
            onClick={() => handleNav('home')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 0.25rem', borderRadius: 'var(--radius-sm)',
              width: '100%',
            }}
          >
            <div style={{
              width: 22, height: 22, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%)',
              borderRadius: 5,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11,
            }}>⚗</div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Analytics Lab
            </span>
          </button>
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.25rem 0.5rem 0.75rem', scrollbarWidth: 'none' }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ marginBottom: '0.15rem' }}>
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                color: 'var(--text-muted)', opacity: 0.55,
                padding: '0.55rem 0.5rem 0.2rem',
                textTransform: 'uppercase', userSelect: 'none',
              }}>
                {group.label}
              </div>
              {group.items.map(item => {
                const isActive = getIsActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.32rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: isActive ? 'var(--accent-bg)' : 'none',
                      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'background 0.1s, color 0.1s',
                      lineHeight: 1.5,
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'var(--surface-2)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = 'var(--text-muted)';
                      }
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom: theme toggle + beta badge */}
        <div style={{
          padding: '0.65rem 0.75rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          flexShrink: 0,
        }}>
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '0.28rem 0.55rem',
              color: 'var(--text-muted)', fontSize: '0.82rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              lineHeight: 1,
            }}
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          {unlockedStatus ? (
            <span style={{
              fontSize: '0.7rem', fontWeight: 600,
              padding: '0.2rem 0.55rem',
              color: 'var(--green)', background: 'var(--green-bg)',
              border: '1px solid var(--green-border)', borderRadius: 4,
            }}>✓ Beta</span>
          ) : (
            <button
              onClick={() => handleNav('unlock')}
              style={{
                fontSize: '0.72rem', fontWeight: 600,
                padding: '0.2rem 0.55rem',
                color: 'var(--text-muted)', background: 'var(--surface-2)',
                border: '1px solid var(--border)', borderRadius: 4,
                cursor: 'pointer',
              }}
            >🔒 Beta</button>
          )}
        </div>
      </aside>
    </>
  );
}
