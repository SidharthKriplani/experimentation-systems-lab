export function Home({ onNavigate, onStartScenario }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ maxWidth: '740px', marginBottom: '5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
          borderRadius: '20px', padding: '0.3rem 0.75rem',
          marginBottom: '1.75rem', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600,
        }}>
          ⚗ V1.1 Private Beta · 8 Playable Scenarios · 50-Scenario Roadmap
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 5vw, 3.25rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.13,
          marginBottom: '1.35rem',
          color: 'var(--text)',
        }}>
          You know the formulas.<br />
          <span style={{ color: 'var(--accent)' }}>Now practice the calls.</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          marginBottom: '0.75rem',
          maxWidth: '600px',
        }}>
          Real experiment readouts. Messy metrics. Business pressure. Make the ship, rollback, or investigate decision — then see how a senior analyst would have read the same data.
        </p>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-dim)',
          marginBottom: '2rem',
        }}>
          Built for product analysts, data scientists, growth analysts, and PMs.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              background: 'var(--accent)',
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
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
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

      {/* Why this is different */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: '1.25rem' }}>
          Why this is different
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          overflow: 'hidden',
        }}>
          {[
            {
              icon: '✗',
              iconColor: 'var(--red)',
              title: 'Not a stats course',
              body: 'No primers on p-values. No formula modules. No glossary. If you need those basics, learn them first — then come back.',
            },
            {
              icon: '✗',
              iconColor: 'var(--red)',
              title: 'Not formula drills',
              body: 'You already know the math. The gap is applying it when the readout is messy, the PM is impatient, and two metrics disagree.',
            },
            {
              icon: '✓',
              iconColor: 'var(--green)',
              title: 'Realistic messy readouts',
              body: 'SRM, guardrail breaches, SUTVA violations, novelty effects, underpowered tests — the failure modes that show up in real product work.',
            },
            {
              icon: '✓',
              iconColor: 'var(--green)',
              title: 'Senior analyst debriefs',
              body: 'After every decision, you see exactly how a senior would have read the same data — including what you might have missed.',
            },
            {
              icon: '✓',
              iconColor: 'var(--green)',
              title: 'Judgment under business pressure',
              body: 'Every scenario has a fictional business context, a launch deadline, and stakeholder pressure built in. Realism by design.',
            },
            {
              icon: '✓',
              iconColor: 'var(--green)',
              title: 'Career-level scoring',
              body: 'Junior Miss → Analyst-Ready → Senior-Ready → Staff-Level. Each level maps to a real stage of experimentation judgment.',
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              padding: '1.35rem 1.4rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: item.iconColor }}>{item.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{item.title}</span>
              </div>
              <div style={{ fontSize: '0.845rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* V1 scenarios */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '4.5rem',
        alignItems: 'start',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '1.5rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '1rem' }}>
            V1.1 — 8 Playable Scenarios
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
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
                padding: '0.45rem 0',
                borderBottom: '1px solid var(--border-subtle)',
                fontSize: '0.82rem',
              }}>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700,
                  color: tier === 'Free' ? 'var(--accent)' : 'var(--green)',
                  background: tier === 'Free' ? 'var(--accent-bg)' : 'var(--green-bg)',
                  border: `1px solid ${tier === 'Free' ? 'var(--accent-border)' : 'var(--green-border)'}`,
                  borderRadius: '3px', padding: '0.1rem 0.35rem',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>{tier}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</span>
                <span style={{ color: 'var(--text-dim)', marginLeft: 'auto', whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{theme}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              marginTop: '1.25rem', width: '100%',
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: '6px', padding: '0.6rem', fontWeight: 700,
              fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            Open Scenario Browser →
          </button>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '1.5rem',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
            50-Scenario Judgment Bank
          </div>
          <p style={{ fontSize: '0.845rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            The full architecture: 50 scenarios across 15 failure-mode families. 8 are playable now. The remaining 42 are planned for V1.5 and V2.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
            {[
              ['15', 'Scenario families'],
              ['50', 'Total scenarios planned'],
              ['8', 'Playable now'],
              ['42', 'On the roadmap'],
            ].map(([n, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)', minWidth: '2rem' }}>{n}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('bank')}
            style={{
              width: '100%',
              background: 'var(--surface-2)', color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px', padding: '0.6rem', fontWeight: 600,
              fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            View Judgment Bank →
          </button>
        </div>
      </div>

      {/* Roadmap */}
      <div style={{ maxWidth: '520px' }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: '1rem' }}>
          Roadmap
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {[
            ['V1', '8 scenarios · Free + private beta tiers', 'var(--accent)', false],
            ['V1.1', '50-scenario architecture · Theme system · Judgment Bank', 'var(--accent)', true],
            ['V1.5', '20 scenarios · Geo-holdout, CUPED, switchback, right-censored metrics', 'var(--text-muted)', false],
            ['V2', '50-scenario Experiment Judgment Bank · 15 families fully playable', 'var(--text-dim)', false],
          ].map(([v, desc, color, current]) => (
            <div key={v} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: current ? 1 : v === 'V1' ? 0.7 : 0.45,
            }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color, minWidth: '30px' }}>{v}</span>
              <span style={{ fontSize: '0.82rem', color: current ? 'var(--text-secondary)' : 'var(--text-dim)' }}>{desc}</span>
              {current && <span style={{ fontSize: '0.62rem', color: 'var(--green)', background: 'var(--green-bg)', border: '1px solid var(--green-border)', borderRadius: '3px', padding: '0.1rem 0.35rem', fontWeight: 700, flexShrink: 0 }}>NOW</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
