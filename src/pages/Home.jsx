export function Home({ onNavigate, onStartScenario }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ maxWidth: '720px', marginBottom: '4rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: '#0d1629',
          border: '1px solid #1d3a6e',
          borderRadius: '20px',
          padding: '0.3rem 0.75rem',
          marginBottom: '1.5rem',
          fontSize: '0.75rem',
          color: '#5b7fff',
          fontWeight: 600,
        }}>
          ⚗ V1 Private Beta · 8 Scenarios
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          color: '#e8eaf0',
        }}>
          You know the formulas.<br />
          <span style={{ color: '#5b7fff' }}>Now practice the calls.</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: '#8890a8',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
          maxWidth: '600px',
        }}>
          Real experiment readouts. Messy metrics. Business pressure. Make the ship, rollback, or investigate decision — then see how a senior analyst would have read the same data.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              background: '#5b7fff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}
          >
            Enter the Review Room →
          </button>
          <button
            onClick={() => onStartScenario('s01-checkout-trap')}
            style={{
              background: 'transparent',
              color: '#c5c9d8',
              border: '1px solid #2d3148',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
            }}
          >
            Start with The Checkout Trap
          </button>
        </div>
      </div>

      {/* What this is / isn't */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '3.5rem',
      }}>
        {[
          {
            icon: '⚖',
            title: 'Judgment, not formulas',
            body: 'This is for people who already know the basics of A/B testing. The gap we fill: practicing decisions under messy, real-world product data.',
          },
          {
            icon: '🔬',
            title: 'Realistic experiment reviews',
            body: 'Each scenario is a synthetic experiment readout based on common product analytics failure modes. SRM, guardrail breaches, SUTVA, multiple testing, novelty effects.',
          },
          {
            icon: '📋',
            title: 'Not a stats course',
            body: 'No primers. No formula modules. No glossary. You\'re dropped into the review meeting. Read the data, make the call, see the senior analyst read.',
          },
          {
            icon: '📈',
            title: 'Career-relevant scoring',
            body: 'Junior Miss → Analyst-Ready → Senior-Ready → Staff-Level. Each decision level maps to a real stage of experimentation judgment.',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: '#1a1d27',
            border: '1px solid #2d3148',
            borderRadius: '8px',
            padding: '1.25rem',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#e8eaf0', marginBottom: '0.5rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.855rem', color: '#8890a8', lineHeight: 1.65 }}>{item.body}</div>
          </div>
        ))}
      </div>

      {/* V1 scope */}
      <div style={{
        background: '#1a1d27',
        border: '1px solid #2d3148',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '3rem',
        maxWidth: '700px',
      }}>
        <div style={{ fontWeight: 700, fontSize: '0.925rem', color: '#e8eaf0', marginBottom: '0.75rem' }}>
          V1 includes 8 scenarios
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
          {[
            ['Free', 'The Checkout Trap', 'analyst', 'Metric Conflict'],
            ['Free', 'The Ghost Assignment', 'analyst', 'SRM'],
            ['Free', 'The Slow Tax', 'analyst', 'Guardrail Breach'],
            ['Free', 'The Week-Two Drop', 'analyst', 'Novelty / Peeking'],
            ['Beta', 'The Mobile Winners', 'senior', 'HTE / Subgroups'],
            ['Beta', 'The Five Metrics Problem', 'senior', 'Multiple Testing'],
            ['Beta', 'The Two-Sided Spill', 'staff', 'Marketplace / SUTVA'],
            ['Beta', 'False Rigor', 'senior', 'When Not to Experiment'],
          ].map(([tier, title, diff, theme], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 0',
              borderBottom: '1px solid #1e2235',
              fontSize: '0.82rem',
            }}>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700,
                color: tier === 'Free' ? '#5b7fff' : '#22c55e',
                background: tier === 'Free' ? '#0d1629' : '#0d2e1a',
                border: `1px solid ${tier === 'Free' ? '#5b7fff' : '#22c55e'}`,
                borderRadius: '3px', padding: '0.1rem 0.35rem',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>{tier}</span>
              <span style={{ color: '#c5c9d8', fontWeight: 500 }}>{title}</span>
              <span style={{ color: '#545b7a', marginLeft: 'auto', whiteSpace: 'nowrap' }}>{theme}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div style={{ maxWidth: '500px' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#545b7a', marginBottom: '0.75rem' }}>
          Roadmap
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            ['V1', '8 scenarios', '#5b7fff', true],
            ['V1.5', '20 scenarios', '#8890a8', false],
            ['V2', '50-scenario Experiment Judgment Bank · 15 scenario families', '#545b7a', false],
          ].map(([v, desc, color, current]) => (
            <div key={v} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: current ? 1 : 0.5,
            }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color, minWidth: '28px' }}>{v}</span>
              <span style={{ fontSize: '0.82rem', color: current ? '#c5c9d8' : '#545b7a' }}>{desc}</span>
              {current && <span style={{ fontSize: '0.68rem', color: '#22c55e', background: '#0d2e1a', border: '1px solid #22c55e', borderRadius: '3px', padding: '0.1rem 0.35rem', fontWeight: 700 }}>NOW</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
