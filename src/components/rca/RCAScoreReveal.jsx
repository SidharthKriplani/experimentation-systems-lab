const LEVEL_CFG = {
  staff:   { label: 'Staff-Level',   color: 'var(--teal)',   bg: 'var(--teal-bg)',    border: 'var(--teal-border)',    desc: 'Exceptional diagnosis. You identified the root cause systematically, with exactly the evidence a senior PM or analyst would cite.' },
  senior:  { label: 'Senior-Ready',  color: 'var(--accent)', bg: 'var(--accent-bg)',  border: 'var(--accent-border)', desc: 'Solid diagnostic reasoning. You got the key steps right with a few gaps — see the senior diagnosis to sharpen your framework.' },
  analyst: { label: 'Analyst-Level', color: 'var(--yellow)', bg: 'var(--yellow-bg)',  border: 'var(--yellow-border)', desc: 'You caught some signals but missed critical steps. Review the senior diagnosis to understand the full reasoning chain.' },
  junior:  { label: 'Junior-Level',  color: 'var(--red)',    bg: 'var(--red-bg)',     border: 'var(--red-border)',    desc: 'Several key diagnostic steps were off. The senior diagnosis below shows the structured approach — it\'s worth reading carefully.' },
};

export function RCAScoreReveal({ score, maxScore, level, stepChoices, rcaCase, onContinue }) {
  const cfg = LEVEL_CFG[level] || LEVEL_CFG.analyst;
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div style={{
      background: 'var(--surface)',
      border: `2px solid ${cfg.border}`,
      borderRadius: 'var(--radius)',
      padding: '1.75rem',
      textAlign: 'center',
    }}>
      {/* Score */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Diagnosis Score
        </div>
        <div style={{ fontSize: '3rem', fontWeight: 900, color: cfg.color, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {score}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)', fontWeight: 400 }}>/{maxScore}</span>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          {pct}% accuracy
        </div>
      </div>

      {/* Level badge */}
      <div style={{ marginBottom: '1.25rem' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          color: cfg.color, background: cfg.bg, border: `1.5px solid ${cfg.border}`,
          borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.8rem',
        }}>
          {cfg.label}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6,
        maxWidth: '440px', margin: '0 auto 1.5rem',
      }}>
        {cfg.desc}
      </p>

      {/* CTA */}
      <button
        onClick={onContinue}
        style={{
          background: 'var(--yellow-bg)',
          border: '1.5px solid var(--yellow-border)',
          color: 'var(--yellow)',
          borderRadius: 'var(--radius)',
          padding: '0.65rem 1.5rem',
          fontSize: '0.88rem', fontWeight: 700,
          cursor: 'pointer',
          transition: 'background 0.12s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--yellow)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--yellow-bg)'}
      >
        View senior diagnosis →
      </button>
    </div>
  );
}
