export function Home({ onNavigate, onStartScenario }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '680px', marginBottom: '5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
          borderRadius: '20px', padding: '0.25rem 0.75rem',
          marginBottom: '1.75rem', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600,
          letterSpacing: '0.02em',
        }}>
          Product Analytics Lab · V1.2
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4.5vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.12,
          marginBottom: '1.25rem',
          color: 'var(--text)',
        }}>
          You know the formulas.<br />
          <span style={{ color: 'var(--accent)' }}>Now practice the calls.</span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          lineHeight: 1.75,
          marginBottom: '0.6rem',
          maxWidth: '580px',
        }}>
          Practice the full readout: messy metrics, guardrail conflicts, business pressure,
          and real tradeoffs. Make the ship, rollback, or investigate call — then see how a
          senior analyst would have read the same data.
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
          The answer is rarely &ldquo;p &lt; 0.05, ship it.&rdquo;
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '2.25rem' }}>
          For product analysts, data scientists, growth analysts, and PMs.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              letterSpacing: '-0.01em', boxShadow: 'var(--shadow)',
            }}
          >
            Review Room →
          </button>
          <button
            onClick={() => onNavigate('design')}
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 500, fontSize: '0.92rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Design Room →
          </button>
        </div>
      </div>

      {/* ── Why this is different ────────────────────────────────────────── */}
      <div style={{ marginBottom: '5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>
          Why this is different
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'var(--border)',
          gap: '1px',
        }}>
          {[
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not a statistics course',
              body: 'No primers on p-values, no formula modules, no glossary. This assumes you already know the basics.',
            },
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not formula drills',
              body: 'The gap isn\'t knowing the math. It\'s applying it when the readout is messy and the PM wants an answer today.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Realistic messy readouts',
              body: 'SRM, guardrail breaches, SUTVA violations, novelty effects, underpowered tests — the failure modes from real product analytics work.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Senior analyst debriefs',
              body: 'Every decision unlocks a full senior read: what you saw, what you might have missed, and how to explain it to stakeholders.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Business pressure built in',
              body: 'Every scenario has a fictional company, a launch deadline, and stakeholder pressure. Judgment under realistic constraints.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Calibrated scoring',
              body: 'Junior Miss → Analyst-Ready → Senior-Ready → Staff-Level. Each level reflects a real stage of experimentation judgment.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '1.25rem 1.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: item.signColor, lineHeight: 1 }}>{item.sign}</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: '0.835rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── V1 scenarios + Judgment Bank ────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '4.5rem',
        alignItems: 'start',
      }}>
        {/* 8 Playable scenarios */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
              8 Playable Scenarios
            </span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, color: 'var(--green-text)',
              background: 'var(--green-bg)', border: '1px solid var(--green-border)',
              borderRadius: '4px', padding: '0.15rem 0.45rem', letterSpacing: '0.04em',
            }}>AVAILABLE NOW</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Free', 'The Checkout Trap', 'Metric Conflict', 'analyst'],
              ['Free', 'The Ghost Assignment', 'SRM', 'analyst'],
              ['Free', 'The Slow Tax', 'Guardrail Breach', 'analyst'],
              ['Free', 'The Week-Two Drop', 'Novelty / Peeking', 'analyst'],
              ['Beta', 'The Mobile Winners', 'HTE / Subgroups', 'senior'],
              ['Beta', 'The Five Metrics Problem', 'Multiple Testing', 'senior'],
              ['Beta', 'The Two-Sided Spill', 'Marketplace / SUTVA', 'staff'],
              ['Beta', 'False Rigor', 'When Not to Experiment', 'senior'],
            ].map(([tier, title, theme, diff], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.45rem 0',
                borderBottom: i < 7 ? '1px solid var(--border-subtle)' : 'none',
                fontSize: '0.82rem',
              }}>
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700,
                  color: tier === 'Free' ? 'var(--accent)' : 'var(--teal)',
                  background: tier === 'Free' ? 'var(--accent-bg)' : 'var(--teal-bg)',
                  border: `1px solid ${tier === 'Free' ? 'var(--accent-border)' : 'var(--teal-border)'}`,
                  borderRadius: '3px', padding: '0.1rem 0.35rem',
                  whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{tier}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', fontSize: '0.73rem', flexShrink: 0 }}>{theme}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              marginTop: '1.1rem', width: '100%',
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.6rem',
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Open Scenario Browser →
          </button>
        </div>

        {/* Judgment Bank */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
              50-Scenario Judgment Bank
            </span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-dim)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: '4px', padding: '0.15rem 0.45rem',
            }}>ROADMAP</span>
          </div>
          <p style={{ fontSize: '0.835rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            The full architecture: 50 scenarios across 15 failure-mode families.
            Each case teaches one failure mode of real experimentation work.
            8 are playable now. The remaining 42 are defined and waiting.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem', marginBottom: '1.25rem',
          }}>
            {[
              ['15', 'Scenario families'],
              ['50', 'Scenarios planned'],
              ['8', 'Playable now'],
              ['42', 'On the roadmap'],
            ].map(([n, label]) => (
              <div key={label} style={{
                background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.75rem',
              }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.2rem' }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('bank')}
            style={{
              width: '100%',
              background: 'var(--surface-2)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '0.6rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            Browse Judgment Bank →
          </button>
        </div>
      </div>

      {/* ── Roadmap ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '480px' }}>
        <div className="label-caps" style={{ marginBottom: '1rem' }}>Roadmap</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { v: 'V1', desc: '8 scenarios · Free + private beta', done: true, current: false },
            { v: 'V1.1', desc: '50-scenario architecture · Theme system · Judgment Bank', done: false, current: true },
            { v: 'V1.5', desc: '20 playable scenarios · Geo-holdout, CUPED, switchback', done: false, current: false },
            { v: 'V2', desc: 'Experiment Design Room · Design-your-own-test cases', done: false, current: false },
            { v: 'V3+', desc: 'Stats & Inference Lab · RCA Room · Full Platform', done: false, current: false },
          ].map(({ v, desc, done, current }) => (
            <div key={v} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              padding: '0.6rem 0',
              borderBottom: '1px solid var(--border-subtle)',
              opacity: current ? 1 : done ? 0.65 : 0.4,
            }}>
              <span style={{
                fontWeight: 800, fontSize: '0.75rem',
                color: current ? 'var(--accent)' : done ? 'var(--teal)' : 'var(--text-dim)',
                minWidth: '32px', paddingTop: '1px',
              }}>{v}</span>
              <span style={{ fontSize: '0.82rem', color: current ? 'var(--text-secondary)' : 'var(--text-dim)', lineHeight: 1.5, flex: 1 }}>{desc}</span>
              {current && (
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, color: 'var(--green-text)',
                  background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                  borderRadius: '3px', padding: '0.1rem 0.4rem', flexShrink: 0, marginTop: '2px',
                }}>NOW</span>
              )}
              {done && !current && (
                <span style={{
                  fontSize: '0.6rem', fontWeight: 700, color: 'var(--teal)',
                  background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
                  borderRadius: '3px', padding: '0.1rem 0.4rem', flexShrink: 0, marginTop: '2px',
                }}>DONE</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
