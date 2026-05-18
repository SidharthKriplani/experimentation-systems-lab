function getDirectionStyle(metric) {
  const { direction, type, significant } = metric;
  if (type === 'diagnostic') return { color: '#8890a8' };
  if (!significant) return { color: '#545b7a' };

  const isGuardrail = type === 'guardrail';

  if (isGuardrail) {
    // Guardrail breach is always bad
    return { color: '#ef4444' };
  }

  if (direction === 'up') return { color: '#22c55e' };
  if (direction === 'down') return { color: '#22c55e' };
  return { color: '#8890a8' };
}

function getTypeLabel(type) {
  const map = {
    primary: { label: 'PRIMARY', color: '#5b7fff', bg: '#0d1f3a' },
    secondary: { label: 'SECONDARY', color: '#545b7a', bg: '#1a1d27' },
    guardrail: { label: 'GUARDRAIL', color: '#ef4444', bg: '#2e0d0d' },
    diagnostic: { label: 'DIAGNOSTIC', color: '#8890a8', bg: '#1a1d27' },
  };
  return map[type] || map.secondary;
}

function DirectionArrow({ direction, significant }) {
  if (!significant || direction === 'flat') return <span style={{ color: '#545b7a' }}>—</span>;
  if (direction === 'up') return <span>↑</span>;
  if (direction === 'down') return <span>↓</span>;
  return <span>—</span>;
}

export function MetricTable({ metrics }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #2d3148' }}>
            {['Type', 'Metric', 'Δ', 'p-value', '95% CI', 'Sig'].map(col => (
              <th key={col} style={{
                padding: '0.5rem 0.6rem',
                textAlign: 'left',
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#545b7a',
                whiteSpace: 'nowrap',
              }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, i) => {
            const typeInfo = getTypeLabel(metric.type);
            const dirStyle = getDirectionStyle(metric);
            const isGuardrail = metric.type === 'guardrail' && metric.significant;
            const rowBg = isGuardrail ? 'rgba(239,68,68,0.06)' : (i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)');

            return (
              <tr key={i} style={{ background: rowBg, borderBottom: '1px solid #1e2235' }}>
                <td style={{ padding: '0.5rem 0.6rem', whiteSpace: 'nowrap' }}>
                  <span style={{
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.4rem',
                    borderRadius: '3px',
                    color: typeInfo.color,
                    background: typeInfo.bg,
                    letterSpacing: '0.04em',
                  }}>{typeInfo.label}</span>
                </td>
                <td style={{ padding: '0.5rem 0.6rem', color: '#c5c9d8', maxWidth: '200px' }}>
                  <div style={{ fontWeight: metric.type === 'primary' ? 600 : 400 }}>
                    {metric.metric}
                  </div>
                  {metric.note && (
                    <div style={{ fontSize: '0.72rem', color: '#545b7a', marginTop: '0.2rem', lineHeight: 1.4 }}>
                      {metric.note}
                    </div>
                  )}
                </td>
                <td style={{ padding: '0.5rem 0.6rem', ...dirStyle, fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <DirectionArrow direction={metric.direction} significant={metric.significant} />
                  {' '}{metric.delta}
                </td>
                <td style={{ padding: '0.5rem 0.6rem', fontFamily: 'monospace', color: metric.pValue != null && metric.pValue < 0.05 ? '#e8eaf0' : '#8890a8', whiteSpace: 'nowrap' }}>
                  {metric.pValue != null ? metric.pValue.toFixed(3) : '—'}
                </td>
                <td style={{ padding: '0.5rem 0.6rem', fontFamily: 'monospace', fontSize: '0.78rem', color: '#8890a8', whiteSpace: 'nowrap' }}>
                  {metric.confidenceInterval || '—'}
                </td>
                <td style={{ padding: '0.5rem 0.6rem', textAlign: 'center', fontSize: '1rem' }}>
                  {metric.significant === true ? (
                    <span style={{ color: isGuardrail ? '#ef4444' : '#22c55e' }}>
                      {isGuardrail ? '⚠' : '✓'}
                    </span>
                  ) : metric.significant === false ? (
                    <span style={{ color: '#545b7a' }}>✗</span>
                  ) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
