export function About() {
  const sections = [
    {
      title: 'What this is',
      body: `Product Analytics Lab is an interactive judgment gym for product analysts and data scientists who already understand the basics of A/B testing. The gap it fills: there are many resources for learning experimental statistics, but very few that give you practice making judgment calls under messy, realistic product data.

The lab has three rooms. The Stats Room teaches statistical concepts through structured claim evaluation — a stakeholder or PM makes a specific claim about the data, and you evaluate whether it is valid, incomplete, unsupported, or inconclusive. The Design Room tests pre-experiment judgment: set the metric, randomization unit, guardrails, and decision rule before data exists. The Review Room drops you into a messy experiment readout and asks you to make the call.

The answer is rarely "p < 0.05, ship it." This is where you practice the harder calls.`,
    },
    {
      title: "Who it's for",
      body: `Product analysts, data scientists, growth analysts, and PMs who already know what a p-value, SRM, and SUTVA are — and want to practice applying that knowledge under business pressure with messy readouts.

Scenarios are calibrated at three levels: Analyst (catch the main issue), Senior (correct reasoning and mechanism), and Staff (precise framing, forward-looking recommendations).

If you need the foundational statistics explained, this is not the right place to start. Learn those first, then return here to practice the calls.`,
    },
    {
      title: 'How scoring works',
      body: `Decisions are scored at four levels based on the quality of judgment they reflect:

• Junior Miss — Common early-career mistake. Focuses on surface signals (primary metric is green, ship it) and misses the critical issue.
• Analyst-Ready — Solid call. Catches the key problem but may miss depth, mechanism, or next steps.
• Senior-Ready — Strong judgment. Identifies the right decision and the right reasoning.
• Staff-Level — Exceptional rigor. Statistically precise, actionable, and forward-looking.

Scoring is pre-computed per decision option in the scenario data. There is no AI evaluation of your reasoning — this keeps the product static, offline-capable, and consistent.`,
    },
    {
      title: 'The senior analyst debrief',
      body: `After you submit, you see a full senior analyst read of the experiment. This is the learning payoff — not just whether you got it right, but how an experienced analyst would frame the problem, what they'd flag to stakeholders, and what they'd do next.

The debrief is written to reflect real senior-level thinking: it names the failure mode, explains why it matters in this context, and connects the decision to downstream business risk. Read it carefully even when you got the call right.`,
    },
    {
      title: 'The flag checklist',
      body: `Before submitting your decision, you can tick off the warning flags you noticed in the data. This isn't graded — it's purely for your own calibration. The purpose is to make you reflect before seeing the answer, which research on deliberate practice suggests produces better learning retention than passively reading the solution.

After you submit, the same panel switches to show all flags with full descriptions and severity levels.`,
    },
    {
      title: 'Content quality bar',
      body: `Each playable scenario requires original work: a realistic business context, a coherent experiment design, a metric readout with the right tension, warning flags with severity calibration, four decision options scored at four levels, and a full senior analyst debrief.

This is not a scenario generator. The 8 playable scenarios in V1.1 have been written and reviewed individually. The 42 scenarios on the roadmap have their architecture defined — they will ship when each one meets the same quality bar.

The full content quality standard is documented in docs/CONTENT_QUALITY_BAR.md.`,
    },
    {
      title: 'Technical details',
      body: `This is a fully static frontend application. No backend, no database, no API calls. All scenario content is shipped as a JavaScript data file. Progress and theme preference are stored in your browser's localStorage. Nothing leaves your device.

Built with React, Vite, and Tailwind CSS v4. Deployable to any static host (Vercel, Netlify, GitHub Pages). Zero operating cost at any traffic level.`,
    },
    {
      title: 'Roadmap',
      body: `V1 (shipped): Review Room · 8 scenarios · Free + Beta.

V1.1 (shipped): Judgment Bank · 50-scenario architecture · theme system.

V1.2 (shipped): Product Analytics Lab rebrand · Design Room · 14 concept cards.

V1.5 (shipped): Stats Room MVP · 8 modules covering p-value, CI, power, SRM, multiple testing, guardrail metrics, novelty effect, and SUTVA.

V1.6 (current): Core loop depth · 4 new paired Design scenarios (D05–D08) · 4 new Review scenarios (S09–S12) · STAT01–04 redesigned to structured claim evaluation mechanic · 4 new concept chips (proxy metric, metric gaming, activation, marketplace interference) · 28 playable items total.

V2 (planned): KPI Playground · metric tradeoff simulator.

V2.5 (planned): RCA Room · root cause analysis cases.

Full roadmap documented in docs/ROADMAP.md.`,
    },
  ];

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
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
