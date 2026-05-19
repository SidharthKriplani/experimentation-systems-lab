import { statsModules } from '../data/statsModules.js';
import { getAllStatsProgress } from '../utils/statsProgress.js';

const DIFF_CFG = {
  foundational: { label: 'Foundational', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  analyst:      { label: 'Analyst',      color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  senior:       { label: 'Senior',       color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
};

const LEVEL_CFG = {
  staff:   { label: 'Staff-Level',   color: 'var(--teal)',   bg: 'var(--teal-bg)',    border: 'var(--teal-border)' },
  strong:  { label: 'Senior-Ready',  color: 'var(--accent)', bg: 'var(--accent-bg)',  border: 'var(--accent-border)' },
  partial: { label: 'Analyst-Ready', color: 'var(--yellow)', bg: 'var(--yellow-bg)',  border: 'var(--yellow-border)' },
  wrong:   { label: 'Needs Work',    color: 'var(--red)',    bg: 'var(--red-bg)',     border: 'var(--red-border)' },
};

export function StatsBrowser({ onSelectModule }) {
  const allProgress = getAllStatsProgress();
  const completedCount = Object.keys(allProgress).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--accent)', marginBottom: '0.4rem',
        }}>
          Stats Room
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Statistical Concepts
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6, maxWidth: '540px' }}>
          Every concept appears inside a product decision — not as a textbook definition.
          Read the situation, inspect the data, make the call, then see how a senior analyst would have read it.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Stat n={statsModules.length} label="modules" />
          <Stat n={completedCount} label="completed" color="var(--teal)" />
        </div>
      </div>

      {/* Module cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {statsModules.map((module, i) => {
          const progress = allProgress[module.id];
          const levelCfg = progress?.bestLevel ? LEVEL_CFG[progress.bestLevel] : null;
          const diffCfg = DIFF_CFG[module.difficulty] || DIFF_CFG.foundational;

          return (
            <div
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                transition: 'all 0.12s',
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Module number */}
              <div style={{
                width: '2rem', height: '2rem', flexShrink: 0,
                background: levelCfg ? levelCfg.bg : 'var(--surface-2)',
                border: `1px solid ${levelCfg ? levelCfg.border : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 800,
                color: levelCfg ? levelCfg.color : 'var(--text-dim)',
              }}>
                {levelCfg ? '✓' : String(i + 1).padStart(2, '0')}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: diffCfg.color, background: diffCfg.bg, border: `1px solid ${diffCfg.border}`,
                    borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem',
                  }}>{diffCfg.label}</span>
                  <span style={{
                    fontSize: '0.58rem', fontWeight: 600,
                    color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>{module.concept}</span>
                  {levelCfg && (
                    <span style={{
                      fontSize: '0.58rem', fontWeight: 700,
                      color: levelCfg.color, background: levelCfg.bg, border: `1px solid ${levelCfg.border}`,
                      borderRadius: 'var(--radius-sm)', padding: '0.08rem 0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>{levelCfg.label}</span>
                  )}
                </div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.25rem', letterSpacing: '-0.01em' }}>
                  {module.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {module.subtitle}
                </p>

              </div>

              {/* Arrow */}
              <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', flexShrink: 0, paddingTop: '0.2rem' }}>→</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}

function Stat({ n, label, color }) {
  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.7rem',
      display: 'flex', alignItems: 'baseline', gap: '0.3rem',
    }}>
      <span style={{ fontSize: '1rem', fontWeight: 800, color: color || 'var(--accent)', lineHeight: 1 }}>{n}</span>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{label}</span>
    </div>
  );
}
