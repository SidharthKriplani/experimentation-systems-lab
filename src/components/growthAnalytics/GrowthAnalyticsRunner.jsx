import { useState } from 'react';
import { saveGrowthAnalyticsProgress, getGrowthAnalyticsProgress } from '../../utils/growthAnalyticsProgress.js';

const DIFF_CFG = {
  analyst: { label: 'Analyst', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)' },
  senior:  { label: 'Senior',  color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  staff:   { label: 'Staff',   color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)' },
};

const DOMAIN_LABEL = {
  'growth-accounting': 'Growth Accounting',
  'retention':         'Retention',
  'funnel':            'Funnel',
  'ltv':               'LTV',
  'engagement':        'Engagement',
  'acquisition':       'Acquisition',
};

const RATINGS = [
  { id: 'strong',  label: 'Nailed it',          sub: 'Correct diagnosis + showed the calculation' },
  { id: 'partial', label: 'Close',               sub: 'Right direction but missed a key step or number' },
  { id: 'miss',    label: 'Needs more practice', sub: 'Framework or diagnosis was off' },
];

const RATING_STYLE = {
  strong:  { color: 'var(--green)',  bg: 'var(--green-bg)',  border: 'var(--green-border)' },
  partial: { color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)' },
  miss:    { color: 'var(--red)',    bg: 'var(--red-bg)',    border: 'var(--red-border)' },
};

export function GrowthAnalyticsRunner({ caseData, onBack, onNext, unlocked }) {
  const existing = getGrowthAnalyticsProgress(caseData.id);

  const [frameworkOpen, setFrameworkOpen] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(!!existing?.rating);
  const [rating, setRating] = useState(existing?.rating || null);

  const diffCfg = DIFF_CFG[caseData.difficulty] || DIFF_CFG.analyst;

  function handleReveal() {
    setAnswerRevealed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRate(r) {
    setRating(r);
    saveGrowthAnalyticsProgress(caseData.id, r);
  }

  function handleRetry() {
    setAnswerRevealed(false);
    setRating(null);
    setFrameworkOpen(false);
    setHintsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Format situation text into paragraphs
  const situationParagraphs = caseData.situation.split('\n\n').filter(Boolean);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Back nav */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: 'none', color: 'var(--text-muted)',
          cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1.5rem',
          padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}
      >
        ← Growth Analytics
      </button>

      {/* Case header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-dim)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            {caseData.id}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>·</span>
          <span style={{
            fontSize: '0.72rem', fontWeight: 600,
            color: diffCfg.color, background: diffCfg.bg, border: `1px solid ${diffCfg.border}`,
            borderRadius: '4px', padding: '0.1rem 0.4rem',
          }}>
            {diffCfg.label}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>·</span>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500,
            color: 'var(--teal)', background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
            borderRadius: '4px', padding: '0.1rem 0.4rem',
          }}>
            {DOMAIN_LABEL[caseData.domain] || caseData.domain}
          </span>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500,
            color: 'var(--text-dim)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
            borderRadius: '4px', padding: '0.1rem 0.4rem',
          }}>
            {caseData.company}
          </span>
        </div>

        <h1 style={{
          fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)',
          margin: '0 0 0.3rem', letterSpacing: '-0.02em',
        }}>
          {caseData.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          {caseData.subtitle}
        </p>
      </div>

      {/* Situation */}
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
        borderRadius: '10px', padding: '1.25rem 1.4rem', marginBottom: '1rem',
      }}>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.07em', color: 'var(--teal)', marginBottom: '0.75rem',
        }}>
          The Situation
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {situationParagraphs.map((para, i) => (
            <p key={i} style={{
              color: 'var(--text-secondary)', fontSize: '0.9rem',
              lineHeight: 1.7, margin: 0,
              whiteSpace: 'pre-line',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Framework accordion */}
      <button
        onClick={() => setFrameworkOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: '8px',
          padding: '0.75rem 1rem', cursor: 'pointer', marginBottom: '0.6rem',
          color: 'var(--text-muted)', fontSize: '0.84rem', fontWeight: 500,
        }}
      >
        {frameworkOpen ? '▾' : '▸'} Framework Steps
        {!frameworkOpen && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            (scaffolding — expand if you need a starting structure)
          </span>
        )}
      </button>
      {frameworkOpen && (
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '1rem 1.1rem', marginBottom: '0.6rem',
        }}>
          <ol style={{ margin: 0, paddingLeft: '1.3rem', color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.8 }}>
            {caseData.frameworkSteps.map((step, i) => (
              <li key={i} style={{ marginBottom: i < caseData.frameworkSteps.length - 1 ? '0.4rem' : 0 }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Hints accordion */}
      <button
        onClick={() => setHintsOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: '8px',
          padding: '0.75rem 1rem', cursor: 'pointer', marginBottom: '1.25rem',
          color: 'var(--text-muted)', fontSize: '0.84rem', fontWeight: 500,
        }}
      >
        {hintsOpen ? '▾' : '▸'} Hints
        {!hintsOpen && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            (try first, then check)
          </span>
        )}
      </button>
      {hintsOpen && (
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '1rem 1.1rem', marginBottom: '1.25rem',
        }}>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.8 }}>
            {caseData.hints.map((h, i) => (
              <li key={i} style={{ marginBottom: i < caseData.hints.length - 1 ? '0.3rem' : 0 }}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Prompt callout */}
      <div style={{
        background: 'var(--yellow-bg)', border: '1px solid var(--yellow-border)',
        borderRadius: '10px', padding: '1.25rem 1.4rem', marginBottom: '1.5rem',
      }}>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.07em', color: 'var(--yellow)', marginBottom: '0.5rem',
        }}>
          Your Challenge
        </div>
        <p style={{
          color: 'var(--text)', fontSize: '1rem', lineHeight: 1.65,
          margin: 0, fontWeight: 500,
        }}>
          {caseData.prompt}
        </p>
      </div>

      {/* Reveal Model Answer button */}
      {!answerRevealed && (
        <button
          onClick={handleReveal}
          style={{
            width: '100%',
            background: 'var(--yellow)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.85rem 1.5rem',
            fontSize: '0.95rem', fontWeight: 700,
            color: '#1a1400',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'opacity 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Reveal Model Answer →
        </button>
      )}

      {/* Answer section */}
      {answerRevealed && (
        <div>
          {/* Model walkthrough */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem',
          }}>
            <div style={{
              fontWeight: 700, fontSize: '0.82rem', color: 'var(--teal)',
              textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1rem',
            }}>
              Model Answer — Walkthrough
            </div>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '0.88rem',
              lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap',
            }}>
              {caseData.modelAnswer.walkthrough}
            </p>
          </div>

          {/* Key diagnosis */}
          <div style={{
            background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
            borderRadius: '10px', padding: '1.1rem 1.25rem', marginBottom: '1rem',
          }}>
            <div style={{
              fontWeight: 700, fontSize: '0.78rem', color: 'var(--teal)',
              textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem',
            }}>
              Key Diagnosis
            </div>
            <p style={{ color: 'var(--text)', fontSize: '0.92rem', fontWeight: 600, margin: 0, lineHeight: 1.55 }}>
              {caseData.modelAnswer.keyDiagnosis}
            </p>
          </div>

          {/* Recommendation */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '1.1rem 1.25rem', marginBottom: '1rem',
          }}>
            <div style={{
              fontWeight: 700, fontSize: '0.78rem', color: 'var(--green)',
              textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem',
            }}>
              Recommendation
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.65 }}>
              {caseData.modelAnswer.recommendation}
            </p>
          </div>

          {/* Key Takeaways */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '1.25rem', marginBottom: '1rem',
          }}>
            <div style={{
              fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-dim)',
              textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.65rem',
            }}>
              Key Takeaways
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.8 }}>
              {caseData.keyTakeaways.map((t, i) => (
                <li key={i} style={{ marginBottom: i < caseData.keyTakeaways.length - 1 ? '0.4rem' : 0 }}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Playbook links */}
          {caseData.playbookLinks && caseData.playbookLinks.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center' }}>
                Related:
              </span>
              {caseData.playbookLinks.map(link => (
                <span
                  key={link.id}
                  style={{
                    fontSize: '0.78rem', fontWeight: 500,
                    color: 'var(--teal)', background: 'var(--teal-bg)',
                    border: '1px solid var(--teal-border)',
                    borderRadius: '20px', padding: '0.2rem 0.65rem',
                  }}
                >
                  {link.label}
                </span>
              ))}
            </div>
          )}

          {/* Self-rating */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem',
          }}>
            <div style={{ fontWeight: 600, fontSize: '0.87rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
              How did you do?
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {RATINGS.map(r => {
                const s = RATING_STYLE[r.id];
                const selected = rating === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleRate(r.id)}
                    style={{
                      background: selected ? s.bg : 'var(--surface-2)',
                      border: `1px solid ${selected ? s.border : 'var(--border)'}`,
                      borderRadius: '8px', padding: '0.55rem 1rem',
                      color: selected ? s.color : 'var(--text-muted)',
                      fontWeight: selected ? 700 : 500, fontSize: '0.86rem',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    {r.label}
                    <div style={{ fontSize: '0.72rem', fontWeight: 400, opacity: 0.8, marginTop: '0.15rem' }}>
                      {r.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleRetry}
              style={{
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '7px', padding: '0.5rem 1rem',
                color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer',
              }}
            >
              ↺ Try again
            </button>
            <button
              onClick={onBack}
              style={{
                background: 'none', border: '1px solid var(--border)', borderRadius: '7px',
                padding: '0.5rem 1.1rem', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer',
              }}
            >
              ← Back to Room
            </button>
            {onNext && rating && (
              <button
                onClick={onNext}
                style={{
                  background: 'var(--teal)', border: 'none', borderRadius: '7px',
                  padding: '0.5rem 1.2rem', color: '#fff', fontSize: '0.85rem',
                  fontWeight: 600, cursor: 'pointer', marginLeft: 'auto',
                }}
              >
                Next case →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
