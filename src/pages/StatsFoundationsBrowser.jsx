import { useState } from 'react';
import { statsFoundationsModules } from '../data/statsFoundationsModules.js';
import { getAllStatFoundationsProgress } from '../utils/statsFoundationsProgress.js';

const DIFFICULTY_CONFIG = {
  Beginner:     { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
  Intermediate: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  Advanced:     { color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

function DifficultyBadge({ difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Beginner;
  return (
    <span style={{
      fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
    }}>
      {difficulty}
    </span>
  );
}

function StepCircle({ index, completed, isCurrent }) {
  const bg = completed
    ? 'var(--yellow)'
    : isCurrent
      ? 'var(--yellow-bg)'
      : 'var(--surface-2)';
  const border = completed
    ? 'var(--yellow)'
    : isCurrent
      ? 'var(--yellow-border)'
      : 'var(--border)';
  const color = completed
    ? '#fff'
    : isCurrent
      ? 'var(--yellow)'
      : 'var(--text-muted)';

  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
      background: bg, border: `2px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.75rem', fontWeight: 800, color,
      transition: 'all 0.15s',
    }}>
      {completed ? '✓' : index}
    </div>
  );
}

export function StatsFoundationsBrowser({ onStart, unlocked }) {
  const [allProgress] = useState(() => getAllStatFoundationsProgress());

  const completedIds = new Set(Object.keys(allProgress));
  const completedCount = completedIds.size;

  // Determine the current module: first non-completed, or last if all done
  const currentModuleIndex = statsFoundationsModules.findIndex(m => !completedIds.has(m.id));
  const currentModuleId = currentModuleIndex === -1
    ? null
    : statsFoundationsModules[currentModuleIndex].id;

  const progressPercent = Math.round((completedCount / statsFoundationsModules.length) * 100);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem', width: '100%', boxSizing: 'border-box' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: 'var(--yellow)', marginBottom: '0.4rem',
        }}>
          Stat Foundations
        </div>
        <h1 style={{
          fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)',
          margin: '0 0 0.5rem', letterSpacing: '-0.02em',
        }}>
          Stat Foundations
        </h1>
        <p style={{
          fontSize: '0.88rem', color: 'var(--text-secondary)',
          margin: '0 0 1.25rem', lineHeight: 1.6, maxWidth: '540px',
        }}>
          Ground-up statistical intuition — from data types to hypothesis testing
        </p>

        {/* Progress bar */}
        <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {completedCount} / {statsFoundationsModules.length} complete
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--yellow)', fontWeight: 700 }}>
            {progressPercent}%
          </span>
        </div>
        <div style={{
          width: '100%', height: '6px', background: 'var(--yellow-bg)',
          borderRadius: '999px', overflow: 'hidden',
          border: '1px solid var(--yellow-border)',
        }}>
          <div style={{
            height: '100%', width: `${progressPercent}%`,
            background: 'var(--yellow)', borderRadius: '999px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Module list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {statsFoundationsModules.map((module, idx) => {
          const isCompleted = completedIds.has(module.id);
          const isCurrent = module.id === currentModuleId;
          const isLocked = !module.isFree && !unlocked;
          const isFirst = idx === 0;
          const isLast = idx === statsFoundationsModules.length - 1;

          const cardBorder = isCurrent
            ? '2px solid var(--yellow-border)'
            : '1.5px solid var(--border)';
          const cardBg = isCurrent
            ? 'var(--yellow-bg)'
            : isCompleted
              ? 'var(--surface)'
              : 'var(--surface)';

          return (
            <div key={module.id} style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
              {/* Left connector column */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: '48px', flexShrink: 0,
              }}>
                {/* Top connector line */}
                <div style={{
                  width: '2px', flex: isFirst ? '0 0 16px' : '0 0 12px',
                  background: isFirst ? 'transparent' : (isCompleted ? 'var(--yellow)' : 'var(--border)'),
                }} />
                <StepCircle index={module.index} completed={isCompleted} isCurrent={isCurrent} />
                {/* Bottom connector line */}
                <div style={{
                  width: '2px', flex: '1 1 0',
                  background: isLast ? 'transparent' : (isCompleted ? 'var(--yellow)' : 'var(--border)'),
                  minHeight: '12px',
                }} />
              </div>

              {/* Card */}
              <div style={{
                flex: 1,
                margin: `${isFirst ? '0' : '4px'} 0 4px 0`,
                border: cardBorder,
                borderRadius: 'var(--radius)',
                background: cardBg,
                padding: '0.9rem 1.1rem',
                cursor: isLocked ? 'default' : 'pointer',
                opacity: isLocked && !isCompleted ? 0.72 : 1,
                transition: 'all 0.12s',
              }}
                onClick={() => {
                  if (!isLocked) onStart?.(module.id);
                }}
                onMouseEnter={e => {
                  if (!isLocked) {
                    e.currentTarget.style.borderColor = 'var(--yellow)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isCurrent ? 'var(--yellow-border)' : 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Badges row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                  <DifficultyBadge difficulty={module.difficulty} />
                  {module.isFree && (
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
                      fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 'auto',
                    }}>
                      🔒 Unlock to access
                    </span>
                  )}
                  {isCompleted && (
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      color: 'var(--yellow)', marginLeft: 'auto',
                    }}>
                      Completed
                    </span>
                  )}
                </div>

                {/* Title + subtitle */}
                <div style={{
                  fontSize: '0.97rem', fontWeight: 700, color: 'var(--text)',
                  lineHeight: 1.3, marginBottom: '0.2rem',
                }}>
                  {module.title}
                </div>
                <div style={{
                  fontSize: '0.8rem', color: 'var(--text-muted)',
                  lineHeight: 1.5, marginBottom: '0.65rem',
                }}>
                  {module.subtitle}
                </div>

                {/* Key insight */}
                <div style={{
                  fontSize: '0.76rem', color: 'var(--text-secondary)',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', padding: '0.45rem 0.7rem',
                  lineHeight: 1.55, marginBottom: '0.65rem',
                  fontStyle: 'italic',
                }}>
                  {module.keyInsight}
                </div>

                {/* Footer row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ~{module.estimatedMin} min
                  </span>
                  {!isLocked && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onStart?.(module.id);
                      }}
                      style={{
                        background: isCurrent ? 'var(--yellow)' : isCompleted ? 'var(--surface-2)' : 'var(--surface-2)',
                        border: `1px solid ${isCurrent ? 'var(--yellow)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-sm)',
                        color: isCurrent ? '#fff' : 'var(--text-muted)',
                        fontSize: '0.75rem', fontWeight: 700,
                        padding: '0.25rem 0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.12s',
                      }}
                    >
                      {isCompleted ? 'Review' : isCurrent ? 'Start →' : 'Start'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div style={{
        marginTop: '2rem', padding: '0.9rem 1.1rem',
        background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
        borderRadius: 'var(--radius)', fontSize: '0.8rem', color: 'var(--text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--yellow)' }}>How it works:</strong> Each module builds on the previous. Work through them in order — every concept connects to a specific experiment design or interpretation decision you will face in product analytics.
      </div>
    </div>
  );
}
