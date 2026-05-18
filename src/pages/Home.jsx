export function Home({ onNavigate, onStartScenario }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '680px', marginBottom: '4.5rem' }}>
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
          An interactive analytics judgment gym. Design experiments before data exists,
          then review the messy results after they run. Make the call — then see how a
          senior analyst would have read the same situation.
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '2.25rem' }}>
          For product analysts, data scientists, growth analysts, and PMs who already know the basics.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('design')}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              letterSpacing: '-0.01em', boxShadow: 'var(--shadow)',
            }}
          >
            Design Room →
          </button>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 500, fontSize: '0.92rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Review Room →
          </button>
        </div>
      </div>

      {/* ── The two rooms ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>Two rooms. One loop.</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {/* Design Room */}
          <div style={{ background: 'var(--surface)', padding: '1.5rem 1.6rem' }}>
            <div style={{
              fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--teal)', marginBottom: '0.6rem',
            }}>Design Room</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
              Can you design the test correctly before data exists?
            </h3>
            <p style={{ fontSize: '0.845rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem' }}>
              You're given a product scenario and a business question. Set the primary metric,
              randomization unit, guardrails, trust checks, and pre-committed decision rule.
              Scored across 4 dimensions against the senior analyst standard.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.1rem' }}>
              4 scenarios · Free + Beta · Analyst → Senior difficulty
            </div>
            <button
              onClick={() => onNavigate('design')}
              style={{
                background: 'var(--teal)', color: '#fff', border: 'none',
                borderRadius: 'var(--radius)', padding: '0.55rem 1rem',
                fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer',
              }}
            >
              Open Design Room →
            </button>
          </div>

          {/* Review Room */}
          <div style={{ background: 'var(--surface)', padding: '1.5rem 1.6rem' }}>
            <div style={{
              fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--accent)', marginBottom: '0.6rem',
            }}>Review Room</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
              Can you read the messy result honestly after it runs?
            </h3>
            <p style={{ fontSize: '0.845rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem' }}>
              You're dropped into a fictional experiment readout: SRM flags, guardrail
              breaches, conflicting metrics, business pressure. Make the ship, rollback,
              or investigate call — then see how a senior analyst read the same data.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '1.1rem' }}>
              8 scenarios · Free + Beta · Analyst → Staff difficulty
            </div>
            <button
              onClick={() => onNavigate('browser')}
              style={{
                background: 'var(--accent)', color: '#fff', border: 'none',
                borderRadius: 'var(--radius)', padding: '0.55rem 1rem',
                fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer',
              }}
            >
              Open Review Room →
            </button>
          </div>
        </div>

        {/* Loop callout */}
        <div style={{
          marginTop: '1px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderTop: 'none',
          borderBottomLeftRadius: 'var(--radius-lg)',
          borderBottomRightRadius: 'var(--radius-lg)',
          padding: '0.75rem 1.2rem',
          fontSize: '0.8rem', color: 'var(--text-dim)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>◆</span>
          4 paired scenarios — design the test in the Design Room, then review the real result in the Review Room. Both directions available.
        </div>
      </div>

      {/* ── Why this is different ────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>Why this is different</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.65rem',
        }}>
          {[
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not a textbook statistics course',
              body: 'Concepts appear only when they affect a product decision. Inline reference cards for terms like SRM and p-value — surfaced in context, not upfront.',
            },
            {
              sign: '✗', signColor: 'var(--red)',
              title: 'Not formula drills',
              body: "The gap isn't knowing the math. It's applying it when the readout is messy and the PM wants an answer today.",
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Design before data exists',
              body: 'Set metrics, randomization units, guardrails, and decision rules before any results. The Design Room tests pre-experiment judgment.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Review messy real-world readouts',
              body: 'SRM, guardrail breaches, SUTVA violations, novelty effects, underpowered tests — the failure modes from real product analytics work.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Senior analyst debriefs',
              body: "Every decision unlocks a full senior read: what the trap was, what you might have missed, and how to explain it to stakeholders.",
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Business pressure built in',
              body: 'Every scenario has a fictional company, a launch deadline, and a PM pushing for a quick answer. Judgment under realistic constraints.',
            },
          ].map((item, i) => (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.1rem 1.2rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: item.signColor, lineHeight: 1 }}>{item.sign}</span>
                <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scenario list ──────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '4.5rem',
        alignItems: 'start',
      }}>

        {/* Review Room scenarios */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
              Review Room · 8 Scenarios
            </span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, color: 'var(--green-text)',
              background: 'var(--green-bg)', border: '1px solid var(--green-border)',
              borderRadius: '4px', padding: '0.1rem 0.4rem', letterSpacing: '0.04em',
            }}>AVAILABLE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Free', 'The Checkout Trap', 'Metric Conflict'],
              ['Free', 'The Ghost Assignment', 'SRM'],
              ['Free', 'The Slow Tax', 'Guardrail Breach'],
              ['Free', 'The Week-Two Drop', 'Novelty / Peeking'],
              ['Beta', 'The Mobile Winners', 'HTE / Subgroups'],
              ['Beta', 'The Five Metrics Problem', 'Multiple Testing'],
              ['Beta', 'The Two-Sided Spill', 'Marketplace / SUTVA'],
              ['Beta', 'False Rigor', 'When Not to Experiment'],
            ].map(([tier, title, theme], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.42rem 0',
                borderBottom: i < 7 ? '1px solid var(--border-subtle)' : 'none',
                fontSize: '0.82rem',
              }}>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700,
                  color: tier === 'Free' ? 'var(--accent)' : 'var(--teal)',
                  background: tier === 'Free' ? 'var(--accent-bg)' : 'var(--teal-bg)',
                  border: `1px solid ${tier === 'Free' ? 'var(--accent-border)' : 'var(--teal-border)'}`,
                  borderRadius: '3px', padding: '0.08rem 0.3rem',
                  whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{tier}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', fontSize: '0.72rem', flexShrink: 0 }}>{theme}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('browser')}
            style={{
              marginTop: '1rem', width: '100%',
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.6rem',
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            Open Review Room →
          </button>
        </div>

        {/* Design Room scenarios */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>
              Design Room · 4 Scenarios
            </span>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, color: 'var(--green-text)',
              background: 'var(--green-bg)', border: '1px solid var(--green-border)',
              borderRadius: '4px', padding: '0.1rem 0.4rem', letterSpacing: '0.04em',
            }}>NEW V1.2</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0.75rem' }}>
            {[
              ['Free', 'Design the Checkout Test', 'Metric Selection'],
              ['Free', 'Design the Onboarding Assignment', 'Randomization Unit'],
              ['Beta', 'Design the Mobile Feature Test', 'Pre-registration'],
              ['Beta', 'Design the Multi-Metric Launch', 'Multiple Testing'],
            ].map(([tier, title, theme], i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.42rem 0',
                borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
                fontSize: '0.82rem',
              }}>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700,
                  color: tier === 'Free' ? 'var(--accent)' : 'var(--teal)',
                  background: tier === 'Free' ? 'var(--accent-bg)' : 'var(--teal-bg)',
                  border: `1px solid ${tier === 'Free' ? 'var(--accent-border)' : 'var(--teal-border)'}`,
                  borderRadius: '3px', padding: '0.08rem 0.3rem',
                  whiteSpace: 'nowrap', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{tier}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
                <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', fontSize: '0.72rem', flexShrink: 0 }}>{theme}</span>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            <span>◆</span>
            <span>All 4 paired with Review Room counterparts</span>
          </div>
          <button
            onClick={() => onNavigate('design')}
            style={{
              width: '100%',
              background: 'var(--teal)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.6rem',
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
            }}
          >
            Open Design Room →
          </button>
        </div>
      </div>

      {/* ── Roadmap ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '480px' }}>
        <div className="label-caps" style={{ marginBottom: '1rem' }}>Roadmap</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { v: 'V1',   desc: 'Experiment Review Room · 8 scenarios · Free + Beta',          done: true,  current: false },
            { v: 'V1.1', desc: 'Judgment Bank · 50-scenario architecture · theme system',      done: true,  current: false },
            { v: 'V1.2', desc: 'Product Analytics Lab · Design Room · 14 concept cards',       done: false, current: true  },
            { v: 'V1.5', desc: 'Stats Room MVP · more Review + Design scenarios · CUPED',      done: false, current: false },
            { v: 'V2',   desc: 'KPI Playground · metric tradeoff simulator',                   done: false, current: false },
            { v: 'V2.5', desc: 'RCA Room · root cause analysis cases',                         done: false, current: false },
          ].map(({ v, desc, done, current }) => (
            <div key={v} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              padding: '0.6rem 0',
              borderBottom: '1px solid var(--border-subtle)',
              opacity: current ? 1 : done ? 0.75 : 0.38,
            }}>
              <span style={{
                fontWeight: 800, fontSize: '0.75rem',
                color: current ? 'var(--accent)' : done ? 'var(--teal)' : 'var(--text-dim)',
                minWidth: '34px', paddingTop: '1px',
              }}>{v}</span>
              <span style={{ fontSize: '0.82rem', color: current ? 'var(--text-secondary)' : 'var(--text-dim)', lineHeight: 1.5, flex: 1 }}>{desc}</span>
              {current && (
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, color: 'var(--green-text)',
                  background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                  borderRadius: '3px', padding: '0.08rem 0.4rem', flexShrink: 0, marginTop: '2px',
                }}>NOW</span>
              )}
              {done && !current && (
                <span style={{
                  fontSize: '0.58rem', fontWeight: 700, color: 'var(--teal)',
                  background: 'var(--teal-bg)', border: '1px solid var(--teal-border)',
                  borderRadius: '3px', padding: '0.08rem 0.4rem', flexShrink: 0, marginTop: '2px',
                }}>DONE</span>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.85rem', lineHeight: 1.55 }}>
          V1.5+ rooms are roadmap only. No empty nav items — rooms ship when they're ready.
        </p>
      </div>

    </div>
  );
}
