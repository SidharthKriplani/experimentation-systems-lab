# Product Analytics Lab — Roadmap

**Current version:** V4.21  
**Last updated:** 2026-05  
**Status:** Active development — beta access open

---

## Active Sprint: V4.20–V4.23 — Conversion + Quality pass

Priority levels defined during the "take my money?" audit (2026-05-27). Work through them in order.

### P0 — Build integrity / credibility killers ✅ DONE (V4.20)
Items that would embarrass the product in front of a technical user or break trust immediately.

| Item | Status | Version |
|------|--------|---------|
| App.jsx static data imports (~1MB initial bundle) — replace with caseIndex.js slim arrays, move full data into each runner | ✅ done | V4.20 |
| "Junior Miss" label in Progress.jsx — replace with "Junior-Ready" | ✅ done | V4.20 |
| Font size floor: 0.68rem minimum across all JSX — accessibility threshold | ✅ done | V4.20 |

### P1 — Conversion delta ✅ DONE (V4.21)
The gap between "interesting" and "I want this." Visitors who read the hero but don't start a case.

| Item | Status | Version |
|------|--------|---------|
| Full Pricing page rewrite — outcome copy, risk reversal (30-day guarantee), "what's inside" chips, free tier reframe | ✅ done | V4.18 |
| First-visit hero on Home — headline + subtitle + CTAs + trust line, hidden after first room opened | ✅ done | V4.19 |
| Product preview mockup in hero — live Stats Room case card (question + MCQ options + debrief) shows the product before any click | ✅ done | V4.21 |
| Sticky "Next case" CTA in runners — after debrief, keep the forward momentum | ⬜ pending | — |
| Room browser "next case" highlight — visually call out the first unstarted case | ⬜ pending | — |

### P2 — New user experience (CURRENT)
The experience for someone who shows up, doesn't know where to start, and might leave without trying a single case.

| Item | Status | Description |
|------|--------|-------------|
| Nav IA cleanup — remove emojis from nav items, fix "Instrum." truncation, remove Consult, clean group labels | ⬜ pending | 15-item ROOMS group is paralyzing; nav emojis are inconsistent |
| Pricing raise — $49 → $69 one-time | ⬜ pending | $49 underprices a product with 150+ cases and 25 foundation modules; $69 is still under-$100 but signals quality |

### P3 — Content depth ✅ DONE (V4.23)
More inventory in the highest-traffic rooms to keep returning users finding new material.

| Item | Status | Notes |
|------|--------|-------|
| Challenges room: 6 → 16 cases | ✅ done | CHL07–CHL16: Spotify, Amazon, LinkedIn, DoorDash, Slack, Pinterest, Shopify, Duolingo, Figma, Instacart |
| SQL live coding environment improvements | ⬜ deferred | Code room is powerful but discovery is low — lower priority than P4 architecture |

### P4 — Architecture
Backend work that unlocks features currently impossible with localStorage-only.

| Item | Description |
|------|-------------|
| Supabase progress sync | Cross-device access; prerequisite for team/org plans |
| Paywall backend verification | Before Stripe goes live, server-side receipt validation prevents code sharing |

### P5 — Distribution
Without users, none of the above matters. This is the highest-leverage unlocked item.

| Item | Description |
|------|-------------|
| Build one real distribution channel | LinkedIn content engine, Reddit (r/datascience, r/ProductManagement), or direct outreach to bootcamps |
| Referral mechanic | "Share your score / share a case" viral loop |

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
