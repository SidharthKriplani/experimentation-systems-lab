# Experimentation Systems Lab

**"You know the formulas. Now practice the calls."**

A static decision simulator for product analysts and data scientists who already understand A/B testing basics — and want to practice making judgment calls under messy, realistic experiment data.

---

## What this is

Not a statistics course. No primers, no glossary, no certificate. You're dropped into a fictional experiment review meeting with real-looking data and asked to make the call: ship, rollback, or investigate? After you decide, you see how a senior analyst would have read the same data.

**Target user:** A data scientist or analyst who knows what p-values and A/B testing are, but wants to build judgment under business pressure and messy product data.

---

## V1 Scope — 8 Scenarios

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

---

## Tech Stack

- **React** + **Vite** v8
- **Tailwind CSS** v4 via `@tailwindcss/vite`
- Static frontend only — no backend, no database, no API calls
- `localStorage` for progress and unlock state
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
    scenarios.js          # All 8 scenario objects — the core content file
  components/
    layout/
      Header.jsx
      Footer.jsx
    scenario/
      ScenarioCard.jsx    # Browser grid card
      ContextPanel.jsx    # Company / background / hypothesis
      ExperimentDesign.jsx
      MetricTable.jsx     # Readout table with severity coloring
      WarningFlags.jsx    # Flag cards with severity indicators
      FlagChecklist.jsx   # Interactive pre-decision self-reflection
      DecisionPanel.jsx   # Radio-style decision selector
      ScoreReveal.jsx     # Junior Miss / Analyst-Ready / Senior-Ready / Staff-Level
      DebriefPanel.jsx    # Full debrief: feedback + senior read + flags
      ScenarioRunner.jsx  # Main orchestrator: tabbed left panel + decision right
    ui/
      Badge.jsx
      Button.jsx
      LockOverlay.jsx
  pages/
    Home.jsx
    ScenarioBrowser.jsx
    Progress.jsx
    Unlock.jsx
    About.jsx
  utils/
    progress.js           # localStorage progress helpers
    scoring.js            # Score level definitions
    unlock.js             # Unlock code validation
  App.jsx                 # Page state machine
  main.jsx
  index.css
```

---

## Scenario Schema (summary)

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
  // V2 fields: scenarioFamily, tags, conceptTags, nextTestIdeas, stakeholderSummary
}
```

---

## Private Beta Unlock

QA unlock code for all 4 paid scenarios:

```
EXP-LAB-DEV-2026
```

Enter on the Unlock page. Stored in `localStorage` — no account required. Real payment integration not implemented in V1.

---

## Roadmap

| Version | Scope |
|---------|-------|
| **V1** (current) | 8 scenarios · Free + beta tiers |
| V1.5 | 20 scenarios · Geo-holdout, CUPED, switchback, cannibalization, right-censored metrics |
| V2 | 50-scenario Experiment Judgment Bank · 15 scenario families |

---

## No Backend / No API Cost

Zero operating cost once deployed. No server, no database, no AI evaluation, no API calls. All scoring is pre-computed static data. Vercel free tier is sufficient for any traffic level.
