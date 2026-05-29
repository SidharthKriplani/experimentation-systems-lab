import { useState } from 'react';
import { rcaFoundationModules } from '../data/rcaFoundationModules.js';
import { getAllRCAFoundationProgress } from '../utils/rcaFoundationProgress.js';
import { Icon } from '../components/shared/Icon.jsx';

const DIFFICULTY_CONFIG = {
  Beginner:     { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
  Intermediate: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  Advanced:     { color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

function DifficultyBadge({ difficulty }) {
  const cfg = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Beginner;
  return (
    <span style={{
      fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
      color: cfg.color, background: cfg.bg, border: '1px solid ' + cfg.border,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
    }}>
      {difficulty}
    </span>
  );
}

function StepCircle({ index, completed, isCurrent }) {
  const bg = completed ? 'var(--teal)' : isCurrent ? 'var(--teal-bg)' : 'var(--surface-2)';
  const border = completed ? 'var(--teal)' : isCurrent ? 'var(--teal-border)' : 'var(--border)';
  const color = completed ? '#fff' : isCurrent ? 'var(--teal)' : 'var(--text-muted)';
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
      background: bg, border: '2px solid ' + border,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.75rem', fontWeight: 800, color, transition: 'all 0.15s',
    }}>
      {completed ? '✓' : index}
    </div>
  );
}

export function RCAFoundationsBrowser({ onStart, unlocked, onNavigate }) {
  const progress = getAllRCAFoundationProgress();
  const completedIds = new Set(Object.keys(progress));
  const firstIncomplete = rcaFoundationModules.find(m => !completedIds.has(m.id));

  const totalCompleted = completedIds.size;
  const total = rcaFoundationModules.length;

  return (
    <div className="pal-page-enter" style={{ maxWidth: 780, margin: '0 auto', padding: '2rem 1.25rem 3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <Icon name="search" size={20} color="var(--teal)" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: 0 }}>
            RCA Foundations
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
          When a key metric drops, the first question you'll face is: why? Root cause analysis (RCA) is the structured process of answering that without guessing — and it's one of the most tested skills for senior analyst and PM roles. Most candidates fail it by jumping to explanations before ruling out data quality issues or external factors. These 6 modules build the discipline to work through it correctly, every time.
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: 'var(--teal)',
              width: (totalCompleted / total * 100) + '%', transition: 'width 0.3s',
            }} />
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flexShrink: 0 }}>
            {totalCompleted}/{total} complete
          </span>
        </div>
      </div>

      {/* Continue / Start CTA */}
      {firstIncomplete && (
        <div style={{
          background: 'var(--teal-bg)', border: '1.5px solid var(--teal-border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
              {totalCompleted === 0 ? 'Start here' : 'Continue'}
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.92rem' }}>
              {firstIncomplete.index}. {firstIncomplete.title}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.1rem' }}>
              {firstIncomplete.estimatedMin} min · {firstIncomplete.difficulty}
            </div>
          </div>
          <button
            onClick={() => onStart(firstIncomplete.id)}
            style={{
              padding: '0.6rem 1.4rem', borderRadius: 'var(--radius-sm)', border: 'none',
              background: 'var(--teal)', color: '#fff', fontWeight: 700, fontSize: '0.88rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {totalCompleted === 0 ? 'Start →' : 'Continue →'}
          </button>
        </div>
      )}

      {totalCompleted === total && (
        <div style={{
          background: 'var(--teal-bg)', border: '1.5px solid var(--teal-border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem',
          textAlign: 'center', color: 'var(--teal)', fontWeight: 700, fontSize: '0.95rem',
        }}>
          ✓ All 6 modules complete. RCA fundamentals locked in.
        </div>
      )}

      {/* Module list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0' }}>
        {rcaFoundationModules.map((m, index) => {
          const completed = completedIds.has(m.id);
          const isCurrent = firstIncomplete?.id === m.id;
          const isLocked = !m.isFree && !unlocked;
          return (
            <button
              key={m.id}
              className="pal-card-enter pal-card-hover"
              onClick={() => !isLocked && onStart(m.id)}
              style={{
                animationDelay: String(Math.min(index * 28, 400)) + 'ms',
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius)',
                border: '1px solid ' + (isCurrent ? 'var(--teal-border)' : 'var(--border)'),
                background: isCurrent ? 'var(--teal-bg)' : completed ? 'var(--surface-2)' : 'var(--surface)',
                cursor: isLocked ? 'default' : 'pointer',
                textAlign: 'left', width: '100%',
                opacity: isLocked ? 0.6 : 1,
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <StepCircle index={m.index} completed={completed} isCurrent={isCurrent} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
                    {m.title}
                  </span>
                  <DifficultyBadge difficulty={m.difficulty} />
                  {isLocked && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>🔒</span>
                  )}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                  {m.subtitle}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                {m.estimatedMin}m
              </span>
            </button>
          );
        })}
      </div>

      {/* Ready to practice CTA */}
      {onNavigate && (
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem 1.5rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>
              Ready to practice?
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Apply what you learned in the practice rooms.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('rca')} style={{
              padding: '0.45rem 1rem', borderRadius: '6px',
              background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
              color: 'var(--yellow)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            }}>RCA Room →</button>
            <button onClick={() => onNavigate('cases')} style={{
              padding: '0.45rem 1rem', borderRadius: '6px',
              background: 'var(--purple-bg)', border: '1px solid var(--purple-border)',
              color: 'var(--purple)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            }}>Cases Room →</button>
          </div>
        </div>
      )}
    </div>
  );
}
