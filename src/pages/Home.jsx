export function Home({ onNavigate, onStartScenario }) {
  const rooms = [
    {
      id: 'stats', label: 'Stats Room', color: 'var(--blue-text)', bg: 'var(--blue-bg)', border: 'var(--blue-border)',
      tagline: 'A stakeholder makes a claim. Evaluate it against the evidence.',
      description: 'p-values, CIs, power, SRM, multiple testing, guardrails, novelty effects, SUTVA — each concept taught through structured claim evaluation. Senior analyst debrief after every answer.',
      meta: '8 modules · 4 free + 4 beta · Foundational → Senior',
      cta: 'Open Stats Room →',
      nav: 'stats',
    },
    {
      id: 'metrics', label: 'Metrics Room', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)',
      tagline: 'Can you choose the right metric before the experiment runs?',
      description: 'Define the primary metric, diagnostic metrics, and guardrails for a product scenario. Catch proxy traps, gaming incentives, and circular definitions. Scored against a senior metric design standard.',
      meta: '6 cases · 2 free + 4 beta · Analyst → Senior',
      cta: 'Open Metrics Room →',
      nav: 'metrics',
    },
    {
      id: 'design', label: 'Design Room', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)',
      tagline: 'Can you design the test correctly before data exists?',
      description: 'Set the primary metric, randomization unit, guardrails, trust checks, and pre-committed decision rule. Scored across 4 dimensions against the senior analyst standard.',
      meta: '8 scenarios · Free + Beta · Analyst → Senior',
      cta: 'Open Design Room →',
      nav: 'design',
    },
    {
      id: 'review', label: 'Review Room', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)',
      tagline: 'Can you read the messy result honestly after it runs?',
      description: "SRM flags, guardrail breaches, conflicting metrics, business pressure. Make the ship, rollback, or investigate call — then see how a senior analyst read the same data.",
      meta: '12 scenarios · Free + Beta · Analyst → Staff',
      cta: 'Open Review Room →',
      nav: 'browser',
    },
    {
      id: 'rca', label: 'RCA Room', color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'var(--yellow-border)',
      tagline: 'A metric moved. Can you diagnose why?',
      description: 'Step through a structured 5-stage root cause diagnosis: system check, decompose, segment, hypothesize, validate. Real product failure modes — payment bugs, catalog issues, cohort quality, notification fatigue.',
      meta: '6 cases · 2 free + 4 beta · Analyst → Senior',
      cta: 'Open RCA Room →',
      nav: 'rca',
    },
    {
      id: 'cases', label: 'Cases Room', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)',
      tagline: 'An exec asks a business question. Structure your answer.',
      description: '6-phase analysis: clarify the ask, define KPIs, form hypotheses, cut the data, choose methods, recommend. Ambiguous briefs with business pressure built in.',
      meta: '4 cases · 2 free + 2 beta · Analyst → Senior',
      cta: 'Open Cases Room →',
      nav: 'cases',
    },
  ];

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
          Product Analytics Lab · V2.0
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
          Six rooms. One skill loop. Practice metric design, experiment design, statistical
          claim evaluation, experiment review, root cause analysis, and business case framing —
          all with realistic product pressure and senior analyst debriefs.
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '2.25rem' }}>
          For product analysts, data scientists, growth analysts, and PMs who already know the basics.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('stats')}
            style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              letterSpacing: '-0.01em', boxShadow: 'var(--shadow)',
            }}
          >
            Start in Stats Room →
          </button>
          <button
            onClick={() => onNavigate('progress')}
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 500, fontSize: '0.92rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            View Guided Paths →
          </button>
          <button
            onClick={() => onNavigate('bank')}
            style={{
              background: 'var(--surface)', color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.7rem 1.4rem',
              fontWeight: 500, fontSize: '0.92rem', cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            Browse All 44 Cases →
          </button>
        </div>
      </div>

      {/* ── Six rooms ──────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>Six rooms. One loop.</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '0.65rem',
        }}>
          {rooms.map(room => (
            <div key={room.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.4rem 1.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                color: room.color, marginBottom: '0.5rem',
              }}>{room.label}</div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.45rem', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                {room.tagline}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 0.85rem' }}>
                {room.description}
              </p>
              <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                {room.meta}
              </div>
              <button
                onClick={() => onNavigate(room.nav)}
                style={{
                  background: room.color, color: '#fff', border: 'none',
                  borderRadius: 'var(--radius)', padding: '0.5rem 0.9rem',
                  fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                }}
              >
                {room.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Loop callout */}
        <div style={{
          marginTop: '0.65rem',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: '0.75rem 1.2rem',
          fontSize: '0.8rem', color: 'var(--text-dim)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>◆</span>
          8 paired scenarios — design the test in Design Room, then review the result in Review Room. Stats modules link to both.
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
              title: 'The full analytics loop',
              body: 'Metric design → experiment design → statistical evaluation → result review → root cause → business framing. Six skills in one product.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Senior analyst debriefs',
              body: 'Every decision unlocks a full senior read: what the trap was, what you might have missed, and how to explain it to stakeholders.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'Business pressure built in',
              body: 'Every scenario has a fictional company, a launch deadline, and a PM pushing for a quick answer. Judgment under realistic constraints.',
            },
            {
              sign: '✓', signColor: 'var(--green)',
              title: 'No AI grading, no free text',
              body: 'All scoring is pre-computed from structured choices. Consistent, offline-capable, and zero operating cost at any traffic level.',
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

      {/* ── 44 playable items ──────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>44 playable items — what's inside</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.1rem',
          alignItems: 'start',
        }}>
          {/* Stats */}
          <RoomList
            label="Stats Room · 8 Modules"
            labelColor="var(--blue-text)" labelBg="var(--blue-bg)" labelBorder="var(--blue-border)"
            items={[
              ['Free', 'p < 0.05. Ship it?', 'p-value'],
              ['Free', 'The 95% Confidence Trap', 'CI'],
              ['Free', 'We Ran It — Results Were Flat', 'power'],
              ['Free', 'The Uneven Split', 'SRM'],
              ['Beta', 'Five Wins, One Test', 'multiple testing'],
              ['Beta', 'Revenue Holds, Engagement Tanks', 'guardrails'],
              ['Beta', 'The Week-One Surge', 'novelty effect'],
              ['Beta', 'The Marketplace Spill', 'SUTVA'],
            ]}
            btnColor="var(--blue-text)"
            btnLabel="Open Stats Room →"
            onOpen={() => onNavigate('stats')}
          />
          {/* Metrics */}
          <RoomList
            label="Metrics Room · 6 Cases"
            labelColor="var(--teal)" labelBg="var(--teal-bg)" labelBorder="var(--teal-border)"
            items={[
              ['Free', 'Search Success Rate', 'proxy trap'],
              ['Free', 'Activation Metric', 'checklist gaming'],
              ['Beta', 'Push Notification Health', 'open rate trap'],
              ['Beta', 'Marketplace Seller Quality', 'displacement'],
              ['Beta', 'Revenue Growth Metric', 'GMV vs NRR'],
              ['Beta', 'GenAI Support Bot', 'deflection≠resolution'],
            ]}
            btnColor="var(--teal)"
            btnLabel="Open Metrics Room →"
            onOpen={() => onNavigate('metrics')}
          />
          {/* Review */}
          <RoomList
            label="Review Room · 12 Scenarios"
            labelColor="var(--accent)" labelBg="var(--accent-bg)" labelBorder="var(--accent-border)"
            items={[
              ['Free', 'The Checkout Trap', 'metric conflict'],
              ['Free', 'The Ghost Assignment', 'SRM'],
              ['Free', 'The Slow Tax', 'guardrail breach'],
              ['Free', 'The Week-Two Drop', 'novelty / peeking'],
              ['Beta', 'The Mobile Winners', 'HTE'],
              ['Beta', 'The Five Metrics Problem', 'multiple testing'],
              ['Beta', 'The Two-Sided Spill', 'SUTVA'],
              ['Beta', 'False Rigor', 'when not to test'],
              ['Beta', 'The Clickbait Ranking Win', 'proxy metric'],
              ['Beta', 'The Push Open Rate Trap', 'metric gaming'],
              ['Beta', 'The Seller Speed Spillover', 'marketplace'],
              ['Beta', 'The Checklist Completion Illusion', 'activation'],
            ]}
            btnColor="var(--accent)"
            btnLabel="Open Review Room →"
            onOpen={() => onNavigate('browser')}
          />
          {/* Design */}
          <RoomList
            label="Design Room · 8 Scenarios"
            labelColor="var(--teal)" labelBg="var(--teal-bg)" labelBorder="var(--teal-border)"
            items={[
              ['Free', 'Design the Checkout Test', 'metric selection'],
              ['Free', 'Design the Onboarding Assignment', 'rand. unit'],
              ['Beta', 'Design the Mobile Feature Test', 'pre-registration'],
              ['Beta', 'Design the Multi-Metric Launch', 'multiple testing'],
              ['Beta', 'Design the Search Ranking Test', 'proxy metric'],
              ['Beta', 'Design the Notification Timing Test', 'metric gaming'],
              ['Beta', 'Design the Seller Incentive Test', 'SUTVA'],
              ['Beta', 'Design the Onboarding Checklist Test', 'activation'],
            ]}
            btnColor="var(--teal)"
            btnLabel="Open Design Room →"
            onOpen={() => onNavigate('design')}
            footer="◆ All 8 paired with Review Room counterparts"
          />
          {/* RCA */}
          <RoomList
            label="RCA Room · 6 Cases"
            labelColor="var(--yellow)" labelBg="var(--yellow-bg)" labelBorder="var(--yellow-border)"
            items={[
              ['Free', 'Checkout Conversion Drop', 'payment bug'],
              ['Free', 'Zero-Result Search Spike', 'catalog ingestion'],
              ['Beta', 'Marketplace Cancellations', 'seller quality'],
              ['Beta', 'D7 Retention Drop', 'notification fatigue'],
              ['Beta', 'Revenue Up, Margin Down', 'mix shift'],
              ['Beta', 'GenAI Bot Escalation Spike', 'deflection proxy'],
            ]}
            btnColor="var(--yellow)"
            btnLabel="Open RCA Room →"
            onOpen={() => onNavigate('rca')}
          />
          {/* Cases */}
          <RoomList
            label="Cases Room · 4 Cases"
            labelColor="var(--purple)" labelBg="var(--purple-bg)" labelBorder="var(--purple-border)"
            items={[
              ['Free', 'Launch Same-Day Delivery?', 'ops expansion'],
              ['Free', 'Why Did Retention Fall?', 'metric decomp'],
              ['Beta', 'Replace Tier-1 Support with AI?', 'GenAI ROI'],
              ['Beta', 'Which Seller Segment to Incentivize?', 'segmentation'],
            ]}
            btnColor="var(--purple)"
            btnLabel="Open Cases Room →"
            onOpen={() => onNavigate('cases')}
          />
        </div>
      </div>

      {/* ── Roadmap ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '520px' }}>
        <div className="label-caps" style={{ marginBottom: '1rem' }}>Build history</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { v: 'V1',   desc: 'Experiment Review Room · 8 scenarios', done: true, current: false },
            { v: 'V1.1', desc: 'Judgment Bank · 50-scenario architecture · theme system', done: true, current: false },
            { v: 'V1.2', desc: 'Design Room · Product Analytics Lab rebrand', done: true, current: false },
            { v: 'V1.5', desc: 'Stats Room · 8 modules · p-value to SUTVA', done: true, current: false },
            { v: 'V1.6', desc: '8 paired scenarios · claim evaluation mechanic · 28 items', done: true, current: false },
            { v: 'V2.0', desc: 'Metrics Room + RCA Room + Cases Room · 44 items total · guided paths', done: false, current: true },
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
      </div>

    </div>
  );
}

function RoomList({ label, labelColor, labelBg, labelBorder, items, btnColor, btnLabel, onOpen, footer }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '1.4rem',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{label}</span>
        <span style={{
          fontSize: '0.58rem', fontWeight: 700, color: labelColor,
          background: labelBg, border: `1px solid ${labelBorder}`,
          borderRadius: '4px', padding: '0.1rem 0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>V2.0</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: footer ? '0.5rem' : '0.75rem' }}>
        {items.map(([tier, title, concept], i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
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
            <span style={{ color: 'var(--text-dim)', whiteSpace: 'nowrap', fontSize: '0.72rem', flexShrink: 0 }}>{concept}</span>
          </div>
        ))}
      </div>
      {footer && (
        <div style={{
          fontSize: '0.72rem', color: 'var(--accent)', marginBottom: '0.85rem',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          <span>{footer}</span>
        </div>
      )}
      <button
        onClick={onOpen}
        style={{
          width: '100%',
          background: btnColor, color: '#fff', border: 'none',
          borderRadius: 'var(--radius)', padding: '0.55rem',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
        }}
      >
        {btnLabel}
      </button>
    </div>
  );
}
