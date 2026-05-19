import { metricCases } from '../data/metricCases.js';
import { getMetricsProgress } from '../utils/metricsProgress.js';

const DIFF_CFG = {
  foundational: { label: 'Foundational', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  analyst:      { label: 'Analyst',      color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior:       { label: 'Senior',       color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  staff:        { label: 'Staff',        color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
};

const LEVEL_CFG = {
  staff:   { label: 'Staff-level',   color: 'var(--purple)',    bg: 'var(--purple-bg)',  border: 'var(--purple-border)' },
  senior:  { label: 'Senior-ready',  color: 'var(--teal)',      bg: 'var(--teal-bg)',    border: 'var(--teal-border)' },
  analyst: { label: 'Analyst-ready', color: 'var(--blue-text)', bg: 'var(--blue-bg)',    border: 'var(--blue-border)' },
  junior:  { label: 'Junior miss',   color: 'var(--yellow)',    bg: 'var(--yellow-bg)',  border: 'var(--yellow-border)' },
};

export function MetricsBrowser({ onSelectCase }) {
  const completedCount = metricCases.filter(c => getMetricsProgress(c.id)).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--green)', marginBottom: '0.4rem',
        }}>
          Metrics Room
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Metric Design
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6, maxWidth: '540px' }}>
          Design the right metric before you measure the wrong thing. Choose your primary metric,
          diagnostics, guardrails, grain, and decision rule — then see the senior standard.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <RoomBadge />
          <StatPill n={completedCount} label="completed" color="var(--green)" />
        </div>
      </div>

      {/* Case cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '0.85rem',
      }}>
        {metricCases.map(mc => {
          const progress = getMetricsProgress(mc.id);
          const levelCfg = progress?.bestLevel ? LEVEL_CFG[progress.bestLevel] : null;
          const diffCfg = DIFF_CFG[mc.difficulty] || DIFF_CFG.analyst;

          return (
            <div
              key={mc.id}
              onClick={() => onSelectCase(mc.id)}
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.12s',
                display: 'flex', flexDirection: 'column', gap: '0.6rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--green-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Badges row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: diffCfg.color, background: diffCfg.bg, border: `1px solid ${diffCfg.border}`,
                  borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem',
                }}>{diffCfg.label}</span>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem',
                }}>{mc.domain}</span>
                {levelCfg && (
                  <span style={{
                    fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: levelCfg.color, background: levelCfg.bg, border: `1px solid ${levelCfg.border}`,
                    borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem',
                  }}>✓ {levelCfg.label}</span>
                )}
              </div>

              {/* Title + subtitle */}
              <div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.2rem', letterSpacing: '-0.01em', lineHeight: 1.35 }}>
                  {mc.title}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                  {mc.subtitle}
                </p>
              </div>

              {/* Context trap hint */}
              <p style={{
                fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5,
                borderLeft: '2px solid var(--border-subtle)', paddingLeft: '0.6rem',
              }}>
                {mc.context.trap}
              </p>

              {/* Bottom row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                {progress ? (
                  <span style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>
                    {progress.attempts} attempt{progress.attempts !== 1 ? 's' : ''} · Resume →
                  </span>
                ) : (
                  <span style={{ fontSize: '0.73rem', color: 'var(--text-dim)' }}>Not started</span>
                )}
                {!isLocked && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>→</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function RoomBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      background: 'var(--green-bg)', border: '1px solid var(--green-border)',
      borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem',
      fontSize: '0.75rem', color: 'var(--green)', fontWeight: 700,
    }}>
      Metrics · {metricCases.length} Cases
    </div>
  );
}

function StatPill({ n, label, color }) {
  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.7rem',
      display: 'flex', alignItems: 'baseline', gap: '0.3rem',
    }}>
      <span style={{ fontSize: '1rem', fontWeight: 800, color: color || 'var(--green)', lineHeight: 1 }}>{n}</span>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{label}</span>
    </div>
  );
}
