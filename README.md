# Product Analytics Lab

**"You know the formulas. Now practice the calls."**

An interactive analytics judgment gym for metrics, experiments, RCA, and product decisions. Practice designing A/B tests from scratch, reviewing messy readouts, and making the calls that separate analysts from seniors.

Built for product analysts, data scientists, growth analysts, and PMs.

---

## What this is

Not a statistics course. No primers, no glossary, no certificate. Two rooms:

**Review Room** — You're dropped into a fictional experiment readout with real-looking data. Make the call: ship, rollback, or investigate? Then see how a senior analyst would have read the same data.

**Design Room** — You're given a fictional product scenario and asked to design the experiment before any data exists. Set the primary metric, randomization unit, trust checks, and decision rule. Scored across 4 dimensions, compared to a senior analyst standard.

The answer is rarely "p < 0.05, ship it."

**Target user:** A data scientist or analyst who knows what p-values and A/B testing are, but wants to build judgment under business pressure and messy product data.

---

## V1.2 — Current

### Review Room (8 scenarios)

| Tier | Scenario | Difficulty | Theme |
|------|----------|------------|-------|
| Free | The Checkout Trap | Analyst | Metric Conflict |
| Free | The Ghost Assignment | Analyst | Sample Ratio Mismatch |
| Free | The Slow Tax | Analyst | Guardrail Breach |
| Free | The Week-Two Drop | Analyst | Novelty Effect / Peeking |
| Beta | The Mobile Winners | Senior | Heterogeneous Treatment Effects |
| Beta | The Five Metrics Problem | Senior | Multiple Testing |
| Beta | The Two-Sided Spill | Staff | Marketplace Interference / SUTVA |
| Beta | False Rigor | Senior | When Not to Experiment |

### Design Room (4 scenarios, all paired with Review Room counterparts)

| Tier | Scenario | Difficulty | Paired With |
|------|----------|------------|-------------|
| Free | Design the Checkout Test | Analyst | The Checkout Trap |
| Free | Design the Onboarding Assignment | Analyst | The Ghost Assignment |
| Beta | Design the Mobile Feature Test | Senior | The Mobile Winners |
| Beta | Design the Multi-Metric Launch | Senior | The Five Metrics Problem |

**V1.2 additions:**
- **Design Room** — 4 playable design scenarios with 5-phase forms and 4-dimension weighted scoring
- **Contextual concept cards** — inline `[SRM ↗]` chips open reference drawers (14 concepts)
- **Paired Design ↔ Review loop** — bidirectional CTAs between paired scenarios
- **Judgment Bank multi-room** — room filter (Review / Design / Roadmap), paired badges
- **Platform rename** — Experimentation Systems Lab → Product Analytics Lab

---

## Documentation

- [PRD — Product vision, modules, monetization](docs/PRODUCT_ANALYTICS_SYSTEMS_LAB_PRD.md)
- [Roadmap — V1 through V5](docs/ROADMAP.md)
- [Content Quality Bar — What makes a scenario shippable](docs/CONTENT_QUALITY_BAR.md)
- [Scenario Bank Taxonomy — 15 families, 50 scenarios](docs/SCENARIO_BANK_TAXONOMY.md)

---

## Tech Stack

- **React** + **Vite** v8
- **Tailwind CSS** v4 via `@tailwindcss/vite`
- Static frontend only — no backend, no database, no API calls
- `localStorage` for progress, unlock state, and theme preference
- Deployable to Vercel free tier

---

## Run Locally

```bash
git clone <your-repo-url>
cd experimentation-systems-lab
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## Build

```bash
npm run build
```

Output in `dist/`.

---

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. No environment variables required

---

## Project Structure

```
src/
  data/
    scenarios.js          # All 8 playable scenario objects
    scenarioBank.js       # 42 planned scenario metadata (V1.5/V2 roadmap)
  components/
    layout/
      Header.jsx          # Nav + theme toggle
      Footer.jsx
    scenario/
      ScenarioCard.jsx
      ContextPanel.jsx
      ExperimentDesign.jsx
      MetricTable.jsx
      WarningFlags.jsx
      FlagChecklist.jsx
      DecisionPanel.jsx
      ScoreReveal.jsx
      DebriefPanel.jsx
      ScenarioRunner.jsx
    ui/
      Badge.jsx
      Button.jsx
      LockOverlay.jsx
  pages/
    Home.jsx
    ScenarioBrowser.jsx
    JudgmentBank.jsx      # 50-scenario bank (V1.1)
    Progress.jsx
    Unlock.jsx
    About.jsx
  utils/
    progress.js
    scoring.js
    unlock.js
  App.jsx
  main.jsx
  index.css              # CSS variable theme system (light + dark)
docs/
  PRODUCT_ANALYTICS_SYSTEMS_LAB_PRD.md
  ROADMAP.md
  CONTENT_QUALITY_BAR.md
  SCENARIO_BANK_TAXONOMY.md
```

---

## Scenario Schema

```js
{
  id, title, subtitle, isFree, industry, difficulty, theme,
  context: { company, product, team, background, businessPressure },
  hypothesis,
  experimentDesign: { type, allocation, runtime, targetPopulation,
                      primaryMetric, guardrailMetrics, sampleSizeContext },
  metricReadout: [{ metric, type, direction, delta, pValue,
                    confidenceInterval, significant, note }],
  warningFlags: [{ id, label, description, severity }],
  decisions: [{ id, label, description, score, feedback }],
  idealDecision, secondBestDecision,
  juniorMistake, seniorFlags, staffFlags,
  debrief, interviewTakeaway, relatedConcepts,
}
```

---

## Private Beta Unlock

QA unlock code for all 4 beta scenarios:

```
EXP-LAB-DEV-2026
```

Enter on the Unlock page. Stored in `localStorage` — no account required.

---

## Theme System

CSS custom properties on `:root` (light, default) and `:root[data-theme="dark"]`. Theme toggled via the header button, persisted in `localStorage` key `exp-lab-theme`. Flash-of-wrong-theme prevented by inline script in `index.html`.

---

## Roadmap

| Version | Scope |
|---------|-------|
| **V1** (shipped) | 8 scenarios · Free + beta tiers |
| **V1.1** (current) | Light/dark theme · 50-scenario Judgment Bank architecture · Documentation |
| V1.5 | 20 scenarios · Geo-holdout, CUPED, switchback, cannibalization, right-censored metrics |
| V2 | Experiment Design Room · 50-scenario Judgment Bank complete |
| V3+ | Stats & Inference Lab · RCA Room · Full Platform |

See [docs/ROADMAP.md](docs/ROADMAP.md) for full detail.

---

## No Backend / No API Cost

Zero operating cost once deployed. No server, no database, no AI evaluation, no API calls. All scoring is pre-computed static data. Vercel free tier is sufficient for any traffic level.
