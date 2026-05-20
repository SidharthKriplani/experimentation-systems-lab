# Product Analytics Lab — Roadmap

**Current version:** V4.5  
**Last updated:** 2026-05  
**Status:** Active development — beta access open

---

## What shipped (V1 → V4.5)

PAL started as an 8-scenario experiment review tool and grew into a full DS/PM interview prep platform.

| Version | Major additions |
|---------|----------------|
| V1 | 8 A/B test review scenarios — Ship/Rollback/Investigate |
| V1.2 | Design Room, platform rebrand to Product Analytics Lab |
| V1.5–1.6 | Stats Room (claim-evaluation mechanic), paired Design↔Review |
| V2.0 | Metrics, RCA, Cases rooms; readiness summary on Progress |
| V3.0–3.2 | Product Design, Code, Prioritization, Behavioral, Estimation rooms |
| V3.3–3.4 | Code Room SQL+Python expansion; causal inference STAT17–20; rooms to 9 |
| V3.5 | Stat Foundations (20 interactive modules), learning paths |
| V3.6 | 69 blog articles, Pricing page, SEO, mobile responsive fixes |
| V4.0–4.1 | Growth Analytics Room (charts), Interview Simulator, A/B Interpreter, Practice Heatmap, Daily Drill |
| V4.2 | Global Search, Bookmarks, MCQ Trainer, Consultation Space, Company Tracks, keyboard shortcuts |
| V4.3 | Cross-Room Challenges, Pyodide Python runner, Interview MCQ+speech, grouped nav, 40 MCQs |
| V4.4 | BI Room (12 cases), Spot the Flaw (12 cases), Take-Home Challenges, Defense Doc Generator, Leadership Lens |
| V4.5 | Analytics Instrumentation Room (8 cases), Progress full coverage, BI/STF expansions |

---

## Current platform scope (V4.5)

**16 practice rooms** — 200+ cases/modules total  
**5 practice tools** — Challenges, Spot the Flaw, Take-Home, Simulator, A/B Tool  
**6 utility tools** — Search, Trainer, Consult, Companies, Defense Doc, Bookmarks  
**69 articles** — Blog/Playbook  
**40 MCQs** — Trainer question bank  

See README.md for the full content map.

---

## Near-term (V4.6 candidates)

These are identified gaps — not yet scheduled:

**Content depth**
- BI Room: BI13+ covering real-time dashboards, Looker/Tableau case studies
- Instrumentation: more cases — dbt data models, data lineage, schema migration design
- Take-Home: TH06+ with marketplace, fintech, health prompts
- Playbook articles: Instrumentation room and BI room currently have no linked articles

**UX polish**
- Interview debrief export — PDF of session answers + model answers side-by-side
- Per-case persistent notes (currently one global notes field)
- Search within a single room (room-level filter in global search)
- Mobile bottom nav rail for top rooms

---

## Monetization (deferred)

The paywall is scaffolded but inactive:
- `src/utils/unlock.js`: `isUnlocked()` returns `true` for beta
- `src/pages/Pricing.jsx`: two-tier pricing page exists
- Stripe integration: `VITE_STRIPE_PAYMENT_LINK` env var, wired into Pricing CTA
- **To activate**: set `isUnlocked()` to return `false` in unlock.js, set `VITE_STRIPE_PAYMENT_LINK` in Vercel env vars

---

## V5 — Platform features (planned, no timeline)

These require backend infrastructure — explicitly deferred:

- **Cross-device sync** — requires auth + database; currently localStorage-only
- **Team accounts + org dashboards** — for training/onboarding use cases
- **Custom scenario upload** — let orgs add their own cases
- **Interview prep certification** — scored, timed, exportable sessions
- **Calibration gap analytics** — team-level aggregated weak area detection

---

## What will not be built

- **Statistics tutorial content** — PAL assumes users know the basics. Formula modules and glossaries are out of scope.
- **AI-evaluated open answers** — All scoring is pre-computed. No LLM evaluation of user reasoning. This keeps scoring consistent and offline-capable.
- **Social / gamification features** — Leaderboards, streaks, badges distort the goal (better judgment) toward proxy metrics (usage).
- **ML systems content** — PAL covers product analytics and PM. Feature stores, model monitoring, production ML deployment are explicitly out of scope (separate project).

---

## Architecture constants

| Property | Value |
|----------|-------|
| Stack | React 18 + Vite 8 |
| Hosting | Vercel (static, free tier) |
| Backend | None |
| Data storage | localStorage (15+ keys) |
| Code splitting | React.lazy + Suspense on all 30+ room components |
| Python runtime | Pyodide (in-browser, loaded on demand in Code Room) |
| Analytics | PostHog (CDN, env-var gated, no PII) |
| Build command | `npm_config_cache=/tmp/npm-cache ./node_modules/.bin/vite build --outDir /tmp/dist-*` |
| Repo | github.com/SidharthKriplani/experimentation-systems-lab |

## Decision log

**Why no backend through V4.5?**
Zero operating cost. Vercel free tier handles any traffic level. The tradeoff (no cross-device sync, no team accounts) is acceptable until monetization justifies infrastructure spend.

**Why pre-computed scoring?**
Consistency and auditability. Users need to trace why a decision scored as it did. Pre-computed scoring with explicit feedback text is more trustworthy than LLM evaluation at this scale.

**Why static content quality bar?**
The platform's credibility depends entirely on case quality. One bad case that teaches wrong judgment is worse than no case. See `docs/CONTENT_QUALITY_BAR.md`.

**Why keep ML systems out of PAL?**
There is a separate ML Systems Lab project for that scope. PAL stays focused on product analytics and PM. Cross-contaminating the scope would dilute both products.
