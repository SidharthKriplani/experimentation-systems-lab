export function About() {
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#e8eaf0', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
        Methodology
      </h1>
      <p style={{ color: '#8890a8', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
        What this is, how it works, and why it's built this way.
      </p>

      {[
        {
          title: 'What this is',
          body: `Experimentation Systems Lab is a static decision simulator for product analysts and data scientists who already understand the basics of A/B testing. The gap it fills: there are many resources for learning experimental statistics, but very few that give you practice making judgment calls under messy, realistic product data.

Each scenario is a synthetic experiment readout — a fictional company, a fictional experiment, but the data patterns, decision tensions, and failure modes are drawn from real recurring problems in product analytics: guardrail breaches, sample ratio mismatches, marketplace interference, post-hoc subgroup fishing, novelty effects, underpowered tests.`,
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
          title: 'The flag checklist',
          body: `Before submitting your decision, you can tick off the warning flags you noticed in the data. This isn't graded — it's purely for your own calibration. The purpose is to make you reflect before seeing the answer, which research on deliberate practice suggests produces better learning retention than passively reading the solution.`,
        },
        {
          title: 'Technical details',
          body: `This is a fully static frontend application. No backend, no database, no API calls. All scenario content is shipped as a JavaScript data file. Progress is stored in your browser's localStorage. Nothing leaves your device.

Built with React, Vite, and Tailwind CSS. Deployable to any static host (Vercel, Netlify, GitHub Pages).`,
        },
        {
          title: 'What it is not',
          body: `This is not a statistics course. There are no primers, no formula explanations, no glossary, no certificate. If you don't know what p-value, SRM, or SUTVA mean, you'll want to learn those basics first — then come back here to practice applying them under pressure.

It is also not a test of memorized knowledge. The scenarios are designed so that someone who has read about A/B testing but never practiced decision-making under messy product data will get the "easy" option right but miss the nuance. The gap it's training is the gap between textbook knowledge and production judgment.`,
        },
        {
          title: 'Roadmap',
          body: `V1: 8 scenarios across 6 failure mode themes. Free tier (4 scenarios) + private beta tier (4 scenarios).

V1.5: 20 scenarios. Adds coverage of geo-holdout design, switchback experiments, CUPED, cannibalization framing, right-censored metrics, B2B-specific constraints.

V2: 50-scenario Experiment Judgment Bank. Organized into 15 scenario families. Full coverage of product analytics decision patterns at analyst, senior, and staff level.`,
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1rem', fontWeight: 700, color: '#e8eaf0',
            marginBottom: '0.65rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #1e2235',
          }}>{section.title}</h2>
          <div style={{
            fontSize: '0.875rem', color: '#c5c9d8',
            lineHeight: 1.75, whiteSpace: 'pre-line',
          }}>{section.body}</div>
        </div>
      ))}
    </div>
  );
}
