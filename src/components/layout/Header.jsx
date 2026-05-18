export function Header({ currentPage, onNavigate, unlockedStatus }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browser', label: 'Scenarios' },
    { id: 'progress', label: 'Progress' },
    { id: 'about', label: 'Methodology' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(15,17,23,0.95)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #1e2235',
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
            background: 'linear-gradient(135deg, #5b7fff, #a78bfa)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
          }}>⚗</div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e8eaf0', letterSpacing: '-0.01em' }}>
            Experimentation Systems Lab
          </span>
        </button>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: currentPage === item.id ? '#1a1d27' : 'none',
                border: 'none',
                borderRadius: '5px',
                padding: '0.4rem 0.75rem',
                color: currentPage === item.id ? '#e8eaf0' : '#8890a8',
                fontWeight: currentPage === item.id ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {item.label}
            </button>
          ))}
          {!unlockedStatus && (
            <button
              onClick={() => onNavigate('unlock')}
              style={{
                background: '#1a1d27',
                border: '1px solid #2d3148',
                borderRadius: '5px',
                padding: '0.35rem 0.75rem',
                color: '#8890a8',
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
              color: '#22c55e',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              background: '#0d2e1a',
              border: '1px solid #22c55e',
              borderRadius: '5px',
            }}>✓ Beta Access</span>
          )}
        </nav>
      </div>
    </header>
  );
}
