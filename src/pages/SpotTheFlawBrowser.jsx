import { useState } from 'react';
import { spotTheFlawCases } from '../data/spotTheFlawCases.js';
import { getAllSTFProgress } from '../utils/spotTheFlawProgress.js';

const DIFF_CFG = {
  analyst: { label: 'Analyst', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior:  { label: 'Senior',  color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  staff:   { label: 'Staff',   color: 'var(--red)',       bg: 'var(--red-bg)',    border: 'var(--red-border)' },
};

const FLAW_TYPE_LABEL = {
  'srm':               'SRM',
  'peeking':           'Peeking',
  'simpsons-paradox':  'Simpson\'s Paradox',
  'novelty-effect':    'Novelty Effect',
  'multiple-testing':  'Multiple Testing',
  'bad-metric':        'Bad Metric',
  'selection-bias':    'Selection Bias',
  'sutva':             'SUTVA',
};

const ALL_FLAW_TYPES = ['All', 'srm', 'peeking', 'simpsons-paradox', 'novelty-effect', 'multiple-testing', 'bad-metric', 'selection-bias', 'sutva'];

const RATING_COLOR = {
  'caught it': 'var(--green)',
  'partial':   'var(--yellow)',
  'missed it': 'var(--red)',
};

export function SpotTheFlawBrowser({ onSelectCase, unlocked }) {
  const allProgress = getAllSTFProgress();
  const completedCount = Object.keys(allProgress).length;
  const [activeFlawType, setActiveFlawType] = useState('All');

  const filteredCases = activeFlawType === 'All'
    ? spotTheFlawCases
    : spotTheFlawCases.filter(c => c.flawType === activeFlawType);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'var(--red-bg)', border: '1px solid var(--red-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
          }}>
            🐛
          </span>
          <div>
            <div style={{
              fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'var(--red)', marginBottom: '0.15rem',
            }}>
              Spot the Flaw Room
            </div>
            <h1 style={{
              fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)',
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Spot the Flaw
            </h1>
          </div>
        </div>

        <p style={{
          color: 'var(--text-muted)', fontSize: '0.95rem',
          margin: '0 0 0.75rem', maxWidth: '640px', lineHeight: 1.6,
        }}>
          Identify broken analyses, bad metrics, and flawed experiments before they cause damage.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {spotTheFlawCases.length} cases
          </span>
          {completedCount > 0 && (
            <span style={{ fontSize: '0.82rem', color: 'var(--red)' }}>
              ✓ {completedCount} completed
            </span>
          )}
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {spotTheFlawCases.filter(c => c.isFree).length} free to try
          </span>
        </div>
      </div>

      {/* Flaw type filter chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {ALL_FLAW_TYPES.map(flawType => {
          const isActive = activeFlawType === flawType;
          return (
            <button
              key={flawType}
              onClick={() => setActiveFlawType(flawType)}
              style={{
                background: isActive ? 'var(--red-bg)' : 'var(--surface)',
                border: `1px solid ${isActive ? 'var(--red-border)' : 'var(--border)'}`,
                borderRadius: '20px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--red)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.12s',
              }}
            >
              {flawType === 'All' ? 'All' : FLAW_TYPE_LABEL[flawType]}
            </button>
          );
        })}
      </div>

      {/* Case cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {filteredCases.map(c => {
          const prog = allProgress[c.id];
          const isLocked = !c.isFree && !unlocked;
          const diffCfg = DIFF_CFG[c.difficulty] || DIFF_CFG.analyst;

          return (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectCase(c.id)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectCase(c.id); } }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                opacity: isLocked ? 0.7 : 1,
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--red-border)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  {/* Badge row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {c.id}
                    </span>

                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      color: diffCfg.color, background: diffCfg.bg, border: `1px solid ${diffCfg.border}`,
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {diffCfg.label}
                    </span>

                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600,
                      color: 'var(--red)', background: 'var(--red-bg)', border: '1px solid var(--red-border)',
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {c.flawLabel}
                    </span>

                    <span style={{
                      fontSize: '0.7rem', fontWeight: 500,
                      color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
                      borderRadius: '4px', padding: '0.1rem 0.4rem',
                    }}>
                      {c.company}
                    </span>

                    {c.isFree && (
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                        borderRadius: '4px', padding: '0.1rem 0.4rem',
                      }}>
                        Free
                      </span>
                    )}

                    {isLocked && <span style={{ fontSize: '0.75rem' }}>🔒</span>}

                    {prog && (
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        color: RATING_COLOR[prog.rating] || 'var(--red)',
                      }}>
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div style={{
                    fontWeight: 600, fontSize: '0.97rem', color: 'var(--text)', marginBottom: '0.35rem',
                  }}>
                    {c.title}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {c.tags.slice(0, 4).map(tag => (
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

                {/* Right side */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', flexShrink: 0 }}>
                  {prog ? (
                    <div style={{
                      fontSize: '0.75rem', fontWeight: 600,
                      color: prog.rating === 'caught it' ? 'var(--green)' : prog.rating === 'partial' ? 'var(--yellow)' : 'var(--red)',
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      borderRadius: '6px', padding: '0.3rem 0.6rem',
                      whiteSpace: 'nowrap',
                    }}>
                      {prog.rating === 'caught it' ? '✓ Caught it' : prog.rating === 'partial' ? '~ Partial' : '✗ Missed it'}
                    </div>
                  ) : (
                    <span style={{
                      fontSize: '0.78rem', fontWeight: 600,
                      color: 'var(--red)',
                    }}>
                      Find the Flaw →
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
