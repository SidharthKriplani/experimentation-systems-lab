# Product Analytics Lab

**An interactive judgment system for product analysts, data analysts, and PMs preparing for senior-level interviews.**

PAL is a React + Vite SPA covering the full stack of analytical work: statistics, experiment design, A/B test readouts, root cause analysis, metrics, SQL/Python, product sense, and business intelligence — 155+ interactive cases, 69 long-form articles, and a suite of practice tools. Every scenario is a decision problem, not a recall test. The bar is knowing which concept applies, what it means for the specific business context, and where the common misread is.

> Live at [productanalyticslab.com](https://productanalyticslab.com) · Zero account required · Progress stored in `localStorage` · Optional sign-in for cross-device sync

---

## What's Inside

### 16 Rooms

| Room | Focus | Volume |
|------|-------|--------|
| **Stat Foundations** | CLT, power, p-values, effect sizes, Bayesian basics, multiple testing, causal inference (DiD, RDD, IV, synthetic control) | 20 modules |
| **Stats** | Claim evaluation mechanic — read a statistical claim, decide if it holds | 16 modules (STAT01–16) |
| **Metrics** | Metric definition, north-star tradeoffs, guardrail design | 8 cases (M01–M08) |
| **Design** | Experiment design with 4-phase structured format and scoring | 16 scenarios (D01–D16) |
| **Review** | A/B test readout scenarios — Ship / Rollback / Investigate decisions | 16 scenarios (S01–S16) |
| **RCA** | Root cause analysis cases with SQL validation step | 12 cases (RCA01–12) |
| **Cases** | Business case studies | 12 cases (C01–C12) |
| **Code** | SQL interview patterns, window functions, sessionization; Python CUPED, bootstrap CI; Pyodide live runner | 22 modules |
| **Product Design** | PM product sense scenarios | 16 scenarios (pd01–pd16) |
| **Prioritization** | PM prioritization frameworks and scenarios | 12 scenarios (pri01–pri12) |
| **Behavioral** | Leadership and behavioral questions with full STAR answers | 30 questions (BEH01–30) |
| **Estimation** | Fermi estimation problems with arithmetic walkthroughs | 30 problems (EST01–30) |
| **Growth Analytics** | Growth accounting, LTV/CAC, cohort retention, funnel analysis | 8 cases (GA01–GA08) |
| **BI** | Data storytelling, dashboard design, funnel analysis, cohort analysis, anomaly detection, attribution | 12 cases (BI01–12) |
| **Analytics Instrumentation** | Measurement plans, event taxonomy, data quality, SRM audits, GDPR/CCPA privacy design, data contracts | 8 cases (inst01–08) |

### 5 Practice Tools

| Tool | What it does |
|------|-------------|
| **⚡ Challenges** | 6 cross-room problems combining stats + RCA + metrics + product in one scenario (CHL01–06) |
| **🐛 Spot the Flaw** | 12 adversarial cases — find the flaw in a real-looking analysis (SRM, peeking, Simpson's Paradox, novelty effect, multiple testing, bad metric, selection bias, SUTVA, confounding, regression-to-mean, p-hacking, network effects) |
| **📝 Take-Home** | 5 timed take-home challenges with timer, rubric scoring, and sample outline |
| **Simulate** | Interview Simulator — 5-case timed mock interview, DS/PM modes, MCQ rounds, speech practice |
| **A/B Tool** | Standalone z-test calculator: p-value, 95% CI (Wilson), SRM check, multiple testing warning |

---

## Content Map

| Category | Count |
|----------|-------|
| Interactive rooms | 16 |
| Total cases / modules | 155+ |
| Practice tool scenarios | 23 |
| Long-form articles (Blog/Learn) | 69 |
| MCQ trainer questions | 40 |
| LocalStorage persistence keys | 15+ |

**Article topics:** Metrics · RCA · Experimentation · Stats · Ambiguous/GenAI · Product Sense · SQL · Career · Mental Models · Growth Analytics

---

## Additional Features

- **🔍 Search** — Global search across all rooms and content with arrow-key navigation
- **🎯 Trainer** — 40-question MCQ trainer across Statistics, Experimentation, Metrics & Growth, Product & Prioritization
- **💬 Consult** — Keyword-matching consultation space: input a topic, get linked cases, articles, and MCQs
- **Companies** — Curated prep tracks for FAANG and top-tier companies
- **🛡️ Defense Doc Generator** — Input a job description → get a personalized 7-day study plan tiered by room importance, printable
- **🔖 Saved** — Bookmarks: save any case across all rooms
- **Progress** — Full tracking dashboard with per-room completion bars, 91-day practice heatmap, role readiness score (Junior / Analyst / Senior / Staff), guided learning paths, spaced repetition review queue, and "study next" suggestions

---

## Getting Started

```bash
git clone https://github.com/<your-org>/experimentation-systems-lab.git
cd experimentation-systems-lab
npm install
npm run dev
```

Visit `http://localhost:5173`. No environment variables required for local development.

**Optional env vars:**
```
VITE_POSTHOG_KEY=     # PostHog analytics (gated — omit to disable)
```

**Auth (optional):** Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel env vars to enable sign-in and cross-device progress sync. See `SETUP_AUTH.md` for the full setup guide. Without these vars, the app runs in localStorage-only mode.

**Build for production:**
```bash
npm run build
# Output in dist/
```

---

## Architecture

### Stack

| Layer | Choice |
|-------|--------|
| Framework | React + Vite |
| Hosting | Vercel (static SPA) |
| Auth / sync | Supabase (optional — env-var gated) |
| Charts | Recharts |
| Python runtime | Pyodide (in-browser, Code Room only) |
| Analytics | PostHog (env-var gated) |
| State / persistence | `localStorage`-first; optional Supabase sync |

### Client-first architecture

PAL runs without a server. All scenario content is static data bundled at build time; all scoring is pre-computed. Vercel free tier handles any traffic level. When Supabase env vars are present, sign-in unlocks cross-device progress sync — but the app is fully functional without them. There is no API dependency at runtime.

### Code Splitting

All 30+ rooms are lazy-loaded via `React.lazy()` + `Suspense`. Initial bundle is small; rooms load on first visit and are cached by the browser.

### localStorage Keys (summary)

| Key pattern | What it stores |
|-------------|---------------|
| `pal-progress-*` | Per-room completion state |
| `pal-bookmarks` | Saved cases across all rooms |
| `pal-heatmap` | 91-day practice activity |
| `pal-role-score` | Role readiness score |
| `pal-spaced-rep` | Spaced repetition queue |
| `pal-theme` | Light / dark preference |
| `pal-trainer-*` | MCQ trainer history |
| *(+ 8 more)* | Room-specific state, unlock flags, etc. |

### Vercel Deploy

1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

---

## Contributing / Content Quality Bar

New cases must meet the bar defined in [`docs/CONTENT_QUALITY_BAR.md`](docs/CONTENT_QUALITY_BAR.md). The short version: every scenario needs a realistic business context, a defensible ideal answer with explicit reasoning, at least one junior mistake documented, and clean tagging for the search index.

---

## Roadmap

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full version history and upcoming work.

---

## Documentation Index

| Doc | Purpose |
|-----|---------|
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Version history and upcoming milestones |
| [`docs/CONTENT_QUALITY_BAR.md`](docs/CONTENT_QUALITY_BAR.md) | Standards for new scenarios and articles |
| [`docs/PRODUCT_ANALYTICS_SYSTEMS_LAB_PRD.md`](docs/PRODUCT_ANALYTICS_SYSTEMS_LAB_PRD.md) | Product vision, room specs, monetization |
| [`docs/SCENARIO_BANK_TAXONOMY.md`](docs/SCENARIO_BANK_TAXONOMY.md) | Taxonomy of scenario families and coverage map |

---

*Product Analytics Lab — V4.33.7*
