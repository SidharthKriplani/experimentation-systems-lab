import { DifficultyBadge, IndustryBadge, ThemeBadge } from '../ui/Badge.jsx';

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#545b7a',
        marginBottom: '0.35rem',
      }}>{label}</div>
      {children}
    </div>
  );
}

export function ContextPanel({ scenario }) {
  const { context } = scenario;
  return (
    <div>
      {/* Meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
        <DifficultyBadge difficulty={scenario.difficulty} />
        <IndustryBadge industry={scenario.industry} />
        <ThemeBadge theme={scenario.theme} />
      </div>

      <Section label="Company & Product">
        <div style={{ fontSize: '0.875rem', color: '#c5c9d8' }}>
          <strong style={{ color: '#e8eaf0' }}>{context.company}</strong>
          {' · '}
          {context.product}
        </div>
        <div style={{ fontSize: '0.8rem', color: '#8890a8', marginTop: '0.25rem' }}>
          Team: {context.team}
        </div>
      </Section>

      <Section label="Background">
        <div style={{
          fontSize: '0.875rem',
          color: '#c5c9d8',
          lineHeight: 1.7,
          whiteSpace: 'pre-line',
        }}>
          {context.background}
        </div>
      </Section>

      <Section label="Business Pressure">
        <div style={{
          background: '#1a1d27',
          border: '1px solid #2d3148',
          borderLeft: '3px solid #f59e0b',
          borderRadius: '4px',
          padding: '0.75rem',
          fontSize: '0.875rem',
          color: '#fbbf24',
          lineHeight: 1.6,
        }}>
          {context.businessPressure}
        </div>
      </Section>

      <Section label="Hypothesis">
        <div style={{
          background: '#0d1629',
          border: '1px solid #1d3a6e',
          borderRadius: '4px',
          padding: '0.75rem',
          fontSize: '0.875rem',
          color: '#93b4f5',
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}>
          "{scenario.hypothesis}"
        </div>
      </Section>
    </div>
  );
}
