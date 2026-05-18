function SeverityIcon({ severity }) {
  if (severity === 'critical') return <span style={{ color: '#ef4444', fontSize: '1rem' }}>⚠</span>;
  if (severity === 'warning') return <span style={{ color: '#f59e0b', fontSize: '1rem' }}>◉</span>;
  return <span style={{ color: '#5b7fff', fontSize: '1rem' }}>ℹ</span>;
}

function severityBorder(severity) {
  if (severity === 'critical') return '#ef4444';
  if (severity === 'warning') return '#f59e0b';
  return '#5b7fff';
}

function severityBg(severity) {
  if (severity === 'critical') return 'rgba(239,68,68,0.06)';
  if (severity === 'warning') return 'rgba(245,158,11,0.06)';
  return 'rgba(91,127,255,0.06)';
}

export function WarningFlags({ flags, checked, onToggle, interactive }) {
  if (!flags || flags.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {flags.map((flag) => {
        const isChecked = checked?.includes(flag.id);
        return (
          <div
            key={flag.id}
            onClick={interactive ? () => onToggle?.(flag.id) : undefined}
            style={{
              background: isChecked ? severityBg(flag.severity) : 'rgba(26,29,39,0.5)',
              border: `1px solid ${isChecked ? severityBorder(flag.severity) : '#2d3148'}`,
              borderLeft: `3px solid ${severityBorder(flag.severity)}`,
              borderRadius: '4px',
              padding: '0.65rem 0.75rem',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              {interactive && (
                <div style={{
                  width: '16px', height: '16px',
                  border: `2px solid ${isChecked ? severityBorder(flag.severity) : '#2d3148'}`,
                  borderRadius: '3px',
                  background: isChecked ? severityBorder(flag.severity) : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.15s',
                }}>
                  {isChecked && <span style={{ color: '#000', fontSize: '10px', fontWeight: 900 }}>✓</span>}
                </div>
              )}
              <SeverityIcon severity={flag.severity} />
              <span style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#e8eaf0',
              }}>{flag.label}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#8890a8', lineHeight: 1.6, paddingLeft: interactive ? '1.5rem' : '1.25rem' }}>
              {flag.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
