# Product Analytics Lab — Ideas Backlog

Running list of product, content, and feature ideas. Items marked ✅ are shipped. Items below the "Future" section are not yet prioritized.

---

## ✅ Shipped through V4.5 (complete list)

### Rooms
- Stats Foundations (sf01–sf20): 20 interactive modules with CLT, power, Bayesian, causal inference
- Stats Room (STAT01–16): claim-evaluation mechanic
- Metrics Room (M01–M08)
- Design Room (D01–D16)
- Review Room (S01–S16)
- RCA Room (RCA01–12) with SQL validation step
- Cases Room (C01–C12)
- Code Room (code01–22): SQL + Python + Pyodide live runner
- Product Design Room (pd01–pd16)
- Prioritization Room (pri01–pri12)
- Behavioral Room (BEH01–30)
- Estimation Room (EST01–30)
- Growth Analytics Room (GA01–08) with Recharts visualizations
- BI Room (BI01–12): dashboard, funnel, cohort, anomaly, attribution
- Analytics Instrumentation Room (inst01–08): measurement plans, event taxonomy, data quality, data contracts

### Practice
- Cross-Room Challenges (CHL01–06)
- Spot the Flaw (STF01–12): 12 flaw types
- Take-Home Challenges (TH01–05)
- Interview Simulator + MCQ mode + speech practice
- A/B Test Interpreter (z-test, CI, SRM, multiple testing)

### Tools
- Global Search (all rooms, keyboard shortcut /)
- MCQ Trainer (40 questions, 4 categories)
- Consultation Space (keyword → cases + articles + MCQs)
- Defense Doc Generator (JD → 7-day study plan, printable)
- Bookmarks (save any case, cross-room)
- Company Tracks (FAANG prep packs)

### Infrastructure
- Grouped header nav (ROOMS / PRACTICE / TOOLS / LEARN / TRACK)
- Keyboard shortcuts hook
- React.lazy + Suspense code splitting (30+ chunks)
- Pyodide in-browser Python execution
- PostHog analytics (env-var gated)
- Practice heatmap (91-day grid)
- Role readiness score (Junior/Analyst/Senior/Staff)
- Spaced repetition review queue
- Leadership Lens toggle on GA + RCA runners
- 91-day Practice Heatmap
- Per-room progress reset
- Bookmark buttons across debrief panels

### Content
- 69 long-form Playbook/Blog articles
- 40 MCQ questions with explanations
- leadershipNote on all GA and RCA01–08 cases

---

## Future Ideas — Not Yet Scheduled

### Content
- More BI cases (BI13+): real-time dashboards, Looker/Tableau case studies
- More Instrumentation cases: dbt data models, data lineage, schema migration
- More Take-Home prompts (TH06+): marketplace, fintech, health
- STAT17–20: more causal inference (IV estimation, synthetic control, geo holdout)
- Cases Room: pricing, international expansion, build vs buy AI (already partial)
- Playbook articles for Instrumentation, BI, Take-Home rooms

### Features
- Interview debrief export (PDF of your session answers + model answers)
- Per-case notes that persist (currently only one global notes area)
- Company track completion badges
- Search within a single room (room-level filter in global search)
- Dark/light mode persistence fix (ensure it survives hard refresh)

### Platform
- `isUnlocked()` → false when Stripe is live; current beta gate is `true`
- Stripe payment flow (Stripe Payment Link in env var, already scaffolded)
- Cross-device sync (requires backend — deferred)
- Team accounts / org dashboards (V5 territory)

### Nice-to-have
- `Escape` key closes hint accordions (currently only navigates home)
- Mobile: bottom nav rail for the most-used rooms
- "Shuffle" button in Trainer to randomize across all 40 questions
- Difficulty progression lock (must complete junior before senior unlocks) — opt-in mode
