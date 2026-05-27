// CaseScoreReveal — shown after all phases are submitted
// Props: { score, maxScore, level, phaseChoices, businessCase, onContinue }

const PHASE_LABELS = {
  clarify:    'Clarify the Decision',
  kpi:        'Choose the KPI',
  hypothesis: 'Frame the Hypothesis',
  data_cut:   'Identify the Data Cut',
  method:     'Choose the Method',
  recommend:  'Structure the Recommendation',
};

const LEVEL_CONFIG = {
  staff:   { color: 'var(--teal)',      bg: 'var(--teal-bg)',   border: 'var(--teal-border)',   label: 'Staff Analyst', emoji: '★', desc: 'You structured this like a senior-to-staff analyst. Clear decision scope, right metrics, causal method.' },
  senior:  { color: 'var(--accent)',    bg: 'var(--accent-bg)', border: 'var(--accent-border)', label: 'Senior Analyst', emoji: '◆', desc: 'Solid analytical thinking. A few phases had room for sharper framing.' },
  analyst: { color: 'var(--blue-text)', bg: 'var(--blue-bg)',   border: 'var(--blue-border)',   label: 'Analyst', emoji: '◉', desc: 'Getting there. Focus on clarifying the decision scope and choosing metrics that include economics.' },
  junior:  { color: 'var(--yellow)',    bg: 'var(--yellow-bg)', border: 'var(--yellow-border)', label: 'Junior miss', emoji: '○', desc: 'The analysis jumped ahead of the decision. Read the senior answer carefully — it shows the right sequencing.' },
};

const OPTION_LEVEL_CONFIG = {
  strong:  { color: 'var(--teal)',   symbol: '✓' },
  partial: { color: 'var(--yellow)', symbol: '~' },
  wrong:   { color: 'var(--red)',    symbol: '✕' },
};

export function CaseScoreReveal({ score, maxScore, level, phaseChoices, businessCase, onContinue }) {
  const cfg = LEVEL_CONFIG[level] || LEVEL_CONFIG.analyst;
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Level badge */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '1.75rem 1.5rem',
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        borderRadius: 'var(--radius)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{cfg.emoji}</div>
        <div style={{
          fontSize: '1.4rem', fontWeight: 900, color: cfg.color, letterSpacing: '-0.01em',
          marginBottom: '0.2rem',
        }}>
          {cfg.label}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 500, marginBottom: '0.5rem' }}>
          Score: {score}/{maxScore} &nbsp;·&nbsp; {pct}%
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: '380px' }}>
          {cfg.desc}
        </p>
      </div>

      {/* Phase-by-phase summary */}
      <div>
        <div style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
          color: 'var(--text-dim)', marginBottom: '0.65rem',
        }}>
          Phase breakdown
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {businessCase.phases.map(phase => {
            const chosenId = phaseChoices[phase.id];
            const opt = chosenId ? phase.options.find(o => o.id === chosenId) : null;
            const optLevel = opt ? OPTION_LEVEL_CONFIG[opt.level] : null;
            const phaseLabel = PHASE_LABELS[phase.id] || phase.label || phase.id;

            return (
              <div key={phase.id} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.55rem 0.75rem',
                background: 'var(--surface-2)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}>
                <span style={{
                  fontSize: '0.82rem', fontWeight: 700,
                  color: optLevel ? optLevel.color : 'var(--text-dim)',
                  width: '16px', textAlign: 'center', flexShrink: 0,
                }}>
                  {optLevel ? optLevel.symbol : '—'}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', flex: 1 }}>
                  {phaseLabel}
                </span>
                {opt && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'right', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {opt.label.length > 48 ? opt.label.slice(0, 48) + '…' : opt.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onContinue}
        style={{
          padding: '0.75rem 1.25rem',
          background: 'var(--purple)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius)',
          fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
          transition: 'opacity 0.1s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        View senior answer →
      </button>
    </div>
  );
}
