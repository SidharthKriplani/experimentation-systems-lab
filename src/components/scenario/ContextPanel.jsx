import { DifficultyBadge, IndustryBadge, ThemeBadge } from '../ui/Badge.jsx';

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '0.35rem',
      }}>{label}</div>
      {children}
    </div>
  );
}

export function ContextPanel({ scenario }) {
  const { context } = scenario;
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        <DifficultyBadge difficulty={scenario.difficulty} />
        <IndustryBadge industry={scenario.industry} />
        <ThemeBadge theme={scenario.theme} />
      </div>

      <Section label="Company & Product">
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text)' }}>{context.company}</strong>
          {' · '}
          {context.product}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Team: {context.team}
        </div>
      </Section>

      <Section label="Background">
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          {context.background}
        </div>
      </Section>

      <Section label="Business Pressure">
        <div style={{
          background: 'var(--yellow-bg)',
          border: '1px solid var(--yellow-border)',
          borderLeft: '3px solid var(--yellow)',
          borderRadius: '4px', padding: '0.75rem',
          fontSize: '0.875rem', color: 'var(--yellow-text)', lineHeight: 1.6,
        }}>
          {context.businessPressure}
        </div>
      </Section>

      <Section label="Hypothesis">
        <div style={{
          background: 'var(--blue-bg)', border: '1px solid var(--blue-border)',
          borderRadius: '4px', padding: '0.75rem',
          fontSize: '0.875rem', color: 'var(--blue-text)', lineHeight: 1.6, fontStyle: 'italic',
        }}>
          "{scenario.hypothesis}"
        </div>
      </Section>
    </div>
  );
}
