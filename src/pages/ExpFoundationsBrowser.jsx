import { useState } from 'react';
import { expFoundationModules } from '../data/expFoundationModules.js';
import { getAllExpFoundationProgress } from '../utils/expFoundationProgress.js';

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
      color: cfg.color, background: cfg.bg, border: '1px solid ' + cfg.border,
      borderRadius: 'var(--radius-sm)', padding: '0.1rem 0.45rem',
    }}>
      {difficulty}
    </span>
  );
}

function StepCircle({ index, completed, isCurrent }) {
  const bg = completed ? 'var(--accent)' : isCurrent ? 'var(--accent-bg)' : 'var(--surface-2)';
  const border = completed ? 'var(--accent)' : isCurrent ? 'var(--accent-border)' : 'var(--border)';
  const color = completed ? '#fff' : isCurrent ? 'var(--accent)' : 'var(--text-muted)';
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

export function ExpFoundationsBrowser({ onStart, unlocked }) {
  const progress = getAllExpFoundationProgress();
  const completedIds = new Set(
    Object.keys(progress).filter(k => progress[k] && progress[k].completedAt)
  );
  const firstIncomplete = expFoundationModules.find(m => !completedIds.has(m.id));

  const totalCompleted = completedIds.size;
  const total = expFoundationModules.length;

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '2rem 1.25rem 3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.4rem' }}>⚗️</span>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', margin: 0 }}>
            Experimentation Foundations
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
          The theory behind A/B testing — before you practice design and review.
          7 interactive modules covering causality, randomization units, statistical power, p-values, SRM, novelty effects, and multiple testing.
        </p>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 3, background: 'var(--accent)',
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
          background: 'var(--accent-bg)', border: '1.5px solid var(--accent-border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
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
              background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.88rem',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {totalCompleted === 0 ? 'Start →' : 'Continue →'}
          </button>
        </div>
      )}

      {totalCompleted === total && (
        <div style={{
          background: 'var(--accent-bg)', border: '1.5px solid var(--accent-border)',
          borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem',
          textAlign: 'center', color: 'var(--accent)', fontWeight: 700, fontSize: '0.95rem',
        }}>
          ✓ All 7 modules complete. Experimentation fundamentals locked in.
        </div>
      )}

      {/* Module list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {expFoundationModules.map((m) => {
          const completed = completedIds.has(m.id);
          const isCurrent = firstIncomplete && firstIncomplete.id === m.id;
          const isLocked = !m.isFree && !unlocked;
          return (
            <button
              key={m.id}
              onClick={() => !isLocked && onStart(m.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius)',
                border: '1px solid ' + (isCurrent ? 'var(--accent-border)' : 'var(--border)'),
                background: isCurrent ? 'var(--accent-bg)' : completed ? 'var(--surface-2)' : 'var(--surface)',
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
    </div>
  );
}
