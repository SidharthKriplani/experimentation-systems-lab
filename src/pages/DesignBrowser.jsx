import { designScenarios } from '../data/designScenarios.js';
import { getAllDesignProgress } from '../utils/designProgress.js';

const LEVEL_COLORS = {
  staff_level:   { color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
  senior_ready:  { color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  analyst_ready: { color: 'var(--blue-text)', bg: 'var(--blue-bg)',   border: 'var(--blue-border)' },
};

export function DesignBrowser({ onSelectScenario, unlocked, onUnlock }) {
  const allProgress = getAllDesignProgress();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--teal)', marginBottom: '0.4rem',
        }}>
          Design Room
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
          Experiment Design
        </h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', lineHeight: 1.6, maxWidth: '540px' }}>
          Design A/B tests from scratch before seeing results. Set the primary metric, randomization unit, trust checks, and decision rule — then compare your design to the senior analyst standard.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem',
          fontSize: '0.75rem', color: 'var(--accent)',
        }}>
          <span>◆</span>
          <span>Pairs with Review Room scenarios</span>
        </div>
      </div>

      {/* Scenario cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {designScenarios.map(scenario => {
          const progress = allProgress[scenario.id];
          const isLocked = !scenario.isFree && !unlocked;
          const bestLevel = progress?.bestLevel;
          const levelCfg = bestLevel ? LEVEL_COLORS[bestLevel] : null;

          return (
            <div
              key={scenario.id}
              style={{
                border: `1.5px solid ${isLocked ? 'var(--border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                background: 'var(--surface)',
                padding: '1.1rem 1.25rem',
                cursor: isLocked ? 'default' : 'pointer',
                opacity: isLocked ? 0.7 : 1,
                transition: 'all 0.12s',
                position: 'relative',
              }}
              onClick={() => !isLocked && onSelectScenario(scenario.id)}
              onMouseEnter={e => {
                if (!isLocked) {
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Badges row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                <DifficultyBadge difficulty={scenario.difficulty} />
                <IndustryBadge industry={scenario.industry} />
                {!scenario.isFree && (
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: 'var(--teal)', background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
                  }}>Beta</span>
                )}
                {scenario.pairedReviewScenarioId && (
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: 'var(--accent)', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
                  }}>◆ Paired</span>
                )}
                {levelCfg && (
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: levelCfg.color, background: levelCfg.bg, border: `1px solid ${levelCfg.border}`,
                    borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
                  }}>{progress.bestLevel.replace(/_/g, ' ')}</span>
                )}
              </div>

              {/* Title + subtitle */}
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 0.2rem', letterSpacing: '-0.01em' }}>
                {scenario.title}
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {scenario.subtitle}
              </p>

              {/* Progress or lock */}
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                {isLocked ? (
                  <button
                    onClick={e => { e.stopPropagation(); onUnlock(); }}
                    style={{
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
                      fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer',
                    }}
                  >
                    🔒 Unlock beta
                  </button>
                ) : progress?.attempts > 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {progress.attempts} attempt{progress.attempts > 1 ? 's' : ''} ·{' '}
                      Best: {Math.round((progress.bestScore || 0) * 100)}%
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>
                      Resume →
                    </span>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Not started
                  </span>
                )}

                {scenario.pairedReviewScenarioId && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Pairs with {scenario.pairedReviewScenarioId.replace(/^s\d+-/, '').replace(/-/g, ' ')} ↔
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Beta unlock note */}
      {!unlocked && (
        <div style={{
          marginTop: '1.5rem',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem',
          fontSize: '0.8rem', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap',
        }}>
          <span>🔒 2 beta scenarios require the unlock code.</span>
          <button
            onClick={onUnlock}
            style={{
              background: 'none', border: '1px solid var(--accent-border)',
              borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.65rem',
              color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Enter unlock code
          </button>
        </div>
      )}
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const cfg = {
    analyst: { label: 'Analyst', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
    senior:  { label: 'Senior',  color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
    staff:   { label: 'Staff',   color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
  }[difficulty] || { label: difficulty, color: 'var(--text-dim)', bg: 'var(--surface-2)', border: 'var(--border)' };

  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>{cfg.label}</span>
  );
}

function IndustryBadge({ industry }) {
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
    }}>{industry}</span>
  );
}
