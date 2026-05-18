# Experimentation Systems Lab

**"You know the formulas. Now practice the calls."**

A static decision simulator for product analysts and data scientists who already understand A/B testing basics — and want to practice making judgment calls under messy, realistic experiment data.

Built for product analysts, data scientists, growth analysts, and PMs.

---

## What this is

Not a statistics course. No primers, no glossary, no certificate. You're dropped into a fictional experiment review meeting with real-looking data and asked to make the call: ship, rollback, or investigate? After you decide, you see how a senior analyst would have read the same data.

**Target user:** A data scientist or analyst who knows what p-values and A/B testing are, but wants to build judgment under business pressure and messy product data.

---

## V1.1 — Current

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

**V1.1 additions:**
- Light/dark theme toggle (default light, persists in localStorage)
- Judgment Bank page — 50-scenario architecture across 15 families (8 playable + 42 planned cards)
- Improved homepage with "Why this is different" section
- Enhanced scenario browser with difficulty + industry filters
- Full CSS variable system for theming

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
    JudgmentBank.jsx      # 50-scenario bank (new in V1.1)
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

QA unlock code for all 4 paid scenarios:

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
| **V1.1** (current) | Light/dark theme · 50-scenario Judgment Bank architecture |
| V1.5 | 20 scenarios · Geo-holdout, CUPED, switchback, cannibalization, right-censored metrics |
| V2 | 50-scenario Experiment Judgment Bank · 15 scenario families fully playable |

---

## No Backend / No API Cost

Zero operating cost once deployed. No server, no database, no AI evaluation, no API calls. All scoring is pre-computed static data. Vercel free tier is sufficient for any traffic level.
