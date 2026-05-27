import { useState } from 'react';
import { challengesCases } from '../data/challengesCases.js';
import { getAllChallengesProgress } from '../utils/challengesProgress.js';

const DIFF_CFG = {
  senior: { label: 'Senior', color: 'var(--yellow)',  bg: 'var(--yellow-bg)',  border: 'var(--yellow-border)' },
  staff:  { label: 'Staff',  color: 'var(--red)',     bg: 'var(--red-bg)',     border: 'var(--red-border)' },
};

const RATING_COLOR = {
  strong:  'var(--green)',
  partial: 'var(--yellow)',
  miss:    'var(--red)',
};

const ROOM_LABEL = {
  'stats':           'Statistics',
  'rca':             'RCA',
  'metrics':         'Metrics',
  'growth-analytics':'Growth',
  'product-design':  'Product Design',
  'estimation':      'Estimation',
  'code':            'SQL / Code',
};

const ROOM_COLOR = {
  'stats':            { color: 'var(--accent)',    bg: 'var(--accent-bg)',    border: 'var(--accent-border)' },
  'rca':              { color: 'var(--purple)',    bg: 'var(--purple-bg)',    border: 'var(--purple-border)' },
  'metrics':          { color: 'var(--green)',     bg: 'var(--green-bg)',     border: 'var(--green-border)' },
  'growth-analytics': { color: 'var(--teal)',      bg: 'var(--teal-bg)',      border: 'var(--teal-border)' },
  'product-design':   { color: 'var(--purple)',    bg: 'var(--purple-bg)',    border: 'var(--purple-border)' },
  'estimation':       { color: 'var(--yellow)',    bg: 'var(--yellow-bg)',    border: 'var(--yellow-border)' },
  'code':             { color: 'var(--blue-text)', bg: 'var(--blue-bg)',      border: 'var(--blue-border)' },
};

// Sort: senior first, then staff
const sortedCases = [...challengesCases].sort((a, b) => {
  const order = { senior: 0, staff: 1 };
  return (order[a.difficulty] ?? 9) - (order[b.difficulty] ?? 9);
});

export function ChallengesBrowser({ onSelectChallenge, unlocked }) {
  const allProgress = getAllChallengesProgress();
  const completedCount = Object.keys(allProgress).length;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'var(--red-bg)', border: '1px solid var(--red-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
          }}>
            ⚡
          </span>
          <div>
            <div style={{
              fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'var(--red)', marginBottom: '0.15rem',
            }}>
              Cross-Room Challenges
            </div>
            <h1 style={{
              fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)',
              margin: 0, letterSpacing: '-0.02em',
            }}>
              Cross-Room Challenges
            </h1>
          </div>
        </div>

        <p style={{
          color: 'var(--text-muted)', fontSize: '0.95rem',
          margin: '0 0 0.75rem', maxWidth: '640px', lineHeight: 1.6,
        }}>
          Compound scenarios requiring knowledge from 2–3 rooms simultaneously. Each challenge mirrors a real staff+ interview or take-home where a single room of knowledge is not enough.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            6 challenges
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            Senior–Staff difficulty
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            20–30 min each
          </span>
          {completedCount > 0 && (
            <span style={{ fontSize: '0.82rem', color: 'var(--red)' }}>
              ⚡ {completedCount} completed
            </span>
          )}
        </div>
      </div>

      {/* Challenge grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(400px, 100%), 1fr))',
        gap: '1rem',
      }}>
        {sortedCases.map(c => {
          const prog = allProgress[c.id];
          const isLocked = !c.isFree && !unlocked;
          const diffCfg = DIFF_CFG[c.difficulty] || DIFF_CFG.senior;
          const isHovered = hoveredId === c.id;

          return (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectChallenge(c.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectChallenge(c.id);
                }
              }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isHovered ? 'var(--red-border)' : 'var(--border)'}`,
                borderRadius: '10px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s',
                opacity: isLocked ? 0.7 : 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                boxShadow: isHovered ? '0 2px 12px rgba(220,38,38,0.08)' : 'none',
              }}
            >
              {/* Top row: ID + badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
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
                  fontSize: '0.7rem', fontWeight: 500,
                  color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
                  borderRadius: '4px', padding: '0.1rem 0.4rem',
                }}>
                  {c.company}
                </span>

                <span style={{
                  fontSize: '0.7rem', color: 'var(--text-dim)',
                  marginLeft: 'auto', flexShrink: 0,
                }}>
                  ~{c.estimatedMin} min
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

                {isLocked && <span style={{ fontSize: '0.8rem' }}>🔒</span>}

                {prog && (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    color: RATING_COLOR[prog.rating] || 'var(--red)',
                  }}>
                    ✓
                  </span>
                )}
              </div>

              {/* Title + subtitle */}
              <div>
                <div style={{
                  fontWeight: 700, fontSize: '1rem', color: 'var(--text)',
                  marginBottom: '0.2rem', lineHeight: 1.3,
                }}>
                  {c.title}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {c.subtitle}
                </div>
              </div>

              {/* Room badges */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {c.rooms.map(room => {
                  const rc = ROOM_COLOR[room] || { color: 'var(--text-muted)', bg: 'var(--surface-2)', border: 'var(--border)' };
                  return (
                    <span key={room} style={{
                      fontSize: '0.68rem', fontWeight: 600,
                      color: rc.color, background: rc.bg, border: `1px solid ${rc.border}`,
                      borderRadius: '4px', padding: '0.15rem 0.45rem',
                    }}>
                      {ROOM_LABEL[room] || room}
                    </span>
                  );
                })}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {c.tags.slice(0, 4).map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.68rem', color: 'var(--text-dim)',
                    background: 'var(--surface-2)', borderRadius: '4px',
                    padding: '0.1rem 0.4rem', border: '1px solid var(--border-subtle)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.25rem' }}>
                {prog ? (
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: RATING_COLOR[prog.rating] || 'var(--teal)',
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                    borderRadius: '6px', padding: '0.3rem 0.7rem',
                  }}>
                    {prog.rating === 'strong' ? '✓ Nailed it' : prog.rating === 'partial' ? '~ Close' : '✗ Revisit'}
                  </span>
                ) : (
                  <span />
                )}

                <button
                  onClick={e => { e.stopPropagation(); onSelectChallenge(c.id); }}
                  style={{
                    background: isHovered ? 'var(--red-bg)' : 'transparent',
                    border: `1px solid ${isHovered ? 'var(--red-border)' : 'var(--border)'}`,
                    color: isHovered ? 'var(--red)' : 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.78rem', fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform var(--transition), box-shadow var(--transition), border-color var(--transition)',
                  }}
                >
                  Start Challenge →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
