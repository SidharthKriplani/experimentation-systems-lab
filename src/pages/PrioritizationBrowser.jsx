import { useState } from 'react';
import { prioritizationScenarios } from '../data/prioritizationScenarios.js';
import { getAllPrioritizationProgress } from '../utils/prioritizationProgress.js';

const TAGS = ['All', 'RICE', 'effort-impact', 'technical debt', 'stakeholder conflict', 'OKRs', 'platform vs. feature'];

const DIFFICULTY_COLOR = {
  Intermediate: { color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  Advanced:     { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)'    },
};

const RATING_COLOR = {
  strong:  'var(--green)',
  partial: 'var(--yellow)',
  miss:    'var(--red)',
};

export function PrioritizationBrowser({ onStart, unlocked }) {
  const [activeTag, setActiveTag] = useState('All');
  const progress = getAllPrioritizationProgress();

  const filtered = activeTag === 'All'
    ? prioritizationScenarios
    : prioritizationScenarios.filter(s => s.tags.includes(activeTag));

  const completedCount = Object.keys(progress).length;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚖</span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
            Prioritization Room
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, maxWidth: '600px' }}>
          Practice RICE scoring, effort–impact matrices, stakeholder tradeoffs, and OKR-level decisions. Each scenario is a real PM judgment call — not a formula exercise.
        </p>
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {prioritizationScenarios.length} scenarios
          </span>
          {completedCount > 0 && (
            <span style={{ fontSize: '0.82rem', color: 'var(--green)' }}>
              ✓ {completedCount} completed
            </span>
          )}
        </div>
      </div>

      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '20px',
              border: activeTag === tag ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: activeTag === tag ? 'var(--accent-bg)' : 'var(--surface)',
              color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: activeTag === tag ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Scenario cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.map(scenario => {
          const prog = progress[scenario.id];
          const isLocked = !scenario.isFree && !unlocked;

          return (
            <div
              key={scenario.id}
              onClick={() => onStart(scenario.id)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                position: 'relative',
                opacity: isLocked ? 0.7 : 1,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    {/* Company */}
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {scenario.company}
                    </span>
                    {/* Difficulty */}
                    {(() => {
                      const dc = DIFFICULTY_COLOR[scenario.difficulty] || {};
                      return (
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 600,
                          color: dc.color, background: dc.bg, border: `1px solid ${dc.border}`,
                          borderRadius: '4px', padding: '0.1rem 0.4rem',
                        }}>
                          {scenario.difficulty}
                        </span>
                      );
                    })()}
                    {/* Free badge */}
                    {scenario.isFree && (
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                        borderRadius: '4px', padding: '0.1rem 0.4rem',
                      }}>Free</span>
                    )}
                    {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.97rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                    {scenario.title}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    {scenario.subtitle}
                  </div>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {scenario.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.72rem', color: 'var(--text-dim)',
                        background: 'var(--surface-2)', borderRadius: '4px',
                        padding: '0.1rem 0.45rem', border: '1px solid var(--border-subtle)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Completion indicator */}
                {prog && (
                  <div style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: RATING_COLOR[prog.rating] || 'var(--text-muted)',
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '0.3rem 0.6rem',
                    whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {prog.rating === 'strong' ? '✓ Nailed it' : prog.rating === 'partial' ? '~ Partial' : '✗ Revisit'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
