export function DecisionPanel({ decisions, selected, onSelect, submitted }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {decisions.map((decision) => {
        const isSelected = selected === decision.id;
        return (
          <button
            key={decision.id}
            onClick={() => !submitted && onSelect(decision.id)}
            disabled={submitted}
            style={{
              background: isSelected ? 'var(--accent-bg)' : 'var(--surface-2)',
              border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '6px', padding: '0.75rem 1rem',
              cursor: submitted ? 'default' : 'pointer',
              textAlign: 'left', transition: 'all 0.15s',
              opacity: submitted && !isSelected ? 0.5 : 1,
              outline: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <div style={{
                width: '18px', height: '18px',
                border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '50%',
                background: isSelected ? 'var(--accent)' : 'transparent',
                flexShrink: 0, marginTop: '1px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                {isSelected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: isSelected ? 'var(--text)' : 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                  {decision.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {decision.description}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
