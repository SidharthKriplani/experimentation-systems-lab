import { useState } from 'react';
import { estimationProblems } from '../data/estimationProblems.js';
import { getAllEstimationProgress } from '../utils/estimationProgress.js';

const TAGS = ['All', 'market-sizing', 'product-metrics', 'cost-estimation', 'capacity'];

const DIFFICULTY_COLOR = {
  Analyst: { color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)' },
  Senior:  { color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)' },
};

const APPROACH_COLOR = {
  'bottom-up': { color: 'var(--teal)',   bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
  'top-down':  { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  'hybrid':    { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
};

const RATING_COLOR = {
  strong:  'var(--green)',
  partial: 'var(--yellow)',
  miss:    'var(--red)',
};

const CATEGORY_LABEL = {
  'market-sizing':   'Market Sizing',
  'product-metrics': 'Product Metrics',
  'cost-estimation': 'Cost Estimation',
  'capacity':        'Capacity',
};

export function EstimationBrowser({ onStart, unlocked }) {
  const [activeTag, setActiveTag] = useState('All');
  const progress = getAllEstimationProgress();

  const filtered = activeTag === 'All'
    ? estimationProblems
    : estimationProblems.filter(p => p.category === activeTag || p.tags.includes(activeTag));

  const completedCount = Object.keys(progress).length;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
          }}>
            ~
          </span>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
            Estimation Room
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 0.75rem', maxWidth: '640px', lineHeight: 1.6 }}>
          Back-of-envelope calculations and Fermi problems. Market sizing, cost estimation, and product metric estimation — the mental math skills that top DS interviews test.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {estimationProblems.length} problems
          </span>
          {completedCount > 0 && (
            <span style={{ fontSize: '0.82rem', color: 'var(--green)' }}>
              ✓ {completedCount} completed
            </span>
          )}
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {estimationProblems.filter(p => p.isFree).length} free to try
          </span>
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
              border: activeTag === tag ? '1px solid var(--teal-border)' : '1px solid var(--border)',
              background: activeTag === tag ? 'var(--teal-bg)' : 'var(--surface)',
              color: activeTag === tag ? 'var(--teal)' : 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: activeTag === tag ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {CATEGORY_LABEL[tag] || tag}
          </button>
        ))}
      </div>

      {/* Problem cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filtered.map(problem => {
          const prog = progress[problem.id];
          const isLocked = !problem.isFree && !unlocked;
          const dc = DIFFICULTY_COLOR[problem.difficulty] || {};
          const ac = APPROACH_COLOR[problem.approach] || {};

          return (
            <div
              key={problem.id}
              onClick={() => onStart(problem.id)}
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
                e.currentTarget.style.borderColor = 'var(--teal-border)';
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
                  {/* Badge row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    {/* Problem ID */}
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                      {problem.id}
                    </span>

                    {/* Difficulty */}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      color: dc.color, background: dc.bg, border: `1px solid ${dc.border}`,
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {problem.difficulty}
                    </span>

                    {/* Approach */}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500,
                      color: ac.color, background: ac.bg, border: `1px solid ${ac.border}`,
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {problem.approach}
                    </span>

                    {/* Category */}
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500,
                      color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {CATEGORY_LABEL[problem.category] || problem.category}
                    </span>

                    {/* Free badge */}
                    {problem.isFree && (
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                        borderRadius: '4px', padding: '0.1rem 0.4rem',
                      }}>
                        Free
                      </span>
                    )}

                    {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}
                  </div>

                  {/* Title */}
                  <div style={{ fontWeight: 600, fontSize: '0.97rem', color: 'var(--text)', marginBottom: '0.2rem' }}>
                    {problem.title}
                  </div>

                  {/* Subtitle */}
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                    {problem.subtitle}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {problem.tags.map(tag => (
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
                    {prog.rating === 'strong'
                      ? '✓ Nailed it'
                      : prog.rating === 'partial'
                      ? '~ Close'
                      : '✗ Revisit'}
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
