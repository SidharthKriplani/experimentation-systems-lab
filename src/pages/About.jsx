export function About() {
  const sections = [
    {
      title: 'What this is',
      body: `Product Analytics Lab is an interactive judgment gym for product analysts and data scientists who already understand the basics of A/B testing. The gap it fills: there are many resources for learning experimental statistics, but very few that give you practice making judgment calls under messy, realistic product data.

The lab has six rooms, each testing a different analytical skill:

Stats Room — A stakeholder makes a specific claim about the experiment data. You evaluate whether it is valid, directionally reasonable but incomplete, not supported, or inconclusive. 8 modules covering p-values, CIs, power, SRM, multiple testing, guardrails, novelty effects, and SUTVA.

Metrics Room — You're given a product context and a business goal. Define the primary metric, diagnostic metrics, and guardrails. Scored against a senior metric design standard with a full debrief. 6 cases covering search, activation, push notifications, marketplace quality, revenue, and GenAI deflection.

Design Room — Set the primary metric, randomization unit, guardrails, trust checks, and pre-committed decision rule before data exists. 8 scenarios, each paired with a Review Room counterpart.

Review Room — You're dropped into a messy experiment readout with SRM flags, guardrail breaches, conflicting metrics, and business pressure. Make the ship, rollback, or investigate call. 12 scenarios.

RCA Room — A metric moved. Step through a structured 5-stage diagnosis: system check, decompose, segment, hypothesize, validate. 6 cases covering real product failure modes from payment bugs to notification fatigue.

Cases Room — An exec asks a business question. Work through a 6-phase analysis: clarify the ask, define KPIs, form hypotheses, cut the data, choose methods, recommend. 4 cases with ambiguous briefs and business pressure.

The answer is rarely "p < 0.05, ship it." This is where you practice the harder calls.`,
    },
    {
      title: "Who it's for",
      body: `Product analysts, data scientists, growth analysts, and PMs who already know what a p-value, SRM, and SUTVA are — and want to practice applying that knowledge under business pressure with messy readouts.

Items are calibrated at three levels: Analyst (catch the main issue), Senior (correct reasoning and mechanism), and Staff (precise framing, forward-looking recommendations).

If you need the foundational statistics explained, this is not the right place to start. Learn those first, then return here to practice the calls.`,
    },
    {
      title: 'How scoring works',
      body: `All rooms use pre-computed scoring based on structured multiple-choice responses. No AI grading, no free-text evaluation.

Stats Room: Four options per claim — Valid, Directionally reasonable but incomplete, Not supported, Cannot conclude. Each maps to a level (Junior / Analyst / Senior / Staff) with rationale.

Metrics Room: Five fields answered simultaneously. Each option carries a score value (0, 1, or 2). Total score / max possible → percentage → level: ≥80% Staff, ≥60% Senior, ≥40% Analyst, <40% Junior.

Design Room: Five fields, each scored 0–2 by dimension quality. Aggregate level by weighted total.

Review Room: Four decision options (Ship / Rollback / Investigate / Pause) each scored at Junior / Analyst / Senior / Staff with full rationale.

RCA Room: Five sequential steps. Each option labeled strong (2), partial (1), or wrong (0). Total / max → level.

Cases Room: Six sequential phases. Same strong/partial/wrong scoring as RCA. Per-phase breakdown shown in debrief.

This keeps the product static, offline-capable, and consistent. The same inputs produce the same scores for everyone.`,
    },
    {
      title: 'Why no AI grading',
      body: `Free-text entry + AI evaluation is the obvious next step for a product like this. We've chosen not to build it, for three reasons:

Consistency: pre-computed scoring means the same answer gets the same result for every user every time. AI evaluation introduces variance that makes calibration harder.

Operating cost: AI grading at any real scale requires an API with a cost-per-call. Static scoring has zero marginal cost, which means no pricing decision changes the learning experience.

Quality bar: writing the four scored options per question forces us to specify exactly what good, acceptable, and wrong judgment looks like. That specification is itself a learning artifact — reading the scored options teaches you how to distinguish levels of quality. Free-text answers sidestep this work and lose the teaching value embedded in the option design.

When a scenario has a right answer, structured choices let us say so clearly.`,
    },
    {
      title: 'The senior analyst debrief',
      body: `After you submit in any room, you see a full senior analyst read of the case. This is the learning payoff — not just whether you got it right, but how an experienced analyst would frame the problem, what they'd flag to stakeholders, and what they'd do next.

The debrief is written to reflect real senior-level thinking: it names the failure mode, explains why it matters in this context, and connects the decision to downstream business risk. Read it carefully even when you got the call right.`,
    },
    {
      title: 'Guided paths',
      body: `The Progress page includes four guided paths that sequence items across rooms:

Beginner Path: Stats → Metrics → Design → Review. Start with foundational concepts, then apply them to metric design and experiment execution.

Experimentation Path: Stats modules paired with their Design and Review counterparts. Deep-dive on the experiment loop.

Product Analytics Path: Metrics → RCA → Cases. Focus on the non-experiment analytics skills most often tested in senior interviews.

GenAI Analytics Path: Three cases (M06, RCA06, C03) that all touch GenAI product metrics — deflection, escalation, and support automation ROI.

Paths don't gate content — they're navigational aids. You can take any case in any order.`,
    },
    {
      title: 'Technical details',
      body: `This is a fully static frontend application. No backend, no database, no API calls. All scenario content is shipped as JavaScript data files. Progress and theme preference are stored in your browser's localStorage. Nothing leaves your device.

Built with React and Vite. Deployable to any static host (Vercel, Netlify, GitHub Pages). Zero operating cost at any traffic level.

localStorage keys: exp-lab-theme, exp-lab-progress-v1 (Review), pal-design-progress-v1 (Design), pal-stats-progress-v1 (Stats), pal-metrics-progress-v2 (Metrics), pal-rca-progress-v2 (RCA), pal-cases-progress-v2 (Cases).`,
    },
    {
      title: 'Build history',
      body: `V1 (shipped): Review Room · 8 scenarios · Free + Beta.

V1.1 (shipped): Judgment Bank · 50-scenario architecture · theme system.

V1.2 (shipped): Product Analytics Lab rebrand · Design Room · 14 concept cards.

V1.5 (shipped): Stats Room MVP · 8 modules covering p-value, CI, power, SRM, multiple testing, guardrail metrics, novelty effect, and SUTVA.

V1.6 (shipped): Core loop depth · 4 new paired Design scenarios (D05–D08) · 4 new Review scenarios (S09–S12) · structured claim evaluation mechanic · 28 playable items.

V2.0 (current): Metrics Room (6 cases) · RCA Room (6 cases) · Cases Room (4 cases) · Guided paths · Readiness summary · 44 playable items total.`,
    },
  ];

  return (
    <div className="pal-page-enter" style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', marginBottom: '0.4rem' }}>
          Methodology
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          What this is, how it works, and why it's built this way.
        </p>
      </div>

      {sections.map((section, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)',
            marginBottom: '0.65rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid var(--border-subtle)',
          }}>{section.title}</h2>
          <div style={{
            fontSize: '0.875rem', color: 'var(--text-secondary)',
            lineHeight: 1.75, whiteSpace: 'pre-line',
          }}>{section.body}</div>
        </div>
      ))}
    </div>
  );
}
