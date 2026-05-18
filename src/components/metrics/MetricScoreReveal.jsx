// Score reveal screen shown after submitting all 5 fields

const LEVEL_CFG = {
  staff:   {
    label: 'Staff-level',
    color: 'var(--purple)',
    bg: 'var(--purple-bg)',
    border: 'var(--purple-border)',
    description: 'Exceptional. You identified the exact metrics a senior PM or staff analyst would pre-commit before running this experiment. Your choices show awareness of proxy traps, gaming vectors, and the need for pre-committed decision rules.',
  },
  senior:  {
    label: 'Senior-ready',
    color: 'var(--teal)',
    bg: 'var(--teal-bg)',
    border: 'var(--teal-border)',
    description: 'Strong work. You got the high-leverage choices right. A few gaps remain — often in the diagnostic or grain selection — but your framework is sound and would hold up in a real experiment design review.',
  },
  analyst: {
    label: 'Analyst-ready',
    color: 'var(--blue-text)',
    bg: 'var(--blue-bg)',
    border: 'var(--blue-border)',
    description: 'Solid foundation. You chose reasonable metrics but missed some of the subtler trade-offs that separate a good metric design from a great one. Review the senior design to see where the gaps are.',
  },
  junior:  {
    label: 'Junior miss',
    color: 'var(--yellow)',
    bg: 'var(--yellow-bg)',
    border: 'var(--yellow-border)',
    description: 'Several key metric design choices need work. The good news: these are learnable patterns. Read the senior metric design carefully — it explains exactly what was missed and why it matters.',
  },
};

export function MetricScoreReveal({ score, maxScore, level, onContinue }) {
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const cfg = LEVEL_CFG[level] || LEVEL_CFG.analyst;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '2rem 1.5rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem',
      textAlign: 'center',
    }}>
      {/* Score circle */}
      <div style={{
        width: '80px', height: '80px',
        borderRadius: '50%',
        background: cfg.bg,
        border: `2.5px solid ${cfg.border}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: cfg.color, lineHeight: 1 }}>{pct}</span>
        <span style={{ fontSize: '0.6rem', color: cfg.color, fontWeight: 700 }}>%</span>
      </div>

      {/* Level badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.8rem',
        fontSize: '0.78rem', fontWeight: 700, color: cfg.color,
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {cfg.label}
      </div>

      {/* Score fraction */}
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        {score} / {maxScore} points
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.88rem', color: 'var(--text-secondary)',
        lineHeight: 1.6, margin: 0, maxWidth: '420px',
      }}>
        {cfg.description}
      </p>

      {/* CTA */}
      <button
        onClick={onContinue}
        style={{
          marginTop: '0.5rem',
          background: 'var(--teal-bg)',
          border: '1.5px solid var(--teal-border)',
          borderRadius: 'var(--radius)',
          padding: '0.7rem 1.5rem',
          fontSize: '0.88rem', fontWeight: 700, color: 'var(--teal)',
          cursor: 'pointer',
          transition: 'all 0.1s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal-bg)'; e.currentTarget.style.color = 'var(--teal)'; }}
      >
        View senior metric design →
      </button>
    </div>
  );
}
