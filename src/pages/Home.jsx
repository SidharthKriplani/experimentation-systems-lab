import { useState } from 'react';
import { learningPaths } from '../data/learningPaths.js';

const ROLES = [
  { id: 'both', label: 'DS + PM' },
  { id: 'ds',   label: 'Product DS' },
  { id: 'pm',   label: 'Product PM' },
];

function getSavedRole() {
  try { return localStorage.getItem('pal-role-toggle') || 'both'; } catch { return 'both'; }
}

function saveRole(role) {
  try { localStorage.setItem('pal-role-toggle', role); } catch {}
}

// Which nav IDs are prioritized for each role
const DS_ROOMS  = ['stats', 'metrics', 'design', 'review', 'rca', 'code', 'cases', 'product-design', 'prioritization'];
const PM_ROOMS  = ['product-design', 'prioritization', 'cases', 'review', 'metrics', 'rca', 'design', 'stats', 'code'];
const ALL_ROOMS = ['stats', 'metrics', 'design', 'review', 'rca', 'cases', 'code', 'product-design', 'prioritization'];

export function Home({ onNavigate, onStartScenario }) {
  const [role, setRole] = useState(getSavedRole);

  function switchRole(r) {
    setRole(r);
    saveRole(r);
  }

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
      id: 'metrics', label: 'Metrics Room', color: 'var(--green)', bg: 'var(--green-bg)', border: 'var(--green-border)',
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
    {
      id: 'product-design', label: 'Product Design Room', color: 'var(--purple)', bg: 'var(--purple-bg)', border: 'var(--purple-border)',
      tagline: 'Design a real product feature — from first principles.',
      description: 'PM-style product design questions from Spotify, Airbnb, Slack, LinkedIn, and more. Work through 5 phases: Clarify, Users, Goals, Solutions, Prioritize. Self-score against a senior PM model answer.',
      meta: '8 scenarios · 1 free + 7 beta · PM / DS-PM',
      badge: '✦ New',
      cta: 'Open Product Design Room →',
      nav: 'product-design',
    },
    {
      id: 'code', label: 'Code Room', color: 'var(--teal)', bg: 'var(--teal-bg)', border: 'var(--teal-border)',
      tagline: 'Write the query that proves your diagnosis.',
      description: 'Analytics SQL and Python in product context — not syntax drills. Each module presents a real product scenario (metric drop, experiment, margin question) and asks you to write the query or script that answers it.',
      meta: '6 modules · 1 free + 5 beta · SQL + Python · Analyst → Senior',
      badge: '✦ New',
      cta: 'Open Code Room →',
      nav: 'code',
    },
    {
      id: 'prioritization', label: 'Prioritization Room', color: 'var(--accent)', bg: 'var(--accent-bg)', border: 'var(--accent-border)',
      tagline: 'Stack-rank like a senior PM.',
      description: 'RICE scoring, effort–impact matrices, technical debt tradeoffs, stakeholder conflicts, OKR-level decisions — 6 scenarios from Spotify, Airbnb, Notion, Meta, Duolingo, and Stripe. Structured framework exercises with model answers.',
      meta: '6 scenarios · 1 free + 5 beta · PM · Intermediate → Advanced',
      badge: '✦ New',
      cta: 'Open Prioritization Room →',
      nav: 'prioritization',
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
          Private Beta
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
          lineHeight: 1.7,
          marginBottom: '0.6rem',
          maxWidth: '560px',
        }}>
          64 practice cases across nine rooms. Each one puts you in a real product scenario —
          messy data, stakeholder pressure, no clean answer — then shows you how a senior analyst or PM read it.
        </p>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', marginBottom: '2.25rem' }}>
          For product analysts, data scientists, and PMs who already know the basics.
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
            Start with Stats Room →
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
            New here? Try the Beginner Path →
          </button>
        </div>
      </div>

      {/* ── Nine rooms ─────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.1rem' }}>
          <div className="label-caps">Nine rooms. Nine judgment muscles.</div>
          {/* Role toggle */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.2rem' }}>
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                style={{
                  background: role === r.id ? 'var(--surface)' : 'none',
                  border: role === r.id ? '1px solid var(--border)' : '1px solid transparent',
                  borderRadius: '6px', padding: '0.25rem 0.7rem',
                  color: role === r.id ? 'var(--text)' : 'var(--text-dim)',
                  fontWeight: role === r.id ? 600 : 400, fontSize: '0.78rem',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  boxShadow: role === r.id ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        {role !== 'both' && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            {role === 'ds' ? 'Showing analytics-first order — Stats, Metrics, Design, Review, RCA, Code first.' : 'Showing PM-first order — Product Design, Prioritization, Cases first.'}
          </p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '0.65rem',
        }}>
          {(role === 'ds' ? [...rooms].sort((a, b) => DS_ROOMS.indexOf(a.nav) - DS_ROOMS.indexOf(b.nav))
            : role === 'pm' ? [...rooms].sort((a, b) => PM_ROOMS.indexOf(a.nav) - PM_ROOMS.indexOf(b.nav))
            : rooms
          ).map(room => (
            <div key={room.id} style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.4rem 1.5rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                color: room.color, marginBottom: '0.5rem',
              }}>{room.label}</div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.45rem', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
                {room.tagline}
              </h3>
              {/* description grows to fill available space, keeping meta+button anchored at bottom */}
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 0.85rem', flex: 1 }}>
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
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.82rem', color: item.signColor, lineHeight: 1 }}>{item.sign}</span>
                <span style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0, flex: 1 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 44 playable items ──────────────────────────────────────────── */}
      <div style={{ marginBottom: '4.5rem' }}>
        <div className="label-caps" style={{ marginBottom: '1.1rem' }}>64 playable items — what's inside</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.1rem',
          /* removed alignItems:'start' so grid rows equalize card heights */
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
            labelColor="var(--green)" labelBg="var(--green-bg)" labelBorder="var(--green-border)"
            items={[
              ['Free', 'Search Success Rate', 'proxy trap'],
              ['Free', 'Activation Metric', 'checklist gaming'],
              ['Beta', 'Push Notification Health', 'open rate trap'],
              ['Beta', 'Marketplace Seller Quality', 'displacement'],
              ['Beta', 'Revenue Growth Metric', 'GMV vs NRR'],
              ['Beta', 'GenAI Support Bot', 'deflection≠resolution'],
            ]}
            btnColor="var(--green)"
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
          {/* Product Design Room */}
          <RoomList
            label="✦ Product Design Room · 8 Scenarios · New"
            labelColor="var(--purple)" labelBg="var(--purple-bg)" labelBorder="var(--purple-border)"
            items={[
              ['Free', 'Spotify — Improve Podcast Discovery', 'product design'],
              ['Beta', 'Airbnb — Reduce Host Response Lag', 'marketplace'],
              ['Beta', 'Slack — Reduce Notification Fatigue', 'B2B / productivity'],
              ['Beta', 'Google Maps — Design for EV Drivers', 'utility / new segment'],
              ['Beta', 'LinkedIn — Improve Application Quality', 'two-sided platform'],
              ['Beta', 'DoorDash — Reduce Post-Order Cancellations', 'delivery ops'],
              ['Beta', 'Stripe — Help SMBs Understand Revenue', 'fintech / B2B'],
              ['Beta', 'Instagram — Help Creators Grow', 'social / creator economy'],
            ]}
            btnColor="var(--purple)"
            btnLabel="Open Product Design Room →"
            onOpen={() => onNavigate('product-design')}
            footer="5-phase open-ended framework · Self-scored with model PM answers"
          />

          <RoomList
            label="Code Room"
            labelColor="var(--teal)" labelBg="var(--teal-bg)" labelBorder="var(--teal-border)"
            items={[
              ['Free', 'Write a Funnel Query', 'SQL · funnel analysis'],
              ['Beta', 'Build a Retention Cohort Table', 'SQL · window functions'],
              ['Beta', 'Run an A/B Test Significance Check', 'Python · scipy.stats'],
              ['Beta', 'Implement CUPED Variance Reduction', 'Python · Pandas'],
              ['Beta', 'Detect a Sample Ratio Mismatch', 'SQL · chi-squared'],
              ['Beta', 'Decompose a Mix Shift', 'SQL · shift-share analysis'],
            ]}
            btnColor="var(--teal)"
            btnLabel="Open Code Room →"
            onOpen={() => onNavigate('code')}
            footer="Complete partial code → reveal model answer · SQL + Python tracks"
          />

          {/* Prioritization Room */}
          <RoomList
            label="✦ Prioritization Room · 6 Scenarios · New"
            labelColor="var(--accent)" labelBg="var(--accent-bg)" labelBorder="var(--accent-border)"
            items={[
              ['Free', 'Spotify — Feature Backlog Sprint Planning', 'RICE scoring'],
              ['Beta', 'Airbnb — Effort–Impact Matrix', '2×2 quick wins'],
              ['Beta', 'Notion — Technical Debt vs. New Features', 'velocity tax'],
              ['Beta', 'Meta — Growth vs. Safety Conflict', 'stakeholder negotiation'],
              ['Beta', 'Duolingo — OKR-Level Prioritization', 'north star tradeoffs'],
              ['Beta', 'Stripe — Platform vs. Feature Sequencing', 'time horizon decisions'],
            ]}
            btnColor="var(--accent)"
            btnLabel="Open Prioritization Room →"
            onOpen={() => onNavigate('prioritization')}
            footer="Framework exercises with model answers · RICE, 2×2, OKR, stakeholder conflict"
          />
        </div>
      </div>

      {/* ── Guided paths ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="label-caps">Guided paths — where to start</div>
          <button
            onClick={() => onNavigate('progress')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600, padding: 0 }}
          >View all paths →</button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.65rem',
        }}>
          {learningPaths.map(path => (
            <div
              key={path.id}
              onClick={() => onNavigate('progress')}
              style={{
                background: 'var(--surface)', border: `1px solid ${path.border}`,
                borderRadius: 'var(--radius)', padding: '1rem 1.1rem',
                cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: path.color, marginBottom: '0.35rem' }}>
                {path.sequence.length} items
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                {path.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
                {path.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── RoomList card ────────────────────────────────────────────────────────────
// Fixed-height card (420px) with three non-overlapping zones:
//   1. Header — flex-shrink: 0
//   2. Scroll area — flex: 1; min-height: 0  ← the critical pair for flex overflow
//   3. Footer + CTA — flex-shrink: 0
//
// min-height: 0 overrides the flex default (auto) so the scroll area actually
// shrinks when the card is constrained, enabling overflow-y: auto to work.
// Scrollbar is hidden via .room-list-scroll CSS class (see index.css).
// Fade gradient is always rendered as a scroll affordance hint.

function RoomList({ label, labelColor, labelBg, labelBorder, items, btnColor, btnLabel, onOpen, footer }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '1.4rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex', flexDirection: 'column',
      height: '420px',  /* fixed card height — all 6 cards same size */
    }}>

      {/* ── Zone 1: Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem', flexShrink: 0,
      }}>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{label}</span>
        <span style={{
          fontSize: '0.58rem', fontWeight: 700, color: labelColor,
          background: labelBg, border: `1px solid ${labelBorder}`,
          borderRadius: '4px', padding: '0.1rem 0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>V2.2</span>
      </div>

      {/* ── Zone 2: Scroll area ── */}
      {/* flex:1 + min-height:0 is the required pair — without min-height:0   */}
      {/* the flex item refuses to shrink below content size and overflow:auto */}
      {/* never activates. position:relative contains the fade overlay.        */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
        <div
          className="room-list-scroll"
          style={{ overflowY: 'auto', height: '100%' }}
        >
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
        {/* Subtle scroll-affordance fade — always rendered, pointer-events off */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2rem',
          background: 'linear-gradient(to bottom, transparent, var(--surface))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Zone 3: Footer note + CTA ── */}
      {footer && (
        <div style={{
          fontSize: '0.72rem', color: 'var(--accent)',
          marginTop: '0.65rem', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          {footer}
        </div>
      )}
      <button
        onClick={onOpen}
        style={{
          width: '100%',
          background: btnColor, color: '#fff', border: 'none',
          borderRadius: 'var(--radius)', padding: '0.55rem',
          fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
          marginTop: '0.75rem', flexShrink: 0,
        }}
      >
        {btnLabel}
      </button>
    </div>
  );
}
