import { productDesignScenarios } from '../data/productDesignScenarios.js';
import { getAllProductDesignProgress } from '../utils/productDesignProgress.js';

const DIFFICULTY_CONFIG = {
  medium: { label: 'Mid-Level', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  hard:   { label: 'Senior',    color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

const LEVEL_CONFIG = {
  excellent:     { label: 'Excellent',   color: 'var(--teal)' },
  strong:        { label: 'Strong',      color: 'var(--green)' },
  developing:    { label: 'Developing',  color: 'var(--yellow)' },
  needs_practice:{ label: 'Try Again',   color: 'var(--text-muted)' },
};

function DifficultyBadge({ difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.medium;
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
    }}>
      {cfg.label}
    </span>
  );
}

function CategoryBadge({ category }) {
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
      color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
    }}>
      {category}
    </span>
  );
}

export function ProductDesignBrowser({ onSelectScenario, unlocked, onUnlock }) {
  const allProgress = getAllProductDesignProgress();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--purple)', marginBottom: '0.4rem',
        }}>
          Product Design Room
        </div>
        <h1 style={{
          fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)',
          margin: '0 0 0.5rem', letterSpacing: '-0.02em',
        }}>
          Product Design Practice
        </h1>
        <p style={{
          fontSize: '0.88rem', color: 'var(--text-secondary)',
          margin: '0 0 1rem', lineHeight: 1.6, maxWidth: '580px',
        }}>
          PM-style product design questions from real companies. Work through 5 phases — Clarify, Users, Goals, Solutions, Prioritize — then compare your thinking to a senior PM model answer.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: 'var(--purple-bg)', border: '1px solid var(--purple-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem',
            fontSize: '0.72rem', color: 'var(--purple)',
          }}>
            ◆ 5 phases per scenario
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.6rem',
            fontSize: '0.72rem', color: 'var(--text-muted)',
          }}>
            Self-scored with model answers
          </div>
        </div>
      </div>

      {/* Scenario cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {productDesignScenarios.map((scenario, idx) => {
          const progress = allProgress[scenario.id];
          const result = progress?.result;
          const levelCfg = result ? LEVEL_CONFIG[result.level] : null;
          const isLocked = !scenario.isFree && !unlocked;
          const phasesComplete = progress?.completedPhaseIds?.length || 0;

          return (
            <div
              key={scenario.id}
              style={{
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--surface)',
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                transition: 'all 0.12s',
                opacity: isLocked ? 0.7 : 1,
                position: 'relative',
              }}
              onClick={() => isLocked ? onUnlock?.() : onSelectScenario(scenario.id)}
              onMouseEnter={e => {
                if (!isLocked) {
                  e.currentTarget.style.borderColor = 'var(--purple-border)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Badges row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                {/* Company dot */}
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  color: scenario.companyColor || 'var(--accent)',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
                }}>
                  {scenario.company}
                </span>
                <DifficultyBadge difficulty={scenario.difficulty} />
                <CategoryBadge category={scenario.category} />
                {scenario.isFree && idx === 0 && (
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                    color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                    borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.4rem',
                  }}>
                    Free
                  </span>
                )}
                {isLocked && (
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, color: 'var(--text-muted)',
                    marginLeft: 'auto',
                  }}>
                    🔒 Unlock
                  </span>
                )}
              </div>

              {/* Title */}
              <div style={{
                fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)',
                lineHeight: 1.35, marginBottom: '0.35rem',
              }}>
                {scenario.title}
              </div>

              {/* Prompt preview */}
              <div style={{
                fontSize: '0.8rem', color: 'var(--text-muted)',
                lineHeight: 1.55, marginBottom: '0.6rem',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {scenario.prompt.split('\n\n')[0]}
              </div>

              {/* Footer row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {/* Phase progress pips */}
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {scenario.phases.map((p, i) => (
                      <div key={p.id} style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: i < phasesComplete ? 'var(--purple)' : 'var(--border)',
                        transition: 'background 0.15s',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {phasesComplete === 0
                      ? '5 phases'
                      : phasesComplete === scenario.phases.length
                        ? 'Completed'
                        : `${phasesComplete}/${scenario.phases.length} phases`}
                  </span>
                </div>

                {levelCfg && (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    color: levelCfg.color,
                  }}>
                    {levelCfg.label}
                  </span>
                )}

                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  ~25 min →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: '2rem', padding: '0.9rem 1.1rem',
        background: 'var(--purple-bg)', border: '1px solid var(--purple-border)',
        borderRadius: 'var(--radius)', fontSize: '0.8rem', color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--purple)' }}>How it works:</strong> Each scenario presents a real product design challenge. Write your answer for each phase, then reveal the model answer. Self-rate your response (Strong / Partial / Missed), and move to the next phase. No wrong answers — the goal is to build a mental model of how senior PMs structure product thinking.
      </div>
    </div>
  );
}
